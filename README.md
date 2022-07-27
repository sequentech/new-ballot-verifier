<!--
SPDX-FileCopyrightText: 2022 Felix Robles <felix@sequentech.io>

SPDX-License-Identifier: AGPL-3.0-only
-->
# new-ballot-verifier
[![Slack][slack-badge]][slack-link]
[![Build Status][build-badge]][build-link]
[![codecov][codecov-badge]][codecov-link]
[![Dependency status][dependencies-badge]][dependencies-link]
[![License][license-badge]][license-link]
[![REUSE][reuse-badge]][reuse-link]

Sequent cast-as-intended verifier. It allows a voter to audit an (spoiled) ballot. `ballot-verifier` implements the 'cast or cancel' procedure described on the paper [Ballot Casting Assurance via Voter-Initiated Poll Station Auditing](https://www.usenix.org/legacy/event/evt07/tech/full_papers/benaloh/benaloh.pdf) by Josh Benaloh.

## Continuous Integration

There are multiple checks executed through the usage of Github Actions to verify
the health of the code when pushed:
1. **Compiler warning/errors**: checked using `cargo check` and 
`cargo check ---tests`. Use `cargo fix` and `cargo fix --tests` to fix the 
issues that appear.
2. **Unit tests**: check that all unit tests pass using `cargo test`.
3. **Code style**: check that the code style follows standard Rust format, using
`cargo fmt -- --check`. Fix it using `cargo fmt`.
4. **Code linting**: Lint that checks for common Rust mistakes using 
`cargo clippy`. You can try to fix automatically most of those mistakes using
`cargo clippy --fix -Z unstable-options`.
5. **Code coverage**: Detects code coverage with [cargo-tarpaulin] and pushes
the information (in master branch) to [codecov].
6. **License compliance**: Check using [REUSE] for license compliance within
the project, verifying that every file is REUSE-compliant and thus has a 
copyright notice header.
7. **Dependencies scan**: Audit dependencies for security vulnerabilities in the
[RustSec Advisory Database], unmaintained dependencies, incompatible licenses
and banned packages using [cargo-deny]. Use `cargo deny --all-features check`
to try to solve the detected issues. We also have configured [dependabot] to
notify and create PRs on version updates.
8. **Benchmark performance**: Check benchmark performance and alert on
regressions using `cargo bench` and [github-action-benchmark].
9. **CLA compliance**: Check that all committers have signed the 
[Contributor License Agreement] using [CLA Assistant bot].
10. **Browser testing**: Check the library works on different browsers and operating
systems using [browserstack](https://www.browserstack.com/). Run `npm run local`
on the `browserstack` folder to try it locally. You'll need to configure the env variables 
`GIT_COMMIT_SHA`, `BROWSERSTACK_USERNAME`, `BROWSERSTACK_ACCESS_KEY`.

## Development environment

new-ballot-verifier uses [Github dev containers] to facilitate development. To start developing 
new-ballot-verifier, clone the github repo locally, and open the folder in Visual Studio Code 
in a container. This will configure the same environment that new-ballot-verifier developers 
use, including installing required packages and VS Code plugins.

We've tested this dev container for Linux x86_64 and Mac Os arch64 architectures. Unfortunately
at the moment it doesn't work with Github Codespaces as nix doesn't work on Github Codespaces yet.
Also the current dev container configuration for new-ballot-verifier doesn't allow commiting 
to the git repo from the dev container, you should use git on a local terminal.

## Nix reproducible builds

new-ballot-verifier uses [Nix Package Manager] as its package builder. To build
new-ballot-verifier, **first [install Nix]** correctly in your system.

After you have installed Nix, enter the development environment with:

```bash
nix develop
```

## Compiling rust code

At the moment you need to compile the rust library included in this repo
locally. Assuming a starting point from the root folder of this repo and after
executing `nix develop`. If you're running the project on a dev container,
you shouldn't need to install it.

```bash
cd rust/
export RUSTFLAGS='-C target-feature=+atomics,+bulk-memory,+mutable-globals'
wasm-pack build \
    --out-name index \
    --release \
    --target web \
    --features=wasmtest \
    -- -Z build-std=panic_abort,std
wasm-pack pack .
cd ..
```

# Launching the UI in development mode

Once you have compiled the rust code and within the `nix develop` environment,
you can start the react development server from the repository's root folder:

```bash
yarn # install dependencies
yarn start
```

## Build

Once you have compiled the rust code and within the `nix develop` environment,
you can build the project for production with `yarn build` in the repository's
root folder. The result will be available in the `build/` folder.


[cargo-deny]: https://github.com/EmbarkStudios/cargo-deny
[cargo-edit]: https://crates.io/crates/cargo-edit
[codecov]: https://codecov.io/
[REUSE]: https://reuse.software/
[cargo-tarpaulin]: https://github.com/xd009642/tarpaulin
[github-action-benchmark]: https://github.com/benchmark-action/github-action-benchmark

[Contributor License Agreement]: https://cla-assistant.io/sequentech/new-ballot-verifier?pullRequest=27
[CLA Assistant bot]: https://github.com/cla-assistant/cla-assistant
[dependabot]:https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuring-dependabot-version-updates
[RustSec Advisory Database]: https://github.com/RustSec/advisory-db/
[Nix Package Manager]: https://nixos.org/
[install Nix]: https://nixos.org/
[Github dev containers]: https://docs.github.com/en/codespaces/setting-up-your-project-for-codespaces/introduction-to-dev-containers

[slack-badge]: https://img.shields.io/badge/Join_us_on_Slack!-sequent--talk-blue.svg?longCache=true&logo=slack
[slack-link]: https://join.slack.com/t/sequentech/shared_invite/zt-1bve9z0px-IF4Je04NJM8AEkCAcdBVWg

[build-badge]: https://github.com/sequentech/new-ballot-verifier/workflows/CI/badge.svg?branch=main&event=push
[build-link]: https://github.com/sequentech/new-ballot-verifier/actions?query=workflow%3ACI

[codecov-badge]: https://codecov.io/gh/sequentech/new-ballot-verifier/branch/main/graph/badge.svg?token=W5QNYDEJCX
[codecov-link]: https://codecov.io/gh/sequentech/new-ballot-verifier

[dependencies-badge]: https://deps.rs/repo/github/sequentech/new-ballot-verifier/status.svg
[dependencies-link]: https://deps.rs/repo/github/sequentech/new-ballot-verifier

[license-badge]: https://img.shields.io/github/license/sequentech/new-ballot-verifier?label=license
[license-link]: https://github.com/sequentech/new-ballot-verifier/blob/master/LICENSE

[reuse-badge]: https://api.reuse.software/badge/github.com/sequentech/new-ballot-verifier
[reuse-link]: https://api.reuse.software/info/github.com/sequentech/new-ballot-verifier
