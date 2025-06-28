---
title: Functional and non-functional requirements in frontend system design
pubDate: 2025-06-28
description: Understanding functional and non-functional requirements for better frontend system design.
showDate: true
isDraft: true
tags: System design
---

When designing frontend systems, distinguishing between functional and non-functional requirements can help us build applications that work correctly and provide excellent user experiences.

**TLDR:**

- [**functional requirements**](#functional-requirements-what-the-system-does) specify what the system does and
- [**non-functional requirements**](#non-functional-requirements-how-well-it-performs) specify how well it performs.

## Functional requirements: what the system does

Functional requirements define specific behaviours and features users interact with directly.

**Examples:**

- Users can search products by name or category
- Users can add items to cart and complete checkout
- Users can upload and share media files
- Admins can manage inventory

**Characteristics:**

- Testable through user acceptance testing (actual users testing the software in real-world scenarios)
- User-facing and interaction-focused
- Specific inputs, processes, and outputs

## Non-functional requirements: how well it performs

Non-functional requirements specify quality attributes and performance criteria that affect user experience.

### Key Categories

⚡ **Performance**

- Page load time under 2 seconds
- Interactive elements respond within 100ms
- JavaScript bundles under 250KB compressed
- Debouncing or throttling network requests
- Pre-fetching and caching data

📈 **Scalability**

- Virtual scrolling for large datasets (1000+ items)
- Optimised rendering with memoisation for large lists
- CDN delivery for static assets and images

🤝 **Reliability**

- Graceful error handling with user-friendly messages
- Offline functionality with service workers
- Auto-retry failed API requests with exponential backoff
- Client-side validation to prevent invalid form submissions
- Component error boundaries prevent entire app crashes

🔒 **Security**

- Input sanitisation and XSS prevention
- Client-side form validation with server-side verification

📱 **Usability**

- Accessibility
  - [WCAG compliance](https://www.w3.org/TR/WCAG22/)
  - Keyboard navigation support
  - Screen reader compatibility
  - Proper colour contrast
  - Alt text for images, captions for videos
- Cross-browser compatibility
- Mobile responsive

---

## Strategies to help focus on solving the most important requirements

### 1. Write Clear User Stories

> As a [user type], I want [functionality] so that [benefit],
> and it should [performance criteria].

> Example: "As a mobile user, I want to search products
> so I can find what I need, and results should appear within 1 second."

This user story includes both functional and non-functional requirements:

**Functional requirement**: "I want to search products so I can find what I need"

- What the user can do (search functionality)
- The core feature behaviour

**Non-functional requirement**: "results should appear within 1 second"

- How well the feature performs (response time)
- Quality constraint that affects user experience

**Context**: "As a mobile user"

- Adds important constraints (mobile performance considerations, touch interface, potentially slower network)
- Helps prioritise mobile-specific optimisations

### 2. Define Acceptance Criteria

**Functional:**

- Given user enters search term
- When they press enter
- Then relevant products display sorted by relevance

**Non-Functional:**

- Search results appear within 1 second
- Works on mobile devices
- Handles 1000+ concurrent users

### 3. Prioritise with MoSCoW

Consider both functional and non functional requirements into a prioritisation

- **Must Have**: Core functionality and critical performance
- **Should Have**: Important features and optimisations
- **Could Have**: Nice-to-have features
- **Won't Have**: Out-of-scope items

## Common pitfalls → how to avoid them

1. **Overlooking non-functional requirements** → include them in your definition of done
2. **Vague requirements** → use specific, measurable criteria
3. **Ignoring trade-offs** → make decisions based on priorities and context
4. **One-size-fits-all** → segment requirements by user type and context
