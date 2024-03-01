({ config, lib, dream2nix, ... }: {
  imports = [
    dream2nix.modules.dream2nix.nodejs-package-json-v3
    dream2nix.modules.dream2nix.nodejs-granular-v3
  ];
  deps = { nixpkgs, extra, ... }: {
    inherit (nixpkgs) stdenv typescript;
    inherit (extra) gitignore;
  };

  nodejs-granular-v3 = {
    buildScript = ''
      ${config.deps.typescript}/bin/tsc -b
    '';
    runBuild = true;
  };

  nodejs-package-json.npmArgs = [ "--no-bin-links" ];

  name = lib.mkForce "safer-react";
  version = lib.mkForce "0.1.0";

  mkDerivation = rec {
    src = config.deps.gitignore.lib.gitignoreSource (lib.cleanSourceWith {
      filter = name: type:
        let baseName = baseNameOf (toString name);
        in !(lib.hasSuffix ".nix" baseName || lib.hasSuffix ".bak" baseName
          || lib.hasPrefix "." baseName
          || builtins.elem baseName [ "lock.json" "flake.lock" ]);
      src = lib.cleanSource ./.;
    });
    checkPhase = "";
    doCheck = true;
    preInstall = ''
      chmod -R +w node_modules
      rm -rf node_modules
      rm package.json.bak
    '';
    postInstall = ''
      rm -r $out/lib/node_modules/.bin
    '';
  };
})
