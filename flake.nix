{
  description = "React wrapper with safer types";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.11";
    flake-parts.url = "github:hercules-ci/flake-parts";
    treefmt.url = "github:numtide/treefmt-nix";
  };

  outputs = inputs @ {
    nixpkgs,
    flake-parts,
    treefmt,
    ...
  }:
    flake-parts.lib.mkFlake {inherit inputs;} {
      imports = [treefmt.flakeModule];
      systems = nixpkgs.lib.systems.flakeExposed;

      perSystem = {
        config,
        self',
        inputs',
        pkgs,
        system,
        ...
      }:
        with builtins; with pkgs; let
          fmt = config.treefmt.build.programs;
          devInputs = [nodejs git typescript fmt.alejandra fmt.prettier];
          npmrc = writeText ".npmrc" ''
            //registry.npmjs.org/:_authToken=$${NODE_AUTH_TOKEN}
            registry=https://registry.npmjs.org/
            always-auth=true
          '';
          commands = rec {
            build = writeShellApplication {
              name = "build";
              runtimeInputs = devInputs;
              text = "tsc";
            };
            ci-build = writeShellApplication {
              name = "ci-build";
              runtimeInputs = devInputs ++ [build];
              text = ''
                npm ci
                build
              '';
            };
            ci-publish = writeShellApplication {
              name = "ci-publish";
              runtimeInputs = devInputs ++ [ci-build];
              text = ''
                ci-build
                ln -s ${npmrc} .npmrc
                npm publish --access public
              '';
            };
          };
        in {
          devShells.default = pkgs.mkShell {
            buildInputs = devInputs ++ attrValues commands;

            nativeBuildInputs = [config.treefmt.build.wrapper];

            shellHook = ''
              export PATH="$PWD/node_modules/.bin:$PATH"
            '';
          };

          treefmt = {
            projectRootFile = "flake.nix";
            programs = {
              alejandra.enable = true;
              prettier.enable = true;
            };
          };
        };
    };
}
