+++
title = "Should I use GNU/guix?"
author = ["Javier Pacheco"]
description = "My thoughts about use guix (or not)."
date = 2025-01-14T20:03:00-06:00
tags = ["blog", "linux", "tecnology"]
draft = false
toc = true
+++

## What is GNU/guix. {#what-is-gnu-guix-dot}

**GNU/Guix** is a functional package manager and a complete operating system distribution, part of the GNU Project. It is designed to provide a reliable and customizable environment for managing software and configurations.

It is basically `NixOS` but instead of using nix it uses `Schem Common Lisp` as interpreter.


## Why Use GNU Guix? {#why-use-gnu-guix}

Freedom and transparency in software management.
Avoids common issues like dependency hell or broken systems due to upgrades.
Ideal for developers, researchers, and system administrators who value reproducibility and control.


## I'm currently using NixOS, should I switch to guix? {#i-m-currently-using-nixos-should-i-switch-to-guix}

The most common answer for that is very universal: `It depends`, if you want to learn more about lisp definetly this is your distribution, for me this is the fastest init that I ever had, and the best of everything is that I can install `nix` the package manager and use it whitin guix, is fantastic.


## Conclusions. {#conclusions-dot}

I have been using `guix` for about a month, and I have to admit that is fast as hell, but in the other part this distribution have a lack of packages, of course you can make the `templates` in scheme and your are going to have any package, but for me and my workflow I need some packages that not are available in guix, but of course in now days we have more options and my solution for the lack of packages was install `nix` inside my guix environment, so I can install packages in its latest version.

So, for me this is kind of the best Linux distribution because of the structure, is like `Venom linux` combined with `NixOS` in my opinion.
