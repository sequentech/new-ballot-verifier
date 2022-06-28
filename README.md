# new-ballot-verifier

Sequent cast-as-intended verifier. It allows a voter to audit an (spoiled) ballot. `ballot-verifier` implements the 'cast or cancel' procedure described on the paper [Ballot Casting Assurance via Voter-Initiated Poll Station Auditing](https://www.usenix.org/legacy/event/evt07/tech/full_papers/benaloh/benaloh.pdf) by Josh Benaloh.

# Installation

You need to install `yarn`. This project has been tested with `yarn` version 1.22.18 and `node` version v18.3.0 . At the moment you need to compile the rust library included in this repo locally.

Assuming a starting point from the root folder of this repo:

```
cd rust
export RUSTFLAGS='-C target-feature=+atomics,+bulk-memory,+mutable-globals'
rustup run nightly-2022-04-07 wasm-pack build --out-name index --release --target web --features=wasmtest -- -Z build-std=panic_abort,std
rustup run nightly-2022-04-07 wasm-pack pack .
cd ..
yarn
yarn start
```

# Build

Run `yarn build`. Builds the app for production to the `build` folder.
