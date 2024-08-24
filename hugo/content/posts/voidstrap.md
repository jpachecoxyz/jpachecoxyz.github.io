+++
title = "Void linux bootstrap."
author = ["Javier Pacheco"]
description = "A void linux semi-automated installer."
date = 2024-07-04
tags = ["linux", "tecnology", "script"]
draft = false
toc = true
+++

<div class="PREVIEW">

This is the first post of the 2024, this is a project that I am working on in the last
year, is a minimialist voidlinux instalator it is based in some recomendations in
a guides that some friends of my have but "semiautomated".

</div>


## VoidStrap installer. {#voidstrap-installer-dot}

A basic minimalist installer of `void-linux` with some packages to get ready to enjoy
this amazing GNU/Linux distribution.


## Usage: {#usage}


### Running install.sh {#running-install-dot-sh}

Download the iso, and once in root inside the live, git clone this repo:
(You need to update inside the iso and install `git`)

NOTE: there are 3 `branches:`

main
: This will install `void-musl`.

glibc
: This will install `void-glibc`.

dual
: This will install `void-glibc` dual boot with `Windows`.
    -   **This branch is tested only with `Windows`, I never try it with other distributions.**
    -   If you want musl you can change the link to the mirror in the `install.sh` script:

<!--listend-->

```text
- Change this in line 11:
export XBPS_ARCH=x86_64 && xbps-install -Suy -R http://mirrors.servercentral.com/voidlinux/current -r /mnt \
- For this:
export XBPS_ARCH=x86_64-musl && xbps-install -Suy -R http://mirrors.servercentral.com/voidlinux/current/musl -r /mnt \
```

```shell
git clone https://git.disroot.org/jpacheco/voidstrap
cd voidstrap
sh install.sh
```

Once there the script will open `cfdisk`, and you need to format the HDD in this
specific format:

```text
- /dev/sdX1 -> as the boot partition.
- /dev/sdY2 -> as the swap partition.
- /dev/sdZ3 -> as the root partition.
```

NOTE: Replace X,Y &amp; Z for your partition name.
I consider to have this structure of partition, but you can change it, but you must
change the code in `postinstall.sh` when the scripts make the `fstab` archive.

**Make sure you do a backup of your files before doing crazy things and trust anyone script**

When the `install.sh` script finish, you need to run the postinstall script located in `/root folder:`


### Running postinstall.sh {#running-postinstall-dot-sh}

This script its going to create some configuration files, like: `fstab`, `rc.conf`,
change the password of `root`, and add user(s).

```shell
xchroot /mnt
```

Then run the `chroot.sh` script.

```shell
sh /root/postinstall.sh
```

When the `postinsall.sh` script finishes, you only need to reboot and enjoy your
**Void-Linux** distribution.

When it finish you need to run the `postinstall.sh` script, that is going to install
the **X server** and some other "necessary" packages.


## The custom.sh script {#the-custom-dot-sh-script}

This is going to install my personal dotfiles, and a specific packages that I use:

```shell
sh /root/custom.sh
```

But you can specify your dotfiles repositories and others that you require whit some parameters:

```nil
sh custom.sh -r https://codeberg.org/jpacheco/dotfiles # specify a repo url.
sh custom.sh -p otherprogfile.csv # especify a custom package archive to install.
sh custom.sh -b dev # especify the name of a custom branch in case of needed.
```


## References: {#references}

-   [Voidstrap.](https://codeberg.org/jpacheco/voidstrap)
-   [Voidlinux Documentation.](https://docs.voidlinux.org/)
-   [Tuxliban guides.](https://git.disroot.org/tuxliban/tutoriales_void/src/branch/master/Gu%C3%ADas)
