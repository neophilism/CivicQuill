# CivicQuill development plan

Approved task scope: the owner's October 16, 2026 request for the shared document engine and two thin applications. Maintainer-authored decomposition version 1. This is a development plan, not a claim that the owner separately reviewed each PR.

The only machine-readable plan is registry/prs.json (14 units). Detailed implementation/acceptance/test/migration specs are in docs/prs/. Unit numbers are stable IDs, never GitHub PR numbers. The foundation is mapped to actual GitHub PR #1; live GitHub owns its current state. Do not equate a foundation commit with accepted unit completion.

| Unit | Planned PR | Dependencies |
| --- | --- | --- |
| [LEG-001](prs/LEG-001.md) | Legislation application foundation | DCE-001 |
| [LEG-002](prs/LEG-002.md) | Civic application shell and engine integration | LEG-001, DCE-038 |
| [LEG-003](prs/LEG-003.md) | Jurisdictions and legislative document templates | LEG-002, DCE-006, DCE-007, DCE-025 |
| [LEG-004](prs/LEG-004.md) | Constituency and participant trust layers | LEG-002, DCE-011 |
| [LEG-005](prs/LEG-005.md) | Verified elected-official accounts and grants | LEG-004, DCE-029 |
| [LEG-006](prs/LEG-006.md) | Public input immutable source workflow | LEG-003, LEG-004, DCE-010, DCE-014 |
| [LEG-007](prs/LEG-007.md) | Public collaboration and amendment adoption | LEG-003, LEG-004, DCE-014 |
| [LEG-008](prs/LEG-008.md) | Research contributions and academic workspaces | LEG-006, LEG-007, DCE-015, DCE-024 |
| [LEG-009](prs/LEG-009.md) | Civic discussion, moderation and accessibility | LEG-008, DCE-016, DCE-017, DCE-033 |
| [LEG-010](prs/LEG-010.md) | Flexible legislation monetization | LEG-005, DCE-030 |
| [LEG-011](prs/LEG-011.md) | Public bill histories and independent verification | LEG-006, LEG-007, DCE-023 |
| [LEG-012](prs/LEG-012.md) | Support signatures and sponsor handoff packages | LEG-009, LEG-011, DCE-027 |
| [LEG-013](prs/LEG-013.md) | Administration, walkthrough and civic analytics | LEG-009, LEG-010, LEG-012, DCE-028, DCE-031 |
| [LEG-014](prs/LEG-014.md) | Civic production release and operations | LEG-013, DCE-039 |

Proceed in dependency order. After each real PR, validate, fix failures, merge only when live GitHub current-head checks and merge preflight permit, update mappings/evidence and continue. Never make human review a development prerequisite. Capacity, required credentials and spending are concrete states; continue independent ready work when one is unavailable.

Release gates: exact-head required CI; applicable security/authorization/accessibility/migration/browser/load tests; isolated approved infrastructure; authentic deployed commit and health evidence; real multiuser and independent artifact-verification journeys. Final human review occurs after deployment, without inventing independent review or certification evidence.
