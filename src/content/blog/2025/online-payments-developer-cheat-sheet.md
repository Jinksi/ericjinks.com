---
title: 'Online Payments Developer Cheat Sheet: Essential Concepts & Implementation Guide'
pubDate: 2025-08-02
description: 'A practical guide to understanding and implementing online payment systems.'
showDate: true
tags: payments, system-design
isDraft: true
---

Online payments are more complex than they first appear. There's a maze of concepts, costs, and considerations. Stripe have a great guide on the topic ([Stripe Introduction to Online Payments](https://stripe.com/au/guides/introduction-to-online-payments)), and this cheatsheet summarises some of the essential concepts with code examples.

## Payment Flow Fundamentals: The 4-Party System

Every online payment involves four key players working together in a carefully orchestrated dance. Understanding this system is crucial for building reliable payment flows.

### Key Players Quick Reference

| Player           | Role                                 | What They Do                                  |
| ---------------- | ------------------------------------ | --------------------------------------------- |
| **Cardholder**   | Customer with payment method         | Initiates payment with their card details     |
| **Merchant**     | Your business                        | Receives payment for goods/services           |
| **Acquirer**     | Bank processing payments for you     | Handles transaction processing and settlement |
| **Issuing Bank** | Customer's bank that issued the card | Authorises or declines the transaction        |

### Basic Flow Steps

Here's what happens when a customer clicks "Pay Now":

1. **Customer enters payment details** → Your checkout form captures card information
2. **Gateway encrypts data** → Payment gateway securely tokenises sensitive data
3. **Acquirer processes** → Your acquirer receives the encrypted transaction
4. **Card network routes** → Visa/Mastercard routes to the appropriate issuing bank
5. **Issuing bank decides** → Customer's bank approves or declines based on available funds/fraud checks
6. **Response travels back** → Decision flows back through the chain to your application

```javascript
// Simplified payment flow with Stripe
const paymentIntent = await stripe.paymentIntents.create({
  amount: 2000, // $20.00 in cents
  currency: 'usd',
  payment_method_types: ['card'],
})

// Frontend handles the confirmation
const { error } = await stripe.confirmCardPayment(paymentIntent.client_secret, {
  payment_method: {
    card: cardElement,
    billing_details: {
      name: 'Customer Name',
    },
  },
})
```

### Essential Infrastructure Requirements

Before you can process a single payment, you need:

- **Business bank account** - Where your money actually lands
- **Acquirer/processor relationship** - Either direct or through a payment service provider like Stripe
- **Payment gateway** - For security, tokenisation, and PCI compliance
- **PCI compliance considerations** - Even with a gateway, you need to handle data securely

## Payment Costs Breakdown

Understanding payment costs helps you price your products correctly and choose the right payment provider.

### Network Costs Formula

```
Total Network Costs = Interchange Fee + Scheme Fee
```

- **Interchange Fee** (bulk of the cost) - Goes to the issuing bank, varies by card type and transaction details
- **Scheme Fee** - Goes to the card network (Visa, Mastercard), typically much smaller

### Cost Variables to Consider

Your actual payment costs depend on several factors:

- **Card type**: Rewards cards typically cost more than basic cards
- **Transaction location**: International transactions have higher fees
- **Channel**: Online vs in-person transactions have different rates
- **Merchant Category Code (MCC)**: Your business type affects interchange rates
- **Transaction size**: Some fees are percentage-based, others are flat fees

### Pricing Model Options

| Model                | How It Works                             | Best For                              |
| -------------------- | ---------------------------------------- | ------------------------------------- |
| **Pay-as-you-go**    | Fixed percentage per transaction         | Getting started, unpredictable volume |
| **Interchange-plus** | Wholesale cost + fixed markup            | High volume, predictable transactions |
| **Tiered pricing**   | Different rates for different card types | Medium volume businesses              |

```javascript
// Example cost calculation
const transactionAmount = 100.0
const stripeRate = 0.029 // 2.9%
const stripeFixed = 0.3

const totalFees = transactionAmount * stripeRate + stripeFixed
const netAmount = transactionAmount - totalFees

console.log(`Transaction: $${transactionAmount}`)
console.log(`Fees: $${totalFees.toFixed(2)}`)
console.log(`You receive: $${netAmount.toFixed(2)}`)
```

## Conversion Optimisation: The Payment Funnel

Your conversion rate is the product of three critical factors:

```
Conversion Rate = Checkout Completion × Fraud Protection × Network Acceptance
```

### Checkout Best Practices

**Minimise friction while collecting necessary data:**

```html
<!-- Good: Streamlined checkout form -->
<form id="payment-form">
  <div id="card-element">
    <!-- Stripe Elements creates a secure card input -->
  </div>
  <input type="email" placeholder="Email" required />
  <button type="submit">Pay $20.00</button>
</form>
```

**Essential optimisations:**

- **Support autofill** - Use standard HTML field names (`name="email"`, `autocomplete="cc-number"`)
- **Mobile-responsive design** - Large tap targets, readable text
- **Offer mobile wallets** - Apple Pay and Google Pay can double conversion rates
- **Localise for international markets** - Currency, payment methods, address formats

### Key Metrics to Track

Monitor these metrics to identify conversion bottlenecks:

```javascript
// Track key payment metrics
const metrics = {
  cartAbandonment: (startedCheckouts - completedCheckouts) / startedCheckouts,
  paymentCompletion: successfulPayments / paymentAttempts,
  failedPaymentRate: failedPayments / paymentAttempts,
  chargebackRate: chargebacks / successfulPayments,
}
```

## Fraud Prevention Essentials

Fraud prevention is about finding the sweet spot between security and user experience.

### Two Main Approaches

| Approach             | How It Works         | Pros                     | Cons                         |
| -------------------- | -------------------- | ------------------------ | ---------------------------- |
| **Rules-based**      | "If X, then Y" logic | Transparent, predictable | Manual updates, reactive     |
| **Machine learning** | Adaptive algorithms  | Automatic, proactive     | Opaque system, requires data |

### Implementation Strategy

**Collect verification data without creating friction:**

```javascript
// Example: Stripe's built-in fraud protection
const paymentIntent = await stripe.paymentIntents.create({
  amount: 2000,
  currency: 'usd',
  payment_method_types: ['card'],
  // Automatically collect billing address for fraud prevention
  payment_method_options: {
    card: {
      request_three_d_secure: 'automatic',
    },
  },
})
```

**Balance security with user experience:**

- **Low-risk transactions** - Minimal friction, rely on ML models
- **Medium-risk transactions** - Request additional verification (CVC, billing address)
- **High-risk transactions** - Require 3D Secure authentication

### Chargeback Management

Prevention beats dispute resolution every time. When disputes do occur, having strong evidence ready can help you win the case automatically. Strong evidence typically includes delivery confirmations, customer communication records, signed receipts, or proof of service completion - basically anything that demonstrates the customer received what they paid for.

```javascript
// Webhook handler for dispute notifications
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature']
  let event

  try {
    // Verify webhook signature for security
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'charge.dispute.created') {
    const dispute = event.data.object

    // Automatically submit evidence if you have it
    if (hasStrongEvidence(dispute.charge)) {
      submitDisputeEvidence(dispute.id)
    }

    // Alert your team for manual review
    alertTeam(`New dispute: ${dispute.id}`)
  }

  res.json({ received: true })
})

// Note: hasStrongEvidence(), submitDisputeEvidence(), and alertTeam()
// are placeholder functions you'll need to implement based on your
// business logic and evidence collection system
```

## Global Payment Methods by Type

Different regions have vastly different payment preferences. Here's what developers need to know:

### Credit/Debit Cards

- **Coverage**: Universal but not preferred everywhere
- **Implementation**: Standard across all payment processors
- **Considerations**: Higher fraud risk, chargebacks possible

### Digital Wallets

- **Apple Pay/Google Pay**: High conversion, mobile-first
- **Regional wallets**: Alipay (China), WeChat Pay (China), Faster Payments Service (UK)

```javascript
// Enable Apple Pay with Stripe
const paymentRequest = stripe.paymentRequest({
  country: 'US',
  currency: 'usd',
  total: {
    label: 'Demo total',
    amount: 1099,
  },
  requestPayerName: true,
  requestPayerEmail: true,
})

const elements = stripe.elements()
const prButton = elements.create('paymentRequestButton', {
  paymentRequest,
})

// Check if Apple Pay is available
paymentRequest.canMakePayment().then(function (result) {
  if (result) {
    prButton.mount('#payment-request-button')
  }
})
```

### Bank Transfers

- **Account debits**: ACH in US, SEPA in Europe
- **Credit transfers**: Wire transfers, faster payments
- **Regional methods**: iDEAL (Netherlands), SEPA Instant Credit Transfer (Germany), BACS (UK)

### Buy Now, Pay Later

- **Providers**: Afterpay, Klarna, Affirm, Sezzle, PayPal Pay Later
- **Integration**: Usually requires separate SDK or API
- **Considerations**: Different approval rates and customer segments

### Cash-based Methods

For unbanked customers in emerging markets:

- **OXXO** (Mexico) - Customers pay at convenience stores
- **Boleto** (Brazil) - Bank payment slips
- **7-Eleven** (Philippines) - Over-the-counter payments

## Business Model-Specific Considerations

Different business models have unique payment requirements. Here's what to consider for each:

### Online Retailers

**Omnichannel strategy essentials:**

```javascript
// Unified customer experience across channels
const customer = await stripe.customers.create({
  email: 'customer@example.com',
  metadata: {
    online_customer_id: 'cust_12345',
    store_location: 'melbourne_cbd',
  },
})

// Use same customer for online and in-person transactions
const paymentIntent = await stripe.paymentIntents.create({
  amount: 2000,
  currency: 'aud',
  customer: customer.id,
  payment_method_types: ['card', 'au_becs_debit'],
})
```

**Hardware requirements for in-person sales:**

- EMV chip card readers (magnetic stripe is deprecated)
- NFC support for contactless and mobile wallets
- Terminal management for software updates

### SaaS & Subscription Companies

**Subscription logic requirements:**

```javascript
// Flexible pricing models with Stripe
const priceData = {
  unit_amount: 999, // $9.99
  currency: 'usd',
  recurring: {
    interval: 'month',
    usage_type: 'licensed', // or 'metered' for usage-based
  },
  product: productId,
}

// Handle plan changes with proration
const subscription = await stripe.subscriptions.update(subscriptionId, {
  items: [
    {
      id: subscriptionItemId,
      price: newPriceId,
    },
  ],
  proration_behavior: 'create_prorations',
})
```

**Involuntary churn mitigation:**

```javascript
// Smart retry logic for failed payments
const webhook = (event) => {
  if (event.type === 'invoice.payment_failed') {
    const invoice = event.data.object

    // Implement smart retry logic
    if (invoice.attempt_count < 3) {
      // Retry in 3 days
      scheduleRetry(invoice.id, 3)
    } else {
      // Send dunning email
      sendPaymentFailureEmail(invoice.customer)
    }
  }
}
```

### Platforms & Marketplaces

**User onboarding with KYC compliance:**

```javascript
// Phased data collection for better UX
const account = await stripe.accounts.create({
  type: 'express',
  country: 'AU',
  email: sellerEmail,
  // Collect minimal info initially
  business_profile: {
    mcc: '5734', // Computer software stores
    url: sellerWebsite,
  },
})

// Create onboarding link for additional verification
const accountLink = await stripe.accountLinks.create({
  account: account.id,
  refresh_url: 'https://yourapp.com/reauth',
  return_url: 'https://yourapp.com/return',
  type: 'account_onboarding',
})
```

**Payment routing capabilities:**

```javascript
// Split payments between platform and seller
const paymentIntent = await stripe.paymentIntents.create({
  amount: 10000, // $100.00
  currency: 'usd',
  application_fee_amount: 500, // $5.00 platform fee
  transfer_data: {
    destination: sellerAccountId,
  },
})
```

## Technical Implementation Checklist

### Security Requirements

- **PCI DSS compliance** - Use payment processors to minimise scope
- **Tokenisation** - Never store raw payment method data
- **3D Secure** - Implement for additional authentication when needed

```javascript
// Example: Secure token storage with Stripe
const setupIntent = await stripe.setupIntents.create({
  customer: customerId,
  payment_method_types: ['card'],
  usage: 'off_session', // For future payments
})

// Frontend confirms and saves the payment method
const { error } = await stripe.confirmCardSetup(setupIntent.client_secret, {
  payment_method: {
    card: cardElement,
    billing_details: { name: 'Customer Name' },
  },
})
```

### Integration Considerations

**Webhook handling for payment events:**

```javascript
// Robust webhook handler
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature']
  let event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Handle different event types
  switch (event.type) {
    case 'payment_intent.succeeded':
      fulfillOrder(event.data.object)
      break
    case 'payment_intent.payment_failed':
      handleFailedPayment(event.data.object)
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  res.json({ received: true })
})
```

### Testing & Monitoring

**Essential test scenarios:**

```javascript
// Test card numbers for different scenarios
const testCards = {
  success: '4242424242424242',
  decline: '4000000000000002',
  insufficientFunds: '4000000000009995',
  fraudulent: '4100000000000019',
  requiresAuthentication: '4000002760003184',
}

// Monitor key metrics
const metrics = {
  async paymentAcceptanceRate() {
    const total = await getPaymentAttempts()
    const successful = await getSuccessfulPayments()
    return (successful / total) * 100
  },

  async averageResponseTime() {
    // Track API response times
    return await getAverageApiResponseTime()
  },
}
```

## Quick Reference: Common Payment Terms

**Essential glossary for developers:**

- **Acquirer**: Bank that processes payments for merchants
- **Chargeback**: Customer dispute of a transaction through their bank
- **Interchange**: Fee paid to the issuing bank for processing
- **Issuing Bank**: Bank that issued the customer's payment card
- **Network Acceptance**: Percentage of transactions approved by card networks
- **Payment Gateway**: Service that encrypts and processes payment data
- **PCI DSS**: Security standards for handling payment card data
- **Scheme Fees**: Fees paid to card networks (Visa, Mastercard)
- **3D Secure**: Additional authentication layer for online transactions
- **Tokenisation**: Replacing sensitive data with non-sensitive tokens

## Implementation Quick Starts

### Getting Started with Stripe

```javascript
// 1. Install Stripe
npm install stripe @stripe/stripe-js

// 2. Initialize on backend
const stripe = require('stripe')('sk_test_...');

// 3. Create payment intent
const paymentIntent = await stripe.paymentIntents.create({
  amount: 2000,
  currency: 'usd',
});

// 4. Frontend integration
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_...');
```

### Migration Considerations

When moving from legacy payment systems:

- **Plan for zero downtime** - Run systems in parallel during transition
- **Migrate payment methods gradually** - Start with new customers
- **Preserve transaction history** - Export and archive old data
- **Update webhook endpoints** - Ensure all systems receive payment events
- **Test extensively** - Use staging environments that mirror production

### Essential Testing Checklist

- [ ] Successful payment flow
- [ ] Declined payment handling
- [ ] Network timeout scenarios
- [ ] Webhook delivery and retry logic
- [ ] Mobile wallet integration
- [ ] International payment methods
- [ ] Subscription billing edge cases
- [ ] Chargeback and dispute flows

## Conclusion

Online payments might seem complex, but with the right foundation, you can build robust payment systems that scale with your business. Focus on understanding the core concepts, choose a reliable payment processor, and implement security best practices from day one.

The key is to start with straightforward implementations and iterate. Get the basic payment flow working reliably, then gradually add optimisations like mobile wallets, international payment methods, and advanced fraud prevention.

Remember: your payment system is often the last interaction customers have with your product. Make it smooth, secure, and trustworthy, and you'll see the impact on your conversion rates and customer satisfaction.

## Further Reading

- [Stripe Documentation](https://stripe.com/docs) - Comprehensive API guides and tutorials
- [PCI Security Standards](https://www.pcisecuritystandards.org/) - Official PCI DSS requirements
- [Payment Industry News](https://www.paymentsdive.com/) - Stay updated on industry trends
- [Chargebacks911](https://chargebacks911.com/knowledge-base/) - Chargeback prevention strategies
