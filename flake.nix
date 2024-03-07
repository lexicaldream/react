{
  description = "Safer React types";

  inputs = {
    nixpkgs.url = "nixpkgs";

    soap.url = "github:jedahu/soap";

    devenv.follows = "soap/devenv";
    dream2nix.follows = "soap/dream2nix";

    nix-github-actions = {
      url = "github:nix-community/nix-github-actions";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  nixConfig = {
    extra-trusted-public-keys = "devenv.cachix.org-1:w1cLUi8dv3hnoSPGAuibQv+f9TZLr6cv/Hm9XgU50cw=";
    extra-substituters = "https://devenv.cachix.org";
  };

  outputs = inputs @ {
    flake-parts,
    dream2nix,
    devenv,
    soap,
    nix-github-actions,
    ...
  }:
    flake-parts.lib.mkFlake {inherit inputs;} {
      imports = [soap.flakeModules.typescript];
      systems = [
        "x86_64-linux"
        "i686-linux"
        "x86_64-darwin"
        "aarch64-linux"
        "aarch64-darwin"
      ];

      perSystem = {
        config,
        self',
        inputs',
        pkgs,
        system,
        ...
      }: {
        soap.typescript.projects.default = {
          name = "safer-react";
          version = "0.1.0";
          packages = pkgs // {inherit (pkgs.nodePackages) eslint prettier;};
          paths = {
            projectRoot = ./.;
            projectRootFile = "flake.nix";
            package = ./.;
          };
        };

        packages.default = soap.lib.typescript.evalModules config.soap.typescript.projects.default {
          packageSets = {nixpkgs = inputs.nixpkgs.legacyPackages.${system};};
          modules = [
            soap.lib.typescript.dreamModule
          ];
        };

        devenv.shells.default = {
          pre-commit.hooks.tsc.enable = true;
        };
      };

      flake = {
      };
    };
}
