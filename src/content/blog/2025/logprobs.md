---
title: 'Estimating LLM classification confidence with log probabilities (logprobs)'
pubDate: 2025-02-10
description: Estimating the confidence of an LLM's classification using log probabilities.
showDate: true
tags: ai
---

When working with LLM-powered classification, knowing _why_ a model makes a decision can be just as useful as the decision itself.

We can assess a model's classification confidence by examining the log probabilities (logprobs) of the tokens in its response. This indicates the probability of the model's response, which we can interpret as its confidence in the classification it made.

> **Logprobs** (log probabilities) are the logarithm of the probability assigned to each token, derived from the **logits** (raw model outputs) after applying the **softmax** function. They help quantify model confidence, with higher logprobs (closer to zero) indicating greater certainty in a token’s selection.

In this post, we’ll explore how to use [logprobs from the OpenAI API](https://platform.openai.com/docs/api-reference/chat/create) to measure model confidence of classification.

> **Note:** Logprobs availability varies by model and API access level. Some models may not support logprobs, and in some cases, special access may be required. Check the OpenAI documentation for your specific model's capabilities.

> See working examples in the [Jinksi/learning-agentic-llm-systems](https://github.com/Jinksi/learning-agentic-llm-systems/tree/main/agentic-workflows/logprobs) GitHub repo.

### Why Use Logprobs?

A classifier that determines whether a food item contains pineapple might make obvious decisions in some cases but struggle with others.

- A **cheese pizza** (which clearly doesn’t have pineapple) should yield **high confidence** in a "false" classification.
- A **Supreme pizza** (which typically includes pineapple but may have variations) might yield **lower confidence** in a "true" classification.
  By analyzing log probabilities, we can determine when to trust AI predictions and when to flag uncertain cases for review.

### Observing logprobs in binary classification (true/false)

In this example, I’m using the [**Vercel AI SDK**](https://sdk.vercel.ai/docs/introduction) and OpenAI provider.

```ts
import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { z } from 'zod'
```

When defining the model to use, we’ll pass in the flags `logprobs` and `structuredOutputs`.

```ts
const model = openai('gpt-4o-mini', { logprobs: true, structuredOutputs: true })
```

Defining a function to call the model and ask for an object.

```ts
async function checkPineapple(input: string) {
  const result = await generateObject({
    model,
    temperature: 0, // Greedy sampling, only the top token is sampled
    schema: z.object({
      containsPineapple: z
        .boolean()
        .describe('Whether the food contains pineapple'),
      reason: z
        .string()
        .describe('The reason for the classification, in 10 words or less'),
    }),
    system: `You are a chef. You are given a food item and you need to determine if it contains pineapple.`,
    prompt: input,
  })

  const { containsPineapple, reason } = result.object

  return { containsPineapple, reason }
}
```

Now that we have the reason, let’s analyse the model’s confidence in the `containsPineapple` value using the logprobs returned by the model.

When the model returned a structured output like this:

```js
{
	"containsPineapple": true,
	"reason": "Often includes pineapple as a topping option."
}
```

…we can look into the logprobs returned by the model to identify the probability of the token in the output.

```js
;[
  { token: '{"', logprob: 0 },
  { token: 'contains', logprob: 0 },
  { token: 'Pineapple', logprob: 0 },
  { token: '":"', logprob: 0 },
  { token: 'true', logprob: -0.6931498 },
]
```

A logprob of `0` indicates a probability of 100%.
Using `Math.exp(-0.6931498)` to calculate the probability of the `true` token above results in a probability of ~50%.

So now we can find this token and return it in our `checkPineapple` function response.

```ts
// Find the logprob for the "true" or "false" token.
const trueOrFalseLogprob = result.logprobs?.find(
  (item) => item.token === String(containsPineapple) // This will be either 'true' or 'false'.
)

// Calculate the confidence as the exponential of the logprob to get the probability.
const confidence = trueOrFalseLogprob ? Math.exp(trueOrFalseLogprob.logprob) : 0

return { containsPineapple, reason, confidence }
```

### Observing logprobs in multi-class classification

We can extend the same approach above to **multi-class classification**. For example, a given food item may be a “fruit,” “vegetable,” or “herb.”

When an AI model classifies something into **one of multiple categories**, there’s often higher uncertainty in edge cases:

- A **tomato** or **cucumber** could be classified as either a **fruit** (botanically correct) or a **vegetable** (culinary use).
- **Lemon** is clearly a **fruit**, so we expect high confidence in that classification.

```ts
async function checkFruitVegHerb(input: string) {
  const result = await generateObject({
    temperature: 0, // Greedy sampling, only the top token is sampled
    model,
    schema: z.object({
      type: z
        .enum(['fruit', 'vegetable', 'herb'])
        .describe('The classification of the item, based on culinary usage.'),
      reason: z
        .string()
        .describe('The reason for the classification, in 10 words or less'),
    }),
    system: `You are a chef. You are given an item and you need to classify it as a fruit, vegetable, or herb.`,
    prompt: input,
  })

  const { type, reason } = result.object

  // The logprob for the value will be after the first occurrence of 'type' and ':' tokens.
  const typeColonLogprobIndex = result.logprobs?.findIndex((item) =>
    item.token.includes(':')
  )
  const typeValueLogprob = typeColonLogprobIndex
    ? result.logprobs?.[typeColonLogprobIndex + 1]
    : undefined

  // Calculate the confidence as the exponential of the logprob to get the probability.
  const confidence = typeValueLogprob ? Math.exp(typeValueLogprob?.logprob) : 0

  return { type, reason, confidence }
}
```

### Using confidence scores to improve classification workflow outcomes

By utilising logprobs to estimate a classification confidence, we can adjust decision-making logic:

- **Confidence > 90%** → Automatically trust the result
- **Confidence between 50-90%** → Show a warning for user verification
- **Confidence < 50%** → Ask for clarification

Using logprobs in LLM classification systems enhances our understanding of the model's certainty. This insight is crucial for making classification systems more reliable and trustworthy.
