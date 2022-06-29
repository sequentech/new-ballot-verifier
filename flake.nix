# SPDX-FileCopyrightText: 2021 Eduardo Robles <edulix@sequentech.io>
#
# SPDX-License-Identifier: AGPL-3.0-only

{
  description = "Flake for test rust code";

  # input
  inputs.rust-overlay.url = "github:oxalica/rust-overlay";
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-22.05";
  inputs.flake-utils.url = "github:numtide/flake-utils";

  # output function of this flake
  outputs = { self, nixpkgs, flake-utils, rust-overlay }:
    flake-utils.lib.eachDefaultSystem (
      system:
        let 
          overlays = [ (import rust-overlay) ];
          # pkgs is just the nix packages
          pkgs = import nixpkgs {
            inherit system overlays;
          };
          rust-nightly = pkgs
            .rust-bin
            .selectLatestNightlyWith(
              toolchain: toolchain.default.override {
                extensions = [ "rust-src" ];
                targets = [ "wasm32-unknown-unknown" ];
              }
            );

        # resulting packages of the flake
        in rec {
          # WIP Derivation for new-ballot-verifier
          # Continue work here following https://srid.ca/rust-nix reference
          packages.new-ballot-verifier = pkgs.clangStdenv.mkDerivation {
            name = "new-ballot-verifier";
            version = "0.0.1";
            src = self;
            type = "git"; 
            submodules = "true";
            nativeBuildInputs = [
                rust-nightly
                pkgs.wasm-pack
                pkgs.wasm-bindgen-cli
                pkgs.libiconv
                pkgs.yarn
            ];
          };
          # new-ballot-verifier is the default package
          defaultPackage = packages.new-ballot-verifier;

          # configure the dev shell
          devShell = (
            pkgs.mkShell.override { stdenv = pkgs.clangStdenv; }
          ) { 
            buildInputs = 
              packages.new-ballot-verifier.nativeBuildInputs ++
              [ pkgs.bash ]; 
          };
        }
    );
}