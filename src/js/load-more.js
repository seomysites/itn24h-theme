$(function () {
    var loadMoreLink = $("#load-more-link");
    var loadUrl = loadMoreLink.data("load");

    if (loadUrl) {
        loadMoreLink.show();
    }

    function loadMoreData() {
        if (!loadUrl) return;

        if ($("#blog-pager .loading").is(':visible')) {
            console.log("loading...");
            return false;
        }

        loadMoreLink.hide();
        $("#blog-pager .loading").show();

        $.ajax({
            url: loadUrl,
            success: function (response) {
                var newContent = $(response).find(".grid-posts");
                newContent.find(".index-post").addClass("post-animated post-fadeInUp");

                $(".grid-posts").append(newContent.html());

                // Update next load URL
                loadUrl = $(response).find("#load-more-link").data("load");

                if (loadUrl) {
                    loadMoreLink.show();
                } else {
                    loadMoreLink.hide();
                    $("#blog-pager .no-more").addClass("show");
                }

                // Lazy load images
                $('.index-post .post-image-link .post-thumb').lazyyard();

                // Reapply sidebar behavior if necessary
                $("#main-wrapper").each(function () {
                    if (typeof fixedSidebar !== "undefined" && fixedSidebar) {
                        $(this).theiaStickySidebar();
                    }
                });
            },
            complete: function () {
                $("#blog-pager .loading").hide();
            }
        });
    }

    // Intersection Observer to detect scroll to #load-more-link
    var observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
            loadMoreData();
        }
    });

    if (loadMoreLink.length) {
        observer.observe(loadMoreLink[0]);
    }

    $("#load-more-link")["each"](function () {
        var a = $(this),
            b = a["data"]("load");
        if (b) $("#load-more-link")["show"]();

        $("#load-more-link")["on"]("click", function (a) {
            if ($("#blog-pager .loading").is(':visible')) {
                a["preventDefault"]();
                console.log("loading...");
                return false;
            }

            $("#load-more-link")["hide"]();
            $["ajax"]({
                url: b,
                success: function (a) {
                    var c = $(a)["find"](".grid-posts");
                    c["find"](".index-post")["addClass"]("post-animated post-fadeInUp");
                    $(".grid-posts")["append"](c["html"]());
                    b = $(a)["find"]("#load-more-link")["data"]("load");

                    if (b) {
                        $("#load-more-link")["show"]();
                    } else {
                        $("#load-more-link")["hide"]();
                        $("#blog-pager .no-more")["addClass"]("show");
                    }

                    $('.index-post .post-image-link .post-thumb').lazyyard();
                    $("#main-wrapper").each(function () {
                        if (true == fixedSidebar) $(this).theiaStickySidebar();
                    });
                },
                beforeSend: function () {
                    $("#blog-pager .loading")["show"]();
                },
                complete: function () {
                    $("#blog-pager .loading")["hide"]();
                }
            });
            a["preventDefault"]();
        });
    });

    // Lazy load iframes
    function lazyLoadIframes() {
        $("iframe[data-lazy-src], iframe[data-src]").each(function () {
            const $iframe = $(this);

            // Check if the iframe is in the viewport
            if ($iframe.offset().top < $(window).scrollTop() + $(window).height()) {
                // Prioritize `data-src`, fallback to `data-lazy-src`
                const src = $iframe.data("src") || $iframe.data("lazy-src");

                if (src) {
                    $iframe.attr("src", src);
                    $iframe.removeAttr("data-src data-lazy-src"); // Remove attributes to prevent re-loading
                }
            }
        });
    }

    if ("IntersectionObserver" in window) {
        let observer = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    let $iframe = $(entry.target);

                    // Prioritize `data-src` first, fallback to `data-lazy-src`
                    let src = $iframe.data("src") || $iframe.data("lazy-src");

                    if (src) {
                        $iframe.attr("src", src);
                        $iframe.removeAttr("data-src data-lazy-src"); // Remove attributes to prevent reloading
                    }

                    observer.unobserve(entry.target); // Stop observing once loaded
                }
            });
        });

        $("#post-body iframe[data-src]").each(function () {
            observer.observe(this);
        });
    } else {
        // Fallback to scroll method if Intersection Observer is not supported
        $(window).on("scroll resize", lazyLoadIframes);
        lazyLoadIframes();
    }
});
