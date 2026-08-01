# AI entry point

This file is a **dispatch layer**, not an authoritative project document. Canonical contracts own durable truth.

Start every session in this order:

1. Read [`docs/project/entry.md`](docs/project/entry.md).
2. Read [`ai/handoff.md`](ai/handoff.md) if continuing existing work.

Then route by responsibility:

| Question type | Owner |
|---------------|-------|
| What is this project? Where do truths live? | `docs/project/entry.md` |
| What changed recently? What is next? What branch? | `ai/handoff.md` |
| Why was a decision made? | Named ADR in `docs/adr/` |
| Package / token boundaries? | `ARCHITECTURE.md` |
| Token layers / domains? | `tokens/README.md` |
| SeamKit adaptation? | `ADAPTATION.md` |
| How do I contribute / run commands? | `README.md`, `CONTRIBUTING.md`, `package.json` |

Do not duplicate durable project knowledge here.
