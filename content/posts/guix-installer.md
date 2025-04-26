+++
title = "Guix installer"
description = "A guix linux installer."
date = 2025-01-15
tags = ["linux", "script"]
draft = false
toc = true
+++

## About. {#about-dot}

The script `install.sh` will do a couple of actions to try to make the GNU/guix installation more friendly, so, basically this `README.org` file will tangle the script, the power of emacs of course. So, while I was working in this "note" file, then I realized that I can use emacs and make a script.


## Download and burn the iso. {#download-and-burn-the-iso-dot}

I use the systemcrafter [ISO.](https://github.com/SystemCrafters/guix-installer)

```shell
sudo dd status=progress if=guix-installer-202106150234.iso of=/dev/sdb && sync
```


## Install the OS. {#install-the-os-dot}

Now with the Guix iso. Boot your laptop in it, and follow the instructions to install the OS, just ignore the warnings about the libre software, And stop in the part that you actually going to start the installation, and open another TTY:

```shell
Ctrl + Alt + f2
```


## The script itself "Automated": {#the-script-itself-automated}

```shell
set -e
set -o pipefail

log_error() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - ERROR: $1" >&2
    exit 1
}

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log "Starting cow-store service..." && herd start cow-store /mnt || log_error "Failed to start cow-store."
log "Copying channels.scm..." && cp /etc/channels.scm /mnt/etc && chmod +w /mnt/etc/channels.scm || log_error "Failed to copy or modify channels.scm."
log "Copying config.scm..." && cp /mnt/etc/config.scm ./config.scm || log_error "Failed to copy config.scm."
log "Adding nongnu modules and linux kernel to config.scm ..."
if ! grep -q '(use-modules (gnu) (nongnu packages linux))' ./config.scm; then
    sed -i 's/(use-modules (gnu))/(use-modules (gnu) (nongnu packages linux))/' ./config.scm || log_error "Failed to add (nongnu packages linux) to use-modules."
else
    log "Line '(use-modules (gnu) (nongnu packages linux))' already exists. Skipping."
fi

if ! grep -q '(kernel linux)' ./config.scm; then
    sed -i '/(operating-system/a\
  (kernel linux)\
  (firmware (list linux-firmware))' ./config.scm || log_error "Failed to add kernel and firmware configurations."
else
    log "Kernel and firmware configurations already exist. Skipping."
fi
log "Copying updated config.scm back to /mnt/etc..." && cp ./config.scm /mnt/etc/config.scm || log_error "Failed to copy updated config.scm back to /mnt/etc."
log "Initializing system with guix time-machine..." && guix time-machine -C /mnt/etc/channels.scm -- system init /mnt/etc/config.scm /mnt || log_error "System initialization failed."
log "Clean this folder..." && rm ./config.scm

log "Script completed successfully."
```


## References: {#references}

-   [SystemCrafters Complete guide.](https://systemcrafters.net/craft-your-system-with-guix/full-system-install/)
