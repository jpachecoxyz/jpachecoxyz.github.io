+++
title = "Screen Record"
author = ["Javier Pacheco"]
description = "Script to record in hyprland"
date = 2024-03-15T04:14:00-05:00
tags = ["linux", "script"]
draft = false
toc = true
+++

This script record the screen with the `wf-recorder` tool, it can be the hole screen or a specific area of it.
The script is going to store the video in `/tmp/screencast.mp4`, this script only store one video, personally I think that have more than one record is a mess, more if you only wants to share a quick screencast to _telegram, irc, cinny_ or even to share it through `0x0.st`.


## Description and main variables: {#description-and-main-variables}

```bash
# Created By: Javier Pacheco - javier@jpacheco.xyz
# Created On: 29/03/24
# Project: Screen recorder in wayland
# Dependencies: wf-recorder wl-copy and a launcher like dmenu, fuzzel, etc.

SOUND_CARD=$(pactl list sources | awk '/Name/ && /.monitor/ {print $2}')
```


## Recording functions: {#recording-functions}

Those functions have enable the sound recording, so if you have some music, video, etc running it will record the sound but not the mic.


### screencast: {#screencast}

This option is going to record a specific area of the screen.
This area is going to be specified by `slurp`.

```bash
screencast() {
   wf-recorder --audio=$SOUND_CARD -f /tmp/screencast.mp4
}
```


### area: {#area}

This option is going to record a specific area of the screen.
This area is going to be specified by `slurp`.

```bash
area() {
   wf-recorder --audio=$SOUND_CARD -g "$(slurp)" -f /tmp/screencast.mp4
}
```


## Main functions: {#main-functions}

These functions are tools that ensures this script works correctly. For example if all ready have a existing file recorded, it will removed to record a new one, because this script only will create one video always, and also have a function to kill the process when it finished.


### check internet connection: {#check-internet-connection}

```bash
check_connection() {
    ping -c 1 google.com 1> /dev/null 2>&1
}
```


### share: {#share}

This option is going to upload the video to `0x0.st` and copy the url to the clipboard using `wc-copy`.

```bash
share() {
   notify-send "uploading.." "video is upoading to 0x0.st"
   curl -F "file=@/tmp/screencast.mp4" https://0x0.st | wl-copy && notify-send "Video stored in 0x0.st"
}
```


### Kill existing process: {#kill-existing-process}

```bash
kill_proc(){
    pkill --signal SIGINT wf-recorder
    if [ $? -eq 0 ];
    then
        notify-send "Video stored" "Video was stored in /tmp/screencast.mp4"
        pkill --signal SIGINT wf-recorder
        exit 0
    fi
}
```


### Remove existing video: {#remove-existing-video}

```bash
remove_vid() {
    [ -f /tmp/screencast.mp4 ] && rm /tmp/screencast.mp4
}
```


## Sequence: {#sequence}

This is were the scripts actually starts, first of all look if the script is already running, if not then ask for a recording option:

```bash
kill_proc

OPT=$(printf "screencast\narea\nshare\nquit" | fuzzel --dmenu -p 'Select an option: ' )
case $OPT in
    'screencast')
        sleep 1
        remove_vid
        sleep 1
        screencast;;
    'area')
        sleep 1
        remove_vid
        sleep 1
        area;;
    'share')
        check_connection && share || notify-send "Error" "check your internet connection" ;;
    *|quit) exit 0;;
esac
```


## The whole code. {#the-whole-code-dot}

```bash
# Created By: Javier Pacheco - javier@jpacheco.xyz
# Created On: 29/03/24
# Project: Screen recorder in wayland
# Dependencies: wf-recorder wl-copy and a launcher like dmenu, fuzzel, etc.

SOUND_CARD=$(pactl list sources | awk '/Name/ && /.monitor/ {print $2}')

screencast() {
   wf-recorder --audio=$SOUND_CARD -f /tmp/screencast.mp4
}

area() {
   wf-recorder --audio=$SOUND_CARD -g "$(slurp)" -f /tmp/screencast.mp4
}

check_connection() {
    ping -c 1 google.com 1> /dev/null 2>&1
}

share() {
   notify-send "uploading.." "video is upoading to 0x0.st"
   curl -F "file=@/tmp/screencast.mp4" https://0x0.st | wl-copy && notify-send "Video stored in 0x0.st"
}

kill_proc(){
    pkill --signal SIGINT wf-recorder
    if [ $? -eq 0 ];
    then
        notify-send "Video stored" "Video was stored in /tmp/screencast.mp4"
        pkill --signal SIGINT wf-recorder
        exit 0
    fi
}

remove_vid() {
    [ -f /tmp/screencast.mp4 ] && rm /tmp/screencast.mp4
}

kill_proc

OPT=$(printf "screencast\narea\nshare\nquit" | fuzzel --dmenu -p 'Select an option: ' )
case $OPT in
    'screencast')
        sleep 1
        remove_vid
        sleep 1
        screencast;;
    'area')
        sleep 1
        remove_vid
        sleep 1
        area;;
    'share')
        check_connection && share || notify-send "Error" "check your internet connection" ;;
    *|quit) exit 0;;
esac
```
