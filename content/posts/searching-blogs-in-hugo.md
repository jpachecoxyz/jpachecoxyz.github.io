+++
title = "searching blogs in hugo"
description = "How to add a search utility for your blogs in hugo"
date = 2024-08-25
tags = ["hugo", "blog"]
draft = false
toc = true
+++

As websites grow, incorporating a search feature becomes increasingly crucial. However, implementing search functionality can be challenging on a statically generated site since there's no server-side component to handle the search. Instead, the search must be performed on the client side within the browser using JavaScript.

<style>.org-center { margin-left: auto; margin-right: auto; text-align: center; }</style>

<div class="org-center">

{{< figure src="/images/posts/hugo-search/jpacheco-search.png" caption="<span class=\"figure-number\">Figure 1: </span>This is how my web looks." >}}

</div>

Fortunately, there are existing solutions to address this issue. Below, we demonstrate one such solution that utilizes FuseJS and MarkJS. This implementation is inspired by a gist from eddiewebb, but it's built using plain JavaScript rather than jQuery.


## Page - content/search/_index.md {#page-content-search-index-dot-md}

Create a page to serve as the search form and display search results. In the markdown, set the layout to ‘search’ and proceed to create this layout (in the next step) to easily manage the HTML.

```markdown
---
title: "Search"
sitemap:
  priority : 0.1
layout: "search"
---
```


## Layout - layout/_default/search.html {#layout-layout-default-search-dot-html}

This search page contains a &lt;div&gt; element for displaying search results (#search-results) and another &lt;div&gt; element for showing a loading message (.search-loading). The layout also defines a template that will later be used in the JavaScript to render a single search result. Finally, it loads the necessary JS libraries (from a CDN in this example, though self-hosting is an option).

```html
{{ define "main" }}

<main>
    <form action="/search" method="GET">
        <input type="search" name="q" id="search-query" placeholder="Search...." autofocus>
        <!-- <button type="submit">Search</button> -->
    </form>
    <div id="search-results"></div>
    <div class="search-loading">Loading...</div>

    <script id="search-result-template" type="text/x-js-template">
    <div id="summary-${key}">
        <h3><a href="${link}">${title}</a></h3>
        <p>${snippet}</p>
        <p>
            <small>
                ${ isset tags }Tags: ${tags}<br>${ end }
            </small>
        </p>
    </div>
    </script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/fuse.js/6.6.2/fuse.min.js" integrity="sha512-Nqw1tH3mpavka9cQCc5zWWEZNfIPdOYyQFjlV1NvflEtQ0/XI6ZQ+H/D3YgJdqSUJlMLAPRj/oXlaHCFbFCjoQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/mark.js/8.11.1/mark.min.js" integrity="sha512-5CYOlHXGh6QpOFA/TeTylKLWfB3ftPsde7AnmhuitiTX4K5SqCLBeKro6sPS8ilsz1Q4NRx3v8Ko2IBiszzdww==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</main>

{{ end }}
```


## JS {#js}

The main part of the code is JavaScript, where everything is tied together. The URL parameters are read to obtain the query, which is then passed to FuseJS and MarkJS, and the results are written back to the page.

```javascript
var summaryInclude = 180;
var fuseOptions = {
    shouldSort: true,
    includeMatches: true,
    includeScore: true,
    tokenize: true,
    location: 0,
    distance: 100,
    minMatchCharLength: 1,
    keys: [
        {name: "title", weight: 0.45},
        {name: "contents", weight: 0.4},
        {name: "tags", weight: 0.1},
        {name: "categories", weight: 0.05}
    ]
};

// =============================
// Search
// =============================

var inputBox = document.getElementById('search-query');
if (inputBox !== null) {
    var searchQuery = param("q");
    if (searchQuery) {
        inputBox.value = searchQuery || "";
        executeSearch(searchQuery, false);
    } else {
        document.getElementById('search-results').innerHTML = '<p class="search-results-empty">Please enter a word or phrase above, or see <a href="/tags/">all tags</a>.</p>';
    }
}

function executeSearch(searchQuery) {

    show(document.querySelector('.search-loading'));

    fetch('/index.json').then(function (response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
            return;
        }
        // Examine the text in the response
        response.json().then(function (pages) {
            var fuse = new Fuse(pages, fuseOptions);
            var result = fuse.search(searchQuery);
            if (result.length > 0) {
                populateResults(result);
            } else {
                document.getElementById('search-results').innerHTML = '<p class=\"search-results-empty\">No matches found</p>';
            }
            hide(document.querySelector('.search-loading'));
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
    });
}

function populateResults(results) {

    var searchQuery = document.getElementById("search-query").value;
    var searchResults = document.getElementById("search-results");

    // pull template from hugo template definition
    var templateDefinition = document.getElementById("search-result-template").innerHTML;

    results.forEach(function (value, key) {

        var contents = value.item.contents;
        var snippet = "";
        var snippetHighlights = [];

        snippetHighlights.push(searchQuery);
        snippet = contents.substring(0, summaryInclude * 2) + '&hellip;';

        //replace values
        var tags = ""
        if (value.item.tags) {
            value.item.tags.forEach(function (element) {
                tags = tags + "<a href='/tags/" + element + "'>" + "#" + element + "</a> "
            });
        }

        var output = render(templateDefinition, {
            key: key,
            title: value.item.title,
            link: value.item.permalink,
            tags: tags,
            categories: value.item.categories,
            snippet: snippet
        });
        searchResults.innerHTML += output;

        snippetHighlights.forEach(function (snipvalue, snipkey) {
            var instance = new Mark(document.getElementById('summary-' + key));
            instance.mark(snipvalue);
        });

    });
}

function render(templateString, data) {
    var conditionalMatches, conditionalPattern, copy;
    conditionalPattern = /\$\{\s*isset ([a-zA-Z]*) \s*\}(.*)\$\{\s*end\s*}/g;
    //since loop below depends on re.lastInxdex, we use a copy to capture any manipulations whilst inside the loop
    copy = templateString;
    while ((conditionalMatches = conditionalPattern.exec(templateString)) !== null) {
        if (data[conditionalMatches[1]]) {
            //valid key, remove conditionals, leave contents.
            copy = copy.replace(conditionalMatches[0], conditionalMatches[2]);
        } else {
            //not valid, remove entire section
            copy = copy.replace(conditionalMatches[0], '');
        }
    }
    templateString = copy;
    //now any conditionals removed we can do simple substitution
    var key, find, re;
    for (key in data) {
        find = '\\$\\{\\s*' + key + '\\s*\\}';
        re = new RegExp(find, 'g');
        templateString = templateString.replace(re, data[key]);
    }
    return templateString;
}

// Helper Functions
function show(elem) {
    elem.style.display = 'block';
}
function hide(elem) {
    elem.style.display = 'none';
}
function param(name) {
    return decodeURIComponent((location.search.split(name + '=')[1] || '').split('&')[0]).replace(/\+/g, ' ');
}

// Keybinds functions
document.addEventListener('keydown', function(event) {
    // Check if the Windows key (or Command key on macOS) and forward slash are pressed
    if (event.metaKey && event.key === '/') {
        // Prevent the default action if necessary
        event.preventDefault();

        // Navigate to the search page
        window.location.href = '/search';

        // Wait for the page to load and then focus on the search input
        window.addEventListener('load', function() {
            const searchInput = document.getElementById('search-query');
            if (searchInput) {
                searchInput.focus();
            }
        });
    }
});
```


## The Data - layouts/_default/index.json {#the-data-layouts-default-index-dot-json}

All the work we’ve done up until now has been front-end workings, but we also need to build an index.json file which will act as our data source (which is fetched from the JS).

```json
{{- $.Scratch.Add "index" slice -}}
{{- range .Site.RegularPages -}}
    {{- $.Scratch.Add "index" (dict "title" .Title "tags" .Params.tags "categories" .Params.categories "contents" .Plain "permalink" .Permalink) -}}
{{- end -}}
{{- $.Scratch.Get "index" | jsonify -}}
```


## Conclusion {#conclusion}

You can extend this further by offering a live search preview, adding more filters, or allowing sorting options. This method provides a powerful and flexible way to implement search functionality on a static site without relying on any backend services.
