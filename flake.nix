{
  description = "Safer React types";

  inputs = {
    soap.url = "github:jedahu/soap";

    nixpkgs.url = "github:NixOS/nixpkgs/nixos-23.11";
    devenv.url = "github:cachix/devenv";
    nix2container.url = "github:nlewo/nix2container";
    nix2container.inputs.nixpkgs.follows = "nixpkgs";
    mk-shell-bin.url = "github:rrbutani/nix-mk-shell-bin";
    dream2nix.url = "github:nix-community/dream2nix";
    gitignore = {
      url = "github:hercules-ci/gitignore.nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  nixConfig = {
    extra-trusted-public-keys =
      "devenv.cachix.org-1:w1cLUi8dv3hnoSPGAuibQv+f9TZLr6cv/Hm9XgU50cw=";
    extra-substituters = "https://devenv.cachix.org";
  };

  outputs = inputs@{ flake-parts, dream2nix, devenv, soap, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      imports = [ soap.flakeModules.typescript devenv.flakeModule ];
      systems = [
        "x86_64-linux"
        "i686-linux"
        "x86_64-darwin"
        "aarch64-linux"
        "aarch64-darwin"
      ];

      perSystem = { config, self', inputs', pkgs, system, ... }: {
        soap.typescript.project = {
          name = "safer-react";
          version = "0.1.0";
          dependencyOverrides = { };
          paths = {
            projectRoot = ./.;
            projectRootFile = "flake.nix";
            package = ./.;
          };
        };

        devenv.shells.default = {
          enterShell = ''
            echo Hello
          '';

          pre-commit.hooks.tsc.enable = true;
        };

      };
    };
}
