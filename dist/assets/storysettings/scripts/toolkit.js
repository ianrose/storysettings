!function(t){function e(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return t[o].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e){"use strict";function n(t,e,n){var o;return function(){var i=this,a=arguments,s=function(){o=null,n||t.apply(i,a)},r=n&&!o;clearTimeout(o),o=setTimeout(s,e),r&&t.apply(i,a)}}$(document).ready(function(){function t(){var t=$(window).scrollTop();Math.abs(r-t)<=l||(t>r&&t>c?i.removeClass("is-down").addClass("is-up"):t+$(window).height()<$(document).height()&&i.removeClass("is-up").addClass("is-down"),r=t)}var e=$('[data-sset="article"]'),o=$('[data-sset="progress"]'),i=$('[data-sset="site-header"]'),a=-56;$("audio, video").bind("play",function(){var t=this;$("audio, video").each(function(){this!==t&&this.pause()})}),$(function(){$("a[href*=#]:not([href=#])").click(function(){if(location.pathname.replace(/^\//,"")===this.pathname.replace(/^\//,"")&&location.hostname===this.hostname){var t=$(this.hash);if(t=t.length?t:$("[name="+this.hash.slice(1)+"]"),t.length)return $("html,body").animate({scrollTop:t.offset().top+a},800),!1}})}),$('[data-sset="top"]').click(function(t){t.preventDefault(),$("html, body").animate({scrollTop:0},800)});var s,r=0,l=5,c=i.outerHeight();$(window).scroll(function(){s=!0}),setInterval(function(){s&&(t(),s=!1)},250);var d,u,h=function(){return e.height()-$(window).height()},f=h(),p=function(){return d=$(window).scrollTop(),u=d/f*100,u+="%"},m=function(){o.css({width:p()})},w=n(function(){f=h(),m()},13);m(),o.css({opacity:1}),$(document).on("scroll",w),$(window).on("resize",w),$('[data-sset="article-body"]').waypoint(function(){$(i).toggleClass("is-top"),$('[data-sset="site-title"]').toggleClass("is-hidden")},{offset:"27px"}),$("[data-animated]").waypoint(function(){$(this.element).toggleClass($(this.element).data("animated")),this.destroy()},{offset:"bottom-in-view"})})}]);