+++
title = "Recover windows boot"
description = "How to recover the windows boot partition files."
date = 2025-01-18
tags = ["blog", "windows"]
draft = false
toc = true
+++

This guide is suggested when you accidentally format the boot partition while installing a new OS, wiping out the Windows bootloader in the process. This has happened to me on more than one occasion, which is why I decided to document it.

It has also happened when the Windows bootloader is deleted. The following steps are solely for copying the Windows boot files using the ISO onto the partition without having to reformat it.


## Select the disk. {#select-the-disk-dot}

```cmd
list disk sel disk #
```


## Select the boot partition. {#select-the-boot-partition-dot}

List the partitions, select the FAT32 partition, and assign a letter to it.

```cmd
list vol sel vol # assign letter z:
```


## Load Windows boot files. {#load-windows-boot-files-dot}

```cmd
bcdboot c:\windows /s z: /f all
```

That's it! Simply restart, boot into the main OS, run `os-prober`, and execute `update-grub` to add the boot entry to `grub`.
