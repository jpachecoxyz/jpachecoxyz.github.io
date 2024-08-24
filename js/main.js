/**
 * Sets up Justified Gallery.
 */
if (!!$.prototype.justifiedGallery) {
  var options = {
    rowHeight: 140,
    margins: 4,
    lastRow: "justify"
  };
  $(".article-gallery").justifiedGallery(options);
}

$(document).ready(function() {

  /**
   * Shows the responsive navigation menu on mobile.
   */
  $("#header > #nav > ul > .icon").click(function() {
    $("#header > #nav > ul").toggleClass("responsive");
  });


  /**
   * Controls the different versions of  the menu in blog post articles 
   * for Desktop, tablet and mobile.
   */
  if ($(".post").length) {
    var menu = $("#menu");
    var nav = $("#menu > #nav");
    var menuIcon = $("#menu-icon, #menu-icon-tablet");

    /**
     * Display the menu on hi-res laptops and desktops.
     */
    if ($(document).width() >= 1440) {
      menu.css("visibility", "visible");
      menuIcon.addClass("active");
    }

    /**
     * Display the menu if the menu icon is clicked.
     */
    menuIcon.click(function() {
      if (menu.css("visibility") === "hidden") {
        menu.css("visibility", "visible");
        menuIcon.addClass("active");
      } else {
        menu.css("visibility", "hidden");
        menuIcon.removeClass("active");
      }
      return false;
    });

    /**
     * Add a scroll listener to the menu to hide/show the navigation links.
     */
    if (menu.length) {
      $(window).on("scroll", function() {
        var topDistance = menu.offset().top;

        // hide only the navigation links on desktop
        if (!nav.is(":visible") && topDistance < 50) {
          nav.show();
        } else if (nav.is(":visible") && topDistance > 100) {
          nav.hide();
        }

        // on tablet, hide the navigation icon as well and show a "scroll to top
        // icon" instead
        if ( ! $( "#menu-icon" ).is(":visible") && topDistance < 50 ) {
          $("#menu-icon-tablet").show();
          $("#top-icon-tablet").hide();
        } else if (! $( "#menu-icon" ).is(":visible") && topDistance > 100) {
          $("#menu-icon-tablet").hide();
          $("#top-icon-tablet").show();
        }
      });
    }

    /**
     * Show mobile navigation menu after scrolling upwards,
     * hide it again after scrolling downwards.
     */
    if ($( "#footer-post").length) {
      var lastScrollTop = 0;
      $(window).on("scroll", function() {
        var topDistance = $(window).scrollTop();

        if (topDistance > lastScrollTop){
          // downscroll -> show menu
          $("#footer-post").hide();
        } else {
          // upscroll -> hide menu
          $("#footer-post").show();
        }
        lastScrollTop = topDistance;

        // close all submenu"s on scroll
        $("#nav-footer").hide();
        $("#toc-footer").hide();
        $("#share-footer").hide();

        // show a "navigation" icon when close to the top of the page, 
        // otherwise show a "scroll to the top" icon
        if (topDistance < 50) {
          $("#actions-footer > #top").hide();
        } else if (topDistance > 100) {
          $("#actions-footer > #top").show();
        }
      });
    }
  }
});

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
