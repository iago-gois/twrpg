# Performance Baseline Log

Use this file to record every performance measurement run during the refactor.
Keep one section per run, and do not overwrite previous results.

## Measurement Standard
- Build with `pnpm build` before collecting bundle metrics.
- Run app with `pnpm start` for Lighthouse and runtime checks.
- Collect 3 runs per route/profile and record the median.
- Track at least: `/en`, `/en/database/monsters`, and one detail page.

## Run Template

### Run: 2026-03-21 19:56 (local)
| Field | Value |
| --- | --- |
| Phase | Baseline |
| Branch | `main` |
| Commit | `426956e` |
| Environment | Local prod build |
| Device Profile | Mobile + Desktop |
| Browser | Chrome |

#### Validation Gates
- [ ] `pnpm check`
- [ ] `pnpm build`
- [ ] `pnpm exec tsc --noEmit` (TS-heavy changes only)

#### Build Output (First Load JS)
| Route | First Load JS | Delta vs previous | Notes |
| --- | --- | --- | --- |
| `/en` |  |  |  |
| `/en/database/monsters` |  |  |  |
| `/en/database/monsters/[slug]` |  |  |  |

#### Core Web Vitals and TTFB (median of 3 runs)
| Route | Profile | LCP | INP | CLS | TTFB | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `/en` | Mobile |  |  |  |  |  |
| `/en/database/monsters` | Mobile |  |  |  |  |  |
| `/en/database/monsters/[slug]` | Mobile |  |  |  |  |  |
| `/en` | Desktop |  |  |  |  |  |

#### Supabase Query Latency
| Query/Endpoint | Context | p50 | p75 | p95 | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |
|  |  |  |  |  |  |

#### Outcome
- [ ] No Core Web Vitals regression.
- [ ] At least one meaningful gain in rendering, data-fetching, or bundle size.
- [ ] Regressions documented with follow-up actions.

#### Follow-up Tasks
- [ ]
- [ ]

---

### Run: YYYY-MM-DD HH:mm (local)
Copy the section above for each new run.
