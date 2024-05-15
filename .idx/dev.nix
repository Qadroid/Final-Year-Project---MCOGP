# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-23.11"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20   # Keep Node.js if you still need it
    pkgs.bun         # Add bun to your packages
  ];
  # Sets environment variables in the workspace
  env = {};

  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "svelte.svelte-vscode"
    ];
    workspace = {
      # Runs when a workspace is first created with this `dev.nix` file
      onCreate = {
        npm-install = "npm install";  
        bun-install = "bun install"; # Run bun install
      };
    };

    # Enable previews and customize configuration (adjust as needed)
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "run" "dev" "--" "--port" "$PORT" "--host" "0.0.0.0"];
          manager = "web";
        };
      };
    };
  };
}
