+++
title = "Share Screen in Hyprland."
author = ["Javier Pacheco"]
description = "How to share screen in hyprland in apps like: telegram-desktop."
date = 2024-08-11T02:52:00-05:00
tags = ["linux", "wayland"]
draft = false
toc = true
+++

## The issue: {#the-issue}

We have a telegram group, in where we share emacs things and some other related to programming and linux in the most part of the time. So one day one of the members says that we can share screens and have a kind of podcast and talk about our environment configurations (sway/hyprland), so I was very curious about it so he invite me to another telegram group, this telegram group is for his YouTube channel, for test my hyprland configuration because he told me that he has troubles in his hyprland configuration using manjaro.

Now that I face the error, I realize that in my `home-manager` compilation I had this error since I was using this tool in `nixOS`, but because I never use it, I never let it importance, so now I realize that this thing need to be solved because I going to use it in the future.

So I installed `telegram-dektop`, and try to share my configuration and guess what; yes I was unable to share my screen. It failed and pop ups some errors.


## Things that I try before to solve the problem. {#things-that-i-try-before-to-solve-the-problem-dot}

My main distribution at the time (2024-07-28) is `nixOS`, so I think that this could be a missing declaration in some programs, like `xdg-dektop-portal-hyprland`, because of that I was researching issues in `nixOS` &amp; `hyprland`, but nothing solve the problem.

So nothing that I found fix the problem, most of the issues in github was too old, or nothing to do with `nixOS`, so the last thing that I could do was compile `xdg-desktop-portal-hyprland` by source, but in `nixOS` I would install some compilers and other things that I not currently use, but it was the last option.


## Solving the problem. {#solving-the-problem-dot}

So once in my job, with the mind more clean, I go to the hyprland [wiki](https://wiki.hyprland.org/Useful-Utilities/xdg-desktop-portal-hyprland/), and at the bottom there were some tips to debugging if some errors appears.

So I add this in my `Hyprland` configuration file:

```cfg
exec-once = dbus-update-activation-environment --systemd --all
```

That's it, that little command above solve my 1 day pain trying to share my screen. So I hope this little post be helpful for you if you encounter the same issue as me.

Thanks for read me.
