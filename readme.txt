=== GSAP Conditional Loader (All-Plugin Edition) ===
Contributors: robfromerd
Tags: gsap, animation, scrolltrigger, wordpress, conditional loading
Stable tag: 1.2.2
Requires at least: 6.0
Tested up to: 6.5
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Loads GSAP core + any GSAP plugins you list, but only on content in the “animated” category.

== Description ==

GSAP is a high-performance animation library with many optional plugins (e.g. ScrollTrigger, SplitText, DrawSVG). You can now load GSAP core and whichever plugins you specify — but only on posts or pages in the “animated” category. This saves weight on other pages and prevents unnecessary JS execution.

== Installation ==

1. Upload the plugin folder to your `/wp-content/plugins/` directory.
2. Activate the plugin through the Plugins menu in WordPress.
3. Ensure the **animated** category exists and assign it to any post **or page** that needs GSAP.

Then visit any content marked with that category in the front end. You should see GSAP + those plugins load.

== To Use ==

Add the “animated” category to any post/page and visit the front end.

== Changelog ==

= 1.2.2 =
* Ensured WordPress.org coding standards compliance.
* Added full plugin headers and documentation alignment.

= 1.2.1 =
* Initial public release.
