+++
title = "Basics of HUGO"
description = "An introduction of hugo, create your own web site."
date = 2024-08-27
tags = ["hugo", "blog"]
draft = false
toc = true
+++

## Introduction {#introduction}

> "Hugo is one of the most popular open-source static site generators. With its amazing speed and flexibility, Hugo makes building websites fun again."


## Installation {#installation}

Hugo is multi platform, so the installation depends on what SO do you use, in this example I Show how to install in `Arch-linux` because it's easy.

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


## Working with Themes {#working-with-themes}

To install a theme is basically download it from `GitHub`, you can find more themes [here](https://themes.gohugo.io/themes).


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

**Keep in mind that if you clone the repository you must delete the `.git` folder inside the theme, because is going to have conflicts when you try to push your site.**

The next ones I never used, but you can go to the HUGO documentation for read more about these.

-   Expand Method 3 - Download an unzip
-   Hugo module


### Configuring the Theme &amp; see it in action. {#configuring-the-theme-and-see-it-in-action-dot}

Finally set theme as PaperMod in your site config, `hugo.toml` or `config.toml`

```toml
theme = "PaperMod"
```

Once you do this you can verify if the site applied the theme correctly by running the hugo server:

```shell
hugo server
```

Now, in your `browser`, open `localhost:1313`, and you should see your site with the proper theme applied.


## Configuration example for PaperMod theme. {#configuration-example-for-papermod-theme-dot}

This is a basic configuration template for PaperMod theme:

```toml
baseURL = 'https://example.org/'
languageCode = 'en-us'
title = 'My New Hugo Site'
theme = "PaperMod"

copyright = "[PaperMod Contributors](https://github.com/adityatelange/hugo-PaperMod/graphs/contributors)"
paginate = 5
enableInlineShortcodes = true
enableRobotsTXT = true
buildDrafts = false
buildFuture = false
buildExpired = false
enableEmoji = true
pygmentsUseClasses = true
mainsections = [ "posts", "papermod" ]

[minify]
disableXML = true

[languages.en]
languageName = "English"
weight = 1

  [languages.en.taxonomies]
  category = "categories"
  tag = "tags"
  series = "series"

[[languages.en.menu.main]]
name = "Archive"
url = "archives"
weight = 5

[[languages.en.menu.main]]
name = "Posts"
url = "posts/"
weight = 10

[outputs]
home = [ "HTML", "RSS", "JSON" ]

[params]
env = "production"
description = "Theme PaperMod - https://github.com/adityatelange/hugo-PaperMod"
author = "Theme PaperMod"
defaultTheme = "auto"
ShowShareButtons = true
ShowReadingTime = true
displayFullLangName = true
ShowPostNavLinks = true
ShowBreadCrumbs = true
ShowCodeCopyButtons = true
ShowRssButtonInSectionTermList = true
ShowAllPagesInArchive = true
ShowPageNums = true
ShowToc = true
images = [ "images/papermod-cover.png" ]

  [params.profileMode]
  enabled = false
  title = "PaperMod"
  imageUrl = "#"
  imageTitle = "my image"

    [[params.profileMode.buttons]]
    name = "Archives"
    url = "archives"

    [[params.profileMode.buttons]]
    name = "Tags"
    url = "tags"

  [params.homeInfoParams]
  Title = "PaperMod's Demo"
  Content = """
?? Welcome to demo page of Hugo's theme PaperMod!
- **PaperMod**  is designed to be clean and simple but fast and responsive theme with useful feature-set that enhances UX.
- Feel free to show your support by giving us a star ?? on GitHub and sharing with your friends and social media .
- PaperMod is based on theme [Paper](https://github.com/nanxiaobei/hugo-paper/tree/4330c8b12aa48bfdecbcad6ad66145f679a430b3).
"""

  [[params.socialIcons]]
  name = "github"
  title = "View Source on Github"
  url = "https://github.com/adityatelange/hugo-PaperMod"

  [[params.socialIcons]]
  name = "Discord"
  title = "Join discord community"
  url = "https://discord.gg/ahpmTvhVmp"

  [[params.socialIcons]]
  name = "X"
  title = "Share PaperMod on X/Twitter"
  url = "https://x.com/intent/tweet/?text=Checkout%20Hugo%20PaperMod%20%E2%9C%A8%0AA%20fast,%20clean,%20responsive%20Hugo%20theme.&url=https://github.com/adityatelange/hugo-PaperMod&hashtags=Hugo,PaperMod"

  [[params.socialIcons]]
  name = "KoFi"
  title = "Buy me a Ko-Fi :)"
  url = "https://ko-fi.com/adityatelange"

  [params.assets]
  disableHLJS = true

[markup.goldmark.renderer]
unsafe = true

[markup.highlight]
noClasses = false

[services.instagram]
disableInlineCSS = true

[services.twitter]
disableInlineCSS = true
```


## Building the Site {#building-the-site}


### Generating the Static Site {#generating-the-static-site}

At this point we need to generate the static we site, the most basic command to publish it is just run `hugo` in the terminal inside the root of the project.
So you notice that a `public` folder is now created, if you look inside, you'll find all the html files, and everything to deploy as a web page.


### Set specific folder to export your site. {#set-specific-folder-to-export-your-site-dot}

If you don't want to have your publish site in the `public` folder, you can set another path to export it instead of the `public` folder by adding this line at top of your `hugo.toml` configuration file:

```toml
publishDir = "/path/to/export/"
#example
publishDir = "~/my-site.org/"
```


## Conclusion {#conclusion}

With all the context before, you may be able to start your web site, blog, etc. As you read, is very simple to have a very nice and useful static web-page, the "hard" part is to select the theme.

The next step is to publish your web to a custom server or on github, gitlab, codeberg pages.

1.  Preparing for Deployment.
2.  Deploying to a Web Server or Hosting Service.


## Additional Resources {#additional-resources}

1.  [Hugo quick start guide.](https://gohugo.io/getting-started/quick-start/)
2.  [Hugo documentation.](https://gohugo.io/documentation/)
