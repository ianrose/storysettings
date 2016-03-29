/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* Toolkit JavaScript
	*/

	// Returns a function, that, as long as it continues to be invoked, will not
	// be triggered. The function will be called after it stops being called for
	// N milliseconds. If `immediate` is passed, trigger the function on the
	// leading edge, instead of the trailing.
	'use strict';

	var photoswipe = __webpack_require__(2);

	function debounce(func, wait, immediate) {
	  'use strict';

	  var timeout;
	  return function () {
	    var context = this,
	        args = arguments;
	    var later = function later() {
	      timeout = null;
	      if (!immediate) {
	        func.apply(context, args);
	      }
	    };
	    var callNow = immediate && !timeout;
	    clearTimeout(timeout);
	    timeout = setTimeout(later, wait);
	    if (callNow) {
	      func.apply(context, args);
	    }
	  };
	}

	$(document).ready(function () {
	  'use strict';

	  var $article = $('[data-sset="article"]');
	  var $progress = $('[data-sset="progress"]');
	  var $siteHeader = $('[data-sset="site-header"]');
	  var scrollToOffset = -56;

	  // Pauses other video/audio
	  $('audio, video').bind('play', function () {
	    var activated = this;

	    $('audio, video').each(function () {
	      if (this !== activated) {
	        this.pause();
	      }
	    });
	  });

	  // Animate Anchor Links
	  $(function () {
	    $('a[href*=#]:not([href=#])').click(function () {
	      if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
	        var target = $(this.hash);
	        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	        if (target.length) {
	          $('html,body').animate({
	            scrollTop: target.offset().top + scrollToOffset
	          }, 800);
	          return false;
	        }
	      }
	    });
	  });

	  // Scroll to Top
	  $('[data-sset="top"]').click(function (e) {
	    e.preventDefault();
	    $('html, body').animate({ scrollTop: 0 }, 800);
	  });

	  // Hide Header
	  var didScroll;
	  var lastScrollTop = 0;
	  var delta = 5;
	  var headerHeight = $siteHeader.outerHeight();

	  $(window).scroll(function () {
	    didScroll = true;
	  });

	  function hasScrolled() {
	    var start = $(window).scrollTop();

	    if (Math.abs(lastScrollTop - start) <= delta) {
	      return;
	    }

	    if (start > lastScrollTop && start > headerHeight) {
	      $siteHeader.removeClass('is-down').addClass('is-up');
	    } else {
	      if (start + $(window).height() < $(document).height()) {
	        $siteHeader.removeClass('is-up').addClass('is-down');
	      }
	    }
	    lastScrollTop = start;
	  }

	  setInterval(function () {
	    if (didScroll) {
	      hasScrolled();
	      didScroll = false;
	    }
	  }, 250);

	  // Progress
	  var getMax = function getMax() {
	    return $article.height() - $(window).height();
	  };

	  var max = getMax();
	  var value;
	  var width;

	  var getWidth = function getWidth() {
	    value = $(window).scrollTop();
	    width = value / max * 100;
	    width = width + '%';
	    return width;
	  };

	  var setWidth = function setWidth() {
	    $progress.css({ width: getWidth() });
	  };

	  var progressDebounced = debounce(function () {
	    max = getMax();
	    setWidth();
	  }, 13);

	  setWidth();
	  $progress.css({ opacity: 1 });

	  $(document).on('scroll', progressDebounced);
	  $(window).on('resize', progressDebounced);

	  // Waypoints

	  // Changes header styles when over main art vs article body
	  $('[data-sset="article-body"]').waypoint(function () {
	    $($siteHeader).toggleClass('is-top');
	    $('[data-sset="site-title"]').toggleClass('is-hidden');
	  }, {
	    offset: '27px'
	  });

	  // Fades in from the left hanging elements as they enter viewport
	  $('[data-animated]').waypoint(function () {
	    $(this.element).toggleClass($(this.element).data('animated'));
	    this.destroy();
	  }, {
	    offset: 'bottom-in-view'
	  });

	  photoswipe.init();
	});

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    init: function init() {

	        var initPhotoSwipeFromDOM = function initPhotoSwipeFromDOM(gallerySelector) {

	            // parse slide data (url, title, size ...) from DOM elements
	            // (children of gallerySelector)
	            var parseThumbnailElements = function parseThumbnailElements(el) {
	                var thumbElements = el.childNodes,
	                    numNodes = thumbElements.length,
	                    items = [],
	                    figureEl,
	                    linkEl,
	                    size,
	                    item;

	                for (var i = 0; i < numNodes; i++) {

	                    figureEl = thumbElements[i]; // <figure> element

	                    // include only element nodes
	                    if (figureEl.nodeType !== 1) {
	                        continue;
	                    }

	                    linkEl = figureEl.children[0]; // <a> element

	                    size = linkEl.getAttribute('data-size');
	                    size = size && size.split('x');

	                    // create slide object
	                    item = {
	                        src: linkEl.getAttribute('href'),
	                        w: size && parseInt(size[0], 10),
	                        h: size && parseInt(size[1], 10)
	                    };

	                    if (figureEl.children.length > 1) {
	                        // <figcaption> content
	                        item.title = figureEl.children[1].innerHTML;
	                    }

	                    if (linkEl.children.length > 0) {
	                        // <img> thumbnail element, retrieving thumbnail url
	                        item.msrc = linkEl.children[0].getAttribute('src');
	                    }

	                    item.el = figureEl; // save link to element for getThumbBoundsFn
	                    items.push(item);
	                }

	                return items;
	            };

	            // find nearest parent element
	            var closest = function closest(_x, _x2) {
	                var _left;

	                var _again = true;

	                _function: while (_again) {
	                    var el = _x,
	                        fn = _x2;
	                    _again = false;

	                    if (!(_left = el)) {
	                        return _left;
	                    }

	                    if (fn(el)) {
	                        return el;
	                    } else {
	                        _x = el.parentNode;
	                        _x2 = fn;
	                        _again = true;
	                        continue _function;
	                    }
	                }
	            };

	            // triggers when user clicks on thumbnail
	            var onThumbnailsClick = function onThumbnailsClick(e) {
	                e = e || window.event;
	                e.preventDefault ? e.preventDefault() : e.returnValue = false;

	                var eTarget = e.target || e.srcElement;

	                // find root element of slide
	                var clickedListItem = closest(eTarget, function (el) {
	                    return el.tagName && el.tagName.toUpperCase() === 'FIGURE';
	                });

	                if (!clickedListItem) {
	                    return;
	                }

	                // find index of clicked item by looping through all child nodes
	                // alternatively, you may define index via data- attribute
	                var clickedGallery = clickedListItem.parentNode,
	                    childNodes = clickedListItem.parentNode.childNodes,
	                    numChildNodes = childNodes.length,
	                    nodeIndex = 0,
	                    index;

	                for (var i = 0; i < numChildNodes; i++) {
	                    if (childNodes[i].nodeType !== 1) {
	                        continue;
	                    }

	                    if (childNodes[i] === clickedListItem) {
	                        index = nodeIndex;
	                        break;
	                    }
	                    nodeIndex++;
	                }

	                if (index >= 0) {
	                    // open PhotoSwipe if valid index found
	                    openPhotoSwipe(index, clickedGallery);
	                }
	                return false;
	            };

	            // parse picture index and gallery index from URL (#&pid=1&gid=2)
	            var photoswipeParseHash = function photoswipeParseHash() {
	                var hash = window.location.hash.substring(1),
	                    params = {};

	                if (hash.length < 5) {
	                    return params;
	                }

	                var vars = hash.split('&');
	                for (var i = 0; i < vars.length; i++) {
	                    if (!vars[i]) {
	                        continue;
	                    }
	                    var pair = vars[i].split('=');
	                    if (pair.length < 2) {
	                        continue;
	                    }
	                    params[pair[0]] = pair[1];
	                }

	                if (params.gid) {
	                    params.gid = parseInt(params.gid, 10);
	                }

	                return params;
	            };

	            var openPhotoSwipe = function openPhotoSwipe(index, galleryElement, disableAnimation, fromURL) {
	                var pswpElement = document.querySelectorAll('.pswp')[0],
	                    gallery,
	                    options,
	                    items;

	                items = parseThumbnailElements(galleryElement);

	                // define options (if needed)
	                options = {

	                    // define gallery index (for URL)
	                    galleryUID: galleryElement.getAttribute('data-pswp-uid'),

	                    getThumbBoundsFn: function getThumbBoundsFn(index) {
	                        // See Options -> getThumbBoundsFn section of documentation for more info
	                        var thumbnail = items[index].el.getElementsByTagName('img')[0],
	                            // find thumbnail
	                        pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
	                            rect = thumbnail.getBoundingClientRect();

	                        return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
	                    }

	                };

	                // PhotoSwipe opened from URL
	                if (fromURL) {
	                    if (options.galleryPIDs) {
	                        // parse real index when custom PIDs are used
	                        // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
	                        for (var j = 0; j < items.length; j++) {
	                            if (items[j].pid === index) {
	                                options.index = j;
	                                break;
	                            }
	                        }
	                    } else {
	                        // in URL indexes start from 1
	                        options.index = parseInt(index, 10) - 1;
	                    }
	                } else {
	                    options.index = parseInt(index, 10);
	                }

	                // exit if index not found
	                if (isNaN(options.index)) {
	                    return;
	                }

	                if (disableAnimation) {
	                    options.showAnimationDuration = 0;
	                }

	                // Pass data to PhotoSwipe and initialize it
	                gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);

	                gallery.listen('imageLoadComplete', function (index, item) {
	                    var linkEl = item.el.children[0];
	                    var img = item.container.children[0];
	                    if (!linkEl.getAttribute('data-size')) {
	                        linkEl.setAttribute('data-size', img.naturalWidth + 'x' + img.naturalHeight);
	                        item.w = img.naturalWidth;
	                        item.h = img.naturalHeight;
	                        gallery.invalidateCurrItems();
	                        gallery.updateSize(true);
	                    }
	                });

	                gallery.init();
	            };

	            // loop through all gallery elements and bind events
	            var galleryElements = document.querySelectorAll(gallerySelector);

	            for (var i = 0, l = galleryElements.length; i < l; i++) {
	                galleryElements[i].setAttribute('data-pswp-uid', i + 1);
	                galleryElements[i].onclick = onThumbnailsClick;
	            }

	            // Parse URL and open gallery if it contains #&pid=3&gid=1
	            var hashData = photoswipeParseHash();
	            if (hashData.pid && hashData.gid) {
	                openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
	            }
	        };

	        // execute above function
	        initPhotoSwipeFromDOM('[data-sset="gallery"]');
	    }
	};

/***/ }
/******/ ]);