+++
title = "Basics of HUGO"
author = ["Javier Pacheco"]
description = "A basic introduction to HUGO."
date = 2024-07-04
draft = true
toc = true
+++

## Introduction {#introduction}

> "Hugo is one of the most popular open-source static site generators. With its amazing speed and flexibility, Hugo makes building websites fun again."


## Installation {#installation}

Hugo must be multi platform, so the installation depends on what SO do you use, in this example I Show how to install in `Arch-linux` because it's easy.

```shell
sudo pacman -S hugo
```


## Creating a New Site {#creating-a-new-site}


### Initialize a New Hugo Site {#initialize-a-new-hugo-site}

This is the command in order to create a hugo site,

```shell
hugo new site my-website.org
```

my-website.org
: is the name of the directory that hugo is going to create, and where all the files are going to be.


### Directory Structure Overview {#directory-structure-overview}

```text
$ tree -d my-website.org

my-website.org
├── archetypes
├── assets
├── content
├── data
├── i18n
├── layouts
├── static
└── themes
```


### Initialize an empty git repository. {#initialize-an-empty-git-repository-dot}

This is very useful because in case of mess, you can easily roll back.

```shell
git init
```


## Working with Themes {#working-with-themes}

To install a theme is basically download it from `GitHub`, you can find one of your like [here](https://themes.gohugo.io/themes).


### Downloading and Installing a Theme {#downloading-and-installing-a-theme}

In this guide we are going to use `PaperMod` theme, so we need to install it througt various ways.

-   As a submodule (recommended).

<!--listend-->

```shell
git submodule add --depth=1 https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
git submodule update --init --recursive # needed when you reclone your repo (submodules may not get cloned automatically)
```

-   Simply clone.

<!--listend-->

```shell
git clone https://github.com/adityatelange/hugo-PaperMod themes/PaperMod --depth=1
```

The next ones I never used, but you can go to the HUGO documentation for read more about these.

-   Expand Method 3 - Download an unzip
-   Hugo module


### Configuring the Theme {#configuring-the-theme}

Finally set theme as PaperMod in your site config, `hugo.toml` or `config.toml`

```toml
theme = PaperMod
```


## Creating Content {#creating-content}


### Creating a New Post {#creating-a-new-post}

This is the command to create post within HUGO:

```shell
hugo new content content/posts/my-first-post.md
```

Hugo creates a `my-first-post.md` in the `content/posts/` directory, open it with your editor, you must see this content in the file:

```markdown
+++
title = 'My First Post'
date = 2024-01-14T07:07:07+01:00
draft = true
+++
```
<div class="src-block-caption">
  <span class="src-block-number">Code Snippet 1:</span>
  test
</div>

Notice the draft value in the front matter is true. By default, Hugo does not publish draft content when you build the site. Learn more about draft, future, and expired content.

Add some Markdown to the body of the post, but do not change the draft value.

```markdown
+++
title = 'My First Post'
date = 2024-01-14T07:07:07+01:00
draft = true
+++
## Introduction

This is **bold** text, and this is *emphasized* text.

Visit the [Hugo](https://gohugo.io) website!
```


### Using Front Matter {#using-front-matter}


## Building the Site {#building-the-site}


### Generating the Static Site {#generating-the-static-site}


### Previewing the Site Locally {#previewing-the-site-locally}


## Deploying the Site {#deploying-the-site}


### Preparing for Deployment {#preparing-for-deployment}


### Deploying to a Web Server or Hosting Service {#deploying-to-a-web-server-or-hosting-service}


## Conclusion {#conclusion}


### Additional Resources {#additional-resources}


### Next Steps {#next-steps}
