+++
title = "My Technical Journey"
author = ["Javier Pacheco"]
description = "Some of my thoughts about technology this 2025 year"
date = 2025-12-11
tags = ["personal", "thoughs"]
draft = false
toc = true
+++

## Introduction {#introduction}

The year 2025 has been one of constant learning, experimentation, and building.
Throughout the months, I explored a wide spectrum of topics—from industrial
hydraulics to Linux customization, Nix packaging, Emacs automation, Docker,
robotics, and more. This post summarizes my questions, discoveries, and
projects across this entire year.


## Industrial Automation, Hydraulics &amp; Plant Troubleshooting {#industrial-automation-hydraulics-and-plant-troubleshooting}


### Diagnosing Hydraulic Systems {#diagnosing-hydraulic-systems}

Early in the year, I worked through multiple hydraulic diagrams from injection
molding and die-casting machines. My questions focused on:

-   Why pistons advance by themselves.
-   Counterpressure issues during the return stroke.
-   How to interpret complex hydraulic schematics easily.
-   Which valves or cartridge assemblies should be inspected first.
-   Understanding accumulator sizing and nitrogen requirements for 1600T machines.

These investigations helped me diagnose real plant failures with more clarity.


### OPC UA Connectivity {#opc-ua-connectivity}

I explored how machines with built-in OPC Servers could share data with:

-   third-party HMIs
-   PLCs from other brands
-   OPC UA clients

I also worked with Python OPC UA clients, GUI tools, and Docker-based setups to
run dashboards in the browser (localhost/IP).


## DevOps, Linux Systems, and Tooling {#devops-linux-systems-and-tooling}


### NixOS and Linux Workflow Automation {#nixos-and-linux-workflow-automation}

Throughout 2025, I built a large ecosystem of scripts and tools:

-   An all-in-one NixOS + Home Manager updater:
    -   \`nixos-rebuild switch\`
    -   \`home-manager switch\`
    -   \`nix flake update\`
    -   generation cleanup
    -   interactive \`fzf\` menus
-   A fuzzy package searcher using \`allpackages.txt\` + \`fzf\`.
-   Scripts for encrypted storage:
    -   Tomb on Linux
    -   GPG-based vaults on Windows
-   Integrating encrypted vaults with Fossil version control.
-   Automatically launching Yazi tabs inside Zellij layouts.
-   Detecting OS and adjusting behaviors dynamically.

These tools made my day-to-day Linux work more productive and standardized.


### Software Packaging &amp; Compilation {#software-packaging-and-compilation}

I learned packaging and building custom software:

-   Creating a Nix package for **The Dark Mod** game installer.
-   Adding custom-built software to \`configuration.nix\`.
-   Building and installing Emacs 31 from Git with:
    -   tree-sitter
    -   native-comp
    -   mailutils
-   Compiling utilities like \`whdd\` on NixOS.
-   Writing xbps-src templates for Void Linux utilities.
-   Handling Go installs and removals (\`go install\`, cleanup, etc.).


### Docker &amp; Virtualization {#docker-and-virtualization}

I explored:

-   Creating Dockerfiles to run Python-based OPC UA GUI clients.
-   Running GUI apps inside containers accessible via browser.
-   Debugging QEMU issues inside desktop entries.
-   Handling special characters and line breaks in \`.desktop\` files.


## Emacs, Org-mode, Hugo, and Writing Automation {#emacs-org-mode-hugo-and-writing-automation}


### Org-Hugo Website Workflow {#org-hugo-website-workflow}

2025 was a year of heavy Emacs + Org + Hugo experimentation:

-   Managing my entire Hugo site from one Org file.
-   Using \`H1\` headings as folder metadata for Hugo.
-   Fixing image rendering issues and metadata in PaperMod/PaperModX.
-   Customizing CSS to use JetBrains Mono on my site.
-   Exporting pages correctly with empty \`:HUGO_SECTION:\` values.
-   Solving agenda requirements:
    -   weekly TODO view (only current week)
    -   birthday calendar showing only the current month
-   Improving my blog publisher to hide shell noise in Emacs.


### Package Experiments {#package-experiments}

I tried tools such as \`org-social\`, discovering:

-   missing sync functions
-   read-only relay buffers
-   no usable backend for my workflow (yet)


## Robotics and Programming {#robotics-and-programming}


### Robotics &amp; Rapid {#robotics-and-rapid}

I asked for example code in RAPID for ABB robots and explored how Python ties
into robotic automation workflows.


### Python GUI Development {#python-gui-development}

I worked with:

-   Textual TUI apps (Hanoi project)
-   pyqtgraph and PySide/Qt issues
-   Importing missing widgets like \`Slider\` in new Textual releases
-   Debugging graphical problems in GTK apps like Walker


### General Programming &amp; Troubleshooting {#general-programming-and-troubleshooting}

Other topics included:

-   Why \`opcua-client\` launches a terminal alongside the main UI.
-   Name resolution for OPC UA endpoints.
-   Cleaning and uninstalling Go-based binaries.
-   Improving CLI and GUI ergonomics across Linux desktops.


## Linux Desktop, Wayland, Hyprland &amp; UX Issues {#linux-desktop-wayland-hyprland-and-ux-issues}

I debugged and refined my desktop environments:

-   Conflicts between mako and xfce-notifyd across sessions.
-   Setting fonts correctly in browsers and mobile devices (Iosevka issues on iPhone).
-   Wayland quirks with Hyprland and application compatibility.
-   Zellij workspace design with automatic tab layouts.
-   Launching Emacs with \`emacsclient --nw -c -a ''\`.


## Creativity, Logos, UI &amp; Branding {#creativity-logos-ui-and-branding}

I explored design work too:

-   Creating formal industrial logos for a DieCasting maintenance group.
-   Iterating to make them more complex, technical, and professional.
-   Making my Textual TUI interface look more visually appealing.
-   Exploring color schemes (Gruvbox Dark Material as baseline).


## Communication, Writing &amp; Professional Emails {#communication-writing-and-professional-emails}

Throughout 2025, I also drafted multiple professional emails, including:

-   Requests for hydraulic upgrades for a 1992 machine.
-   Notes about obsolete components and modernization needs.
-   Technical communication in both English and Spanish.


## Conclusion {#conclusion}

2025 has been a year full of experimentation and growth:

-   ****Hydraulics + Industrial Automation****
-   ****Robotics + Programming****
-   ****Linux, NixOS, and DevOps****
-   ****Emacs, Org-mode, Hugo, and writing workflows****
-   ****Docker, OPC UA, networking****
-   ****Void Linux, Go, packaging, and compilation****
-   ****UI/UX, logos, and visual design****

Each question and challenge pushed me further as an engineer, developer, and
tinkerer. This year-long journey reflects exactly what I enjoy: learning,
building, and continuously improving the systems around me.
