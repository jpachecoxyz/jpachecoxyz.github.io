+++
title = "How I made my blog with emacs and hugo"
author = ["Javier Pacheco"]
description = "A overview of how I write and develop my web blog using emacs & hugo"
date = 2024-08-14T20:41:00-05:00
tags = ["emacs", "tecnology", "personal"]
draft = false
toc = true
+++

<div class="PREVIEW">

I have been using emacs most of the time for writting, and of course when I started to make my blog I have been use it (emacs) since of it. In the beginig when I start writing I was using some scripts and tips from [system crafters](https://systemcrafters.net/) he use htmlize and some _lisp_ scripting. It was ok but then I have been watching some [lukesmith](https://www.youtube.com/@LukeSmithxyz) videos and see this [video](https://www.youtube.com/watch?v=jAXKSKb3etk&pp=ygUOaHVnbyBsdWtlc21pdGg%3D) about him switching to `HUGO`, so I decided to check `HUGO` too.

</div>

<style>.org-center { margin-left: auto; margin-right: auto; text-align: center; }</style>

<div class="org-center">

{{< figure src="/posts/images/my-blog-in-emacs/overview.png" caption="<span class=\"figure-number\">Figure 1: </span>A overview of how my org file looks like." >}}

</div>


## What software and packages do I use?. {#what-software-and-packages-do-i-use-dot}

Yep! I use `emacs` 🤓 and `ox-hugo`.

And to build the static web I use [HUGO](https://gohugo.io/getting-started/quick-start/) and `git`.

```elisp
(use-package ox-hugo
  :ensure t
  :after ox)
```
<div class="src-block-caption">
  <span class="src-block-number">Code Snippet 1:</span>
  This is what I have in my emacs configuration.
</div>


## Org and its configuration. {#org-and-its-configuration-dot}

`HUGO` uses markdown to manage the sites, posts, etc. but because we where using emacs, (we don't like others than org syntax), so there are a lot of variables that `ox-hugo` handle in order to been exported to markdown syntax.

In my case I like to develop my whole blog into a single org-file

```elisp
#+begin_src org
#+TITLE: jpacheco.xyz
#+AUTHOR: Javier Pacheco
#+DESCRIPTION: My website posts & projects.
#+hugo_base_dir: ~/webdev/blog/
#+startup: content
#+hugo_custom_front_matter: toc true
#+hugo_auto_set_lastmod: t
#+date: 2024-07-04
#+seq_todo: TODO(t) WAIT(w@/!) | DONE(d!)
```
<div class="src-block-caption">
  <span class="src-block-number">Code Snippet 2:</span>
  My metadata in my org-file.
</div>

---

These are the most important and relevant to use within HUGO:

-   _#+HUGO_BASE_DIR:_

This declare where you HUGO site is located, basically in the path where you run `hugo new site my-site`.

-   _#+HUGO_CUSTOM_FRONT_MATTER_:

This is for enable/disable the toc of the posts when ox-hugo exported to md format.


## Writing the posts. {#writing-the-posts-dot}

Write a post is very easy to start, you only need to add a org lvl-1 header, and add a more metadata (properties). The sub-headers of the post are going to be org-lvl-3 headers, and so on.

```org
* TODO How I made my blog with emacs and hugo               :emacs:blog:hugo:
   :PROPERTIES:
   :EXPORT_FILE_NAME: my-blog-in-emacs
   :EXPORT_DESCRIPTION: A overview of how I write and develop my web blog using emacs & hugo
   :DATE:     08-14-2024
   :EXPORT_HUGO_SECTION: posts
   :END:
```
<div class="src-block-caption">
  <span class="src-block-number">Code Snippet 3:</span>
  Example of an article.
</div>

---

-   _:EXPORT_FILE_NAME_:

This is how your file is going to be stored, you may or not add the `.md` extension.

-   _:EXPORT_HUGO_SECTION_:

Here is the tricky part, if you have multiple sections like: post, projects, topics, etc. this is where the file is going to be stored.

If the sub-header starts with a TODO, when exported the md metadata is going to have `draftt: true`, which means even the archive is going to be created when you run hugo to create your site that md archive is going to be ignored until you finish (remove the TODO or change it to DONE.).

And that's it, you can search more options for manage the front matter in hugo in this [page.](https://ox-hugo.scripter.co/)

Thanks for reading.
