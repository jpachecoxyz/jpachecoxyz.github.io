+++
title = "Shell-utils"
author = ["Javier Pacheco"]
description = "A github repo that stores shell scripts utilities for x and wayland."
date = 2024-07-04
tags = ["linux", "script"]
draft = false
toc = true
+++

## Overview {#overview}

Welcome to the Shell Utilities [repository](https://github.com/jpachecoxyz/shell-utils) This project provides a collection of shell scripts tailored for different window managers and environments, including i3, Hyprland, and Sway, on X11 and Wayland.


## Repository Structure {#repository-structure}

The repository is organized into directories based on the environment and window manager:

```shell
.
├── wayland
│   ├── hyprland
│   └── sway
└── x11
    └── i3
```

wayland/hyprland
: Scripts for Hyprland on Wayland.

wayland/sway
: Scripts for Sway on Wayland.

x11/i3
: Scripts for i3 on X11.


## Installation {#installation}

To install the scripts, use the provided `install.sh` script. You can install scripts for a specific window manager or all at once.

NOTE: The `install.sh` scripts use `$HOME/.local/bin` as the target, you can edit this variable inside the script, or copy the files manually somewhere as you have your path.

```shell
# Install scripts for a specific window manager
./install.sh sway
./install.sh hyprland
./install.sh i3

# Install all scripts
./install.sh all
```


## Usage {#usage}

Each script includes usage instructions in the comments at the top. You can run a script directly from the terminal or integrate it into your workflow.


## Contributing {#contributing}

We welcome contributions! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or fix.
3.  Make your changes and commit them with descriptive messages.
4.  Push your changes to your fork.
5.  Submit a pull request to the main repository.


## Contact {#contact}

For questions or suggestions, please open an issue on GitHub or contact [Javier Pacheco](mailto:javier@jpacheco.xyz).
