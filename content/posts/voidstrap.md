+++
title = "Voidstrap"
author = ["Javier Pacheco"]
description = "A void linux minimal installer."
date = 2025-01-14T21:17:00-06:00
tags = ["linux", "script"]
draft = false
toc = true
+++

## VoidStrap installer. {#voidstrap-installer-dot}

A basic minimalist installer of `void-linux` with some packages to get ready to enjoy
this amazing GNU/Linux distribution.


## Usage: {#usage}


### Running install.sh {#running-install-dot-sh}

Download the iso, and once in root inside the live, git clone this repo:
(You need to update inside the iso and install `git`)

If you want musl you can change the link to the mirror in the `install.sh` script:

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


## References: {#references}

-   [Voistrap github repository.](https://github.com/jpachecoxyz/voidstrap)
-   [Voidlinux Documentation.](https://docs.voidlinux.org/)
-   [Tuxliban guides.](https://git.disroot.org/tuxliban/tutoriales_void/src/branch/master/Gu%C3%ADas)
