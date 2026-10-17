# Legislation Collaboration

Thin application over the shared Document Collaboration Engine; do not duplicate editor, adoption, crypto or tally internals.

**Status: foundation under active development; not a deployed application.** Source is being published through tested GitHub pull requests. Live Engine Room/Boardroom registration, production database/authentication, E2EE sessions, payments, signing and blockchain execution require their own implementation and evidence.

- [Architecture, product differences and editor features](docs/ARCHITECTURE.md)
- [Development plan](docs/DEVELOPMENT_PLAN.md) and [canonical PR registry](registry/prs.json)
- [Security and truthful claim boundaries](docs/SECURITY.md)
- [Operations and credential requirements](docs/OPERATIONS.md)
- [Repository agent instructions](AGENTS.md)

Requires Node 24.19.0 (tested). No application dependencies or install step are needed for the foundation.

```sh
npm run check
node scripts/validate-profile.mjs
```

The consumer validator verifies and loads the bundled, read-only core release artifact. contracts/engine-provenance.json pins its exact source commit and SHA-256. No engine logic is forked. DGE_ENGINE_PATH can explicitly override the entry point for source development.

Actual PR mappings are recorded in registry/prs.json; bootstrap commits alone do not establish product acceptance. Follow the dependency-ready PR specifications to implement the full product. Human review is the final deployed handoff; actual failed technical gates remain blockers.
