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
          mkYarnNixPatched = { yarnLock, flags ? [] }:
            pkgs.runCommand
              "yarn.nix"
              {}
              ''
                # filter the local dependency as yarn2nix doesn't support it
                awk '/new-ballot-verifier-lib/,/resolved/ { next; }; /.*/ {print}' ${yarnLock} > fixed-yarn.lock
                ${pkgs.yarn2nix}/bin/yarn2nix --lockfile fixed-yarn.lock --no-patch --builtin-fetchgit ${pkgs.lib.escapeShellArgs flags} > $out
              '';
          rust-wasm = pkgs
            .rust-bin
            .nightly
            ."2022-04-07"
            .default
            .override {
                extensions = [ "rust-src" ];
                targets = [ "wasm32-unknown-unknown" ];
            };

          # see https://github.com/NixOS/nixpkgs/blob/master/doc/languages-frameworks/rust.section.md#importing-a-cargolock-file-importing-a-cargolock-file
          cargoPatches = {
              cargoLock = let
                  fixupLockFile = path: (builtins.readFile path);
              in {
                lockFileContents = fixupLockFile ./Cargo.lock.copy;
                  outputHashes = {
                  "sequent-core-0.1.0" = "sha256-ii+GZSQGJbrLl154riEeSdu5SnS2aOAKrdoAkTWWTGU=";
                  "strand-0.1.0" = "sha256-9EERxLvRrFLqaMC4qEbSsOnjWFUTNycPzOv0nW46Pog=";
                };
              };
              postPatch = ''
                  cp ${./Cargo.lock.copy} Cargo.lock
              '';
          };
          buildRustPackageWithCargo = cargoArgs: pkgs.rustPlatform.buildRustPackage (cargoPatches // cargoArgs);

        # resulting packages of the flake
        in rec {
          packages.new-ballot-verifier-lib = buildRustPackageWithCargo {
            pname = "new-ballot-verifier-lib";
            version = "0.0.1";
            src = ./.;
            nativeBuildInputs = [
              rust-wasm
              pkgs.nodePackages.npm
              pkgs.wasm-pack
              pkgs.wasm-bindgen-cli
              pkgs.libiconv
              pkgs.reuse
            ];
            buildPhase = ''
              echo 'Build: wasm-pack build'
              wasm-pack build --mode no-install --out-name index --release --target web --features=wasmtest
            '';
            installPhase = "
              # set HOME temporarily to fix npm pack
              mkdir -p $out/temp_home
              export HOME=$out/temp_home
              echo 'Install: wasm-pack pack'
              wasm-pack -v pack .
              rm -Rf $out/temp_home
              cp pkg/new-ballot-verifier-lib-*.tgz $out
              ";
          };

          packages.new-ballot-verifier = pkgs.mkYarnPackage rec {
            pname = "new-ballot-verifier";
            version = "0.0.1";
            extraBuildInputs = [
              self.packages.${system}.new-ballot-verifier-lib
            ];
            src = self;
            yarnLock = src + "/yarn.lock";
            yarnNix = mkYarnNixPatched { inherit yarnLock; };
            yarnPreBuild = ''
              echo 'EDULIX: yarnPreBuild'
              pwd
              ls -lah .
              mkdir -p rust/pkg
              cp ${self.packages.${system}.new-ballot-verifier-lib}/* rust/pkg/
            '';
            preBuild = ''
              echo 'EDULIX: preBuild'
              pwd
              ls -lah .
            '';
          };
          # new-ballot-verifier-lib is the default package
          defaultPackage = packages.new-ballot-verifier;

          # configure the dev shell
          devShell = (
            pkgs.mkShell.override { stdenv = pkgs.clangStdenv; }
          ) { 
            buildInputs = 
              packages.new-ballot-verifier-lib.nativeBuildInputs ++
              [ pkgs.bash pkgs.yarn ]; 
          };
        }
    );
}