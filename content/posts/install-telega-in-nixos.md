+++
title = "Install telega in nixos"
description = "How to install telega and use it in NixOS"
date = 2024-08-21
tags = ["telega", "linux", "nixos"]
draft = false
toc = true
+++

What is telega?.
---
According to the [Github](https://github.com/zevlg/telega.el) repository:

Telega
: telega.el is full featured unofficial client for Telegram platform for GNU Emacs.

---

As you may know, my main OS, at this time (2024-08-21) is `NixOS`, so I was trying to install `Telega` in my emacs, but as you can imagine, the file system hierarchy don't works "normal" in `NixOS`, so is a little tricky set up the environment to actually make `Telega` works.


## Requisites: {#requisites}

-   gnumake. (To compile).
-   cmake (To compile).
-   tdlib (Version &gt; 1.8.29).


## Process of installation. {#process-of-installation-dot}

1.  install the dependencies using your `configuration.nix`, `home-manager`, or wathever method you use to install packages in `NixOS`.
2.  Install Telega in emacs.
    ```elisp
    (use-package telega
    :ensure t)
    ```
    <div class="src-block-caption">
      <span class="src-block-number">Code Snippet 1:</span>
      Example of telega installation unsing use-package.
    </div>
3.  Now, because I use `NixOS` (by the way), you must know that the file system hierarchy don't works same as in linux or macOS, so I need to declare where telega is going to see the `tdlib` libraries, so:
    ```elisp
    (setq telega-server-lib-prefix "/home/user/.nix-profile/")
    ```
4.  Compile Telega-server inside emacs.
    ```text
    M-x telega-server-build
    ```
    Or simply run telega:
    ```text
    M-x telega
    ```

With that, Telega must be compiled, and ready to go.
