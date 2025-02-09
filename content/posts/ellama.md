+++
title = "Ellama, a emacs AI helper."
author = ["Javier Pacheco"]
description = "A brief introduction to how to install ellama and ollama."
date = 2024-09-22T12:49:00-05:00
tags = ["tecnology", "wayland"]
draft = false
toc = true
+++

## Installation of Ollama. {#installation-of-ollama-dot}

In my case, I installed `ollama` from my package manager, although you can install it using the following code:

```shell
curl -fsSL https://ollama.com/install.sh | sh
```

Once `ollama` is installed, you should add it to your startup. In my case, I do it from the init of `hyprland`, but it will depend on whether you use `.xinitrc` or something else. It should be launched as follows:

```shell
ollama serve
```


## Installing a model. {#installing-a-model-dot}

To use Ollama, we need to download a model. A model is basically who you will be talking to when making a query. In the case of `ellama`, they suggest installing `zephyr` as the model, so we need to install it.

```shell
ollama pull zephyr
```


## Installing ellama. {#installing-ellama-dot}

Once `ollama & zephyr` are installed, we can proceed to install and configure `ellama` in Emacs.


## My ellama configuration. {#my-ellama-configuration-dot}

As you can see, it's not very complicated. The options for the `ellama` package are quite intuitive, like the language and keybindings. If you have any questions, feel free to comment, and we can follow up.

```emacs-lisp
(use-package ellama
  (setopt ellama-language "English")
  (setopt ellama-user-nick "jpacheco.xyz")
  (setopt ellama-keymap-prefix "C-c e")
  (require 'llm-ollama)
  (setopt ellama-provider
          (make-llm-ollama
           "zephyr"
           "zephyr")))
```
