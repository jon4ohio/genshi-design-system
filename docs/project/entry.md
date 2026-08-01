# Project Entry

**Contract:** Project Entry  
**Problem coordinated:** Where am I? What is this project?

---

## Adoption path

**Existing Project / Orient Branch B** — map owners first; gap-fill only. Day-to-day coordination lives in this repository (not jon4ohio/anchor).

## Purpose

**Genshi Design System** is the public OSS production home for Genshi: layered design tokens (Core → Intent → Component), Lit canonical web components (`gsh-*`), framework adapters, themes, and Storybook.

Research and validation lineage lives in [Genshi 原子](https://github.com/jon4ohio/genshi). This repository ships packages, releases, and documentation.

Product detail for visitors: [README.md](../../README.md).

## Non-goals

- Expanding the component catalog beyond the ADR-approved exemplary set until post-prerelease review ([CONTRIBUTING.md](../../CONTRIBUTING.md))
- Implementing Vue/Angular adapters beyond stubs (Phase 3 — [ADR-0007](../adr/ADR-0007-Framework-Adapter-Strategy.md))
- Multi-brand theme switching UI ([ADR-0005](../adr/ADR-0005-Theme-Architecture.md) out of scope)
- Rewriting or renumbering ADRs from the research repo ([ADR-0008](../adr/ADR-0008-Repository-Separation.md))

## Start here

1. Read this Entry for orientation and where truths live.
2. Continuing work → [Handoff](../../ai/handoff.md).
3. Decisions → named ADR in [docs/adr/](../adr/index.md).
4. Package/token boundaries → [ARCHITECTURE.md](../../ARCHITECTURE.md).
5. Contribution workflow → [CONTRIBUTING.md](../../CONTRIBUTING.md).

## Ownership map

| Artifact | When | Responsibility |
|----------|------|----------------|
| [README.md](../../README.md) | Pre-existing | Product page (visitors) |
| [ARCHITECTURE.md](../../ARCHITECTURE.md) | Pre-existing | Frozen package and token boundaries |
| [docs/adr/](../adr/) | Pre-existing | Decisions (Accepted ADRs) |
| [tokens/README.md](../../tokens/README.md) | Pre-existing | Token layer / domain vocabulary |
| [ADAPTATION.md](../../ADAPTATION.md) | Pre-existing | SeamKit → Genshi adaptation procedure |
| [CONTRIBUTING.md](../../CONTRIBUTING.md) | Pre-existing | Contributor procedure (not a contract) |
| [packages/docs/README.md](../../packages/docs/README.md) | Pre-existing | Docs / Storybook map |
| `scripts/validate-*.mjs` | Pre-existing | Automated boundary/terminology checks |
| This Entry | Gap-filled | Project identity / orientation |
| [ai/handoff.md](../../ai/handoff.md) | Gap-filled | Session continuity |
| [AGENTS.md](../../AGENTS.md) | Gap-filled | Thin AI dispatch (not a contract) |
| [.anchor/config.json](../../.anchor/config.json) | Init | Capability pin + path map |

## Where truths live

| Responsibility | Owner | Location |
|----------------|-------|----------|
| Project identity / orientation | Entry | This file |
| Session continuity | Handoff | [ai/handoff.md](../../ai/handoff.md) |
| Decisions | ADR | [docs/adr/](../adr/) |
| Frozen architecture boundaries | Architecture summary | [ARCHITECTURE.md](../../ARCHITECTURE.md) |
| Token layers and domains | Token docs | [tokens/README.md](../../tokens/README.md) |
| Vendor adaptation | Adaptation docs | [ADAPTATION.md](../../ADAPTATION.md) |
| Product page (visitors) | README | [README.md](../../README.md) |
| Contribution workflow | CONTRIBUTING | [CONTRIBUTING.md](../../CONTRIBUTING.md) |

**Authority notes**

- Why Genshi exists → [ADR-0001](../adr/ADR-0001-Why-Genshi-Exists.md)
- Token layers (Intent) → [ADR-0002](../adr/ADR-0002-Layered-Token-Architecture.md)
- Platform, Lit, themes, foundation, adapters, repo split → [ADR-0003](../adr/ADR-0003-Platform-Architecture.md)–[ADR-0008](../adr/ADR-0008-Repository-Separation.md)
- Architecture · Taxonomy · Adaptation (Phase 2.1) → [ADR-0009](../adr/ADR-0009-Architecture-Taxonomy-Adaptation.md)
- Components consume **Component Tokens** only — never Intent or Core from component CSS

## Contracts in use

| Contract | Implementation | Location |
|----------|----------------|----------|
| Project Entry | Anchor-compatible Entry | `docs/project/entry.md` |
| Handoff | Anchor-compatible rolling Handoff | `ai/handoff.md` |
| ADR | [Operational ADR](https://github.com/jon4ohio/operational-adr) (Accepted) | `docs/adr/` |

Additional Anchor contracts (Spec, Skill, Playbook, Review) are adopted only when real work requires them. CONTRIBUTING and validate scripts remain informal procedure/quality until repetition earns promotion.

## AI entry points (dispatch only)

- Canonical dispatch: [AGENTS.md](../../AGENTS.md)
- Rule: AI entry files must not restate durable knowledge owned by Entry, Handoff, ADRs, or architecture docs.
