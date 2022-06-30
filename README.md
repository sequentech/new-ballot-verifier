# new-ballot-verifier

Sequent cast-as-intended verifier. It allows a voter to audit an (spoiled) ballot. `ballot-verifier` implements the 'cast or cancel' procedure described on the paper [Ballot Casting Assurance via Voter-Initiated Poll Station Auditing](https://www.usenix.org/legacy/event/evt07/tech/full_papers/benaloh/benaloh.pdf) by Josh Benaloh.

# Development environment

new-ballot-verifier uses [Nix Package Manager] as its package builder. To build
new-ballot-verifier, **first [install Nix]** correctly in your system.

After you have installed Nix, enter the development environment with:

```bash
nix develop
```

## Compiling rust code

At the moment you need to compile the rust library included in this repo
locally. Assuming a starting point from the root folder of this repo and after
executing `nix develop`:

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


[Nix Package Manager]: https://nixos.org/
[install Nix]: https://nixos.org/
