+++
title = "Dualboot in guix linux"
description = "How to dual boot in guix linux"
date = 2025-01-17
tags = ["linux", "blog"]
draft = false
toc = true
+++

## Dual Boot Configuration in Guix Linux {#dual-boot-configuration-in-guix-linux}

Setting up a dual-boot system in Guix Linux involves configuring the GRUB bootloader to recognize both Guix and your secondary operating system. Here's how you can configure the bootloader step-by-step.


### Default Bootloader Configuration {#default-bootloader-configuration}

The default bootloader configuration for Guix Linux is straightforward. Here's an example:

```scheme
(bootloader (bootloader-configuration
            (bootloader grub-efi-bootloader)
            (targets (list "/boot/efi"))
            (keyboard-layout keyboard-layout)))
```

-   **grub-efi-bootloader**: Specifies the GRUB bootloader in EFI mode.
-   **targets**: Points to the EFI System Partition (ESP), usually mounted at \`/boot/efi\`.
-   **keyboard-layout**: Configures the keyboard layout used in GRUB.


### Adding a GRUB Entry for Dual Boot {#adding-a-grub-entry-for-dual-boot}

To enable dual boot with Windows 11 (or another operating system), you need to add a custom entry to the GRUB configuration. Here’s how:

```scheme
(bootloader (bootloader-configuration
            (bootloader grub-efi-bootloader)
            (targets (list "/boot/efi"))
            (keyboard-layout keyboard-layout)
            ;; Add a menu entry for Windows 11
            (menu-entries
            (list
            (menu-entry
                (label "Windows 11")
                (device (uuid "65A0-06CA" 'fat32)) ; UUID of the boot partition
                (chain-loader "/EFI/Microsoft/Boot/bootmgfw.efi"))))))
```


#### Key Components {#key-components}

1.  menu-entries:
    -   Adds a custom menu entry for the GRUB boot menu.
2.  menu-entry:
    -   label: The name displayed in the GRUB menu (e.g., "Windows 11").
    -   device: Specifies the UUID of the boot partition where Windows is installed. Replace `"65A0-06CA"` with the UUID of your Windows EFI partition.
    -   chain-loader: Points to the Windows EFI bootloader (`bootmgfw.efi`), usually located in `/EFI/Microsoft/Boot/`.


### Finding the UUID of the Boot Partition {#finding-the-uuid-of-the-boot-partition}

To find the UUID of the Windows boot partition, run the following command:

```bash
lsblk -o NAME,FSTYPE,UUID,MOUNTPOINT
```

Locate the partition with the \`fat32\` filesystem type and note its UUID.


### Applying the Configuration {#applying-the-configuration}

After modifying your `config.scm`, reconfigure your system to apply the changes:

```bash
sudo guix system reconfigure /path/to/config.scm
```


### Testing the Dual Boot Setup {#testing-the-dual-boot-setup}

1.  Reboot your system.
2.  In the GRUB menu, you should see an entry labeled "Windows 11" alongside your Guix Linux entry.
3.  Select "Windows 11" to boot into Windows.


### Tips for Troubleshooting {#tips-for-troubleshooting}

-   If the Windows entry doesn’t appear, double-check the UUID of the boot partition.
-   Make sure your BIOS/UEFI settings allow booting in EFI mode.
-   Ensure the Windows EFI bootloader (`bootmgfw.efi`) exists in the specified path.

This setup ensures that both Guix Linux and Windows 11 are easily accessible via the GRUB menu, providing a seamless dual-boot experience. If you have any questions or run into issues, feel free to ask!
