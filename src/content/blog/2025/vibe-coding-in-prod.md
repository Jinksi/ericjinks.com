---
title: 'Vibe coding: adapting from code writers to system designers and verifiers'
pubDate: 2025-08-07
description: "A summary of a talk by Anthropic's Erik Schluntz"
showDate: true
tags: ai
isDraft: false
---

In a recent talk titled [Vibe coding in prod](https://www.youtube.com/watch?v=fHWFF_pnqDk), Erik Schluntz from Anthropic (who you may know from the excellent [Building Effective AI Agents](https://www.anthropic.com/engineering/building-effective-agents) article) made a compelling case for how to vibe code effectively, letting AI write your code while you focus on the product. Erik argues that it's not only inevitable, it's necessary.

"Vibe coding" now has many definitions, here Erik is using the definition to describe the act of no longer reviewing every line, but trusting AI to handle implementation while you verify behaviour.

**"Traditional" AI coding:**

Human writes prompt → AI suggests code → Human reviews each line → Human accepts/modifies.

**Vibe coding:**

Human defines requirements → AI implements solution → Human verifies outputs → System deployed.

## Being Claude's Product Manager

The key insight: **"Ask not what Claude can do for you, but what you can do for Claude."**

When vibe coding, you become the AI's product manager. This means spending 15-20 minutes collecting context, exploring the codebase together, and building a plan before letting the AI execute.

Erik's team recently merged a 22,000-line change to their production codebase, largely written by Claude. They invested days in requirements gathering and designed verifiable checkpoints. Not reviewing code, but ensuring correctness through behaviour.

## Strategic implementation: focus on leaf nodes

The practical approach is to focus on "leaf nodes" – features that nothing else depends on. For example, in a React codebase, we might have a human-controlled core design system and component library, and let AI write isolated features that consume these components.

Tech debt in leaf nodes is contained. If something needs refactoring, it won't cascade through your entire system.

## Building verifiable systems

The solution isn't new. CTOs manage specialists without being experts in every domain. CEOs verify accounting without understanding every calculation. The solution here is: **verifiable abstraction layers**.

For software, this means:

- Human-readable inputs and outputs
- Comprehensive stress tests
- Behaviour-driven acceptance tests
- System-level validation

Instead of asking "Is this code good?", ask "Does this system behave correctly?".

## Practical tips

1. **Start with leaf nodes** – isolated features where mistakes aren't catastrophic.
2. **Write minimal end-to-end tests** – focus on behaviour you can verify without reading implementation details.
3. **Combine tools** – use Claude Code for implementation, Cursor for targeted fixes.

## Will I stop learning?

Won't developers lose skills if they're not writing code? Erik's take is optimistic. While lazy developers might coast, motivated ones will:

- Learn faster with AI as a constant pair programmer.
- Take more experimental shots. Collapse the time it takes to experiment and iterate.
- Focus on higher-level architectural decisions.

## The bottom line

Vibe coding isn't about abandoning responsibility. It's about **adapting from code writers to system designers and verifiers**. As Erik put it: "In a year or two, demanding to read every line of code will make you the bottleneck".

The challenge isn't whether to embrace vibe coding, but how to do it responsibly. Companies and engineers who figure this out won't only be more productive, they'll be the only ones able to leverage exponential AI improvements.

Forget the code exists, but never forget the product exists.
