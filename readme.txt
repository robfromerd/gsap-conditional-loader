=== GSAP Conditional Loader (All-Plugin Edition) ===
Contributors:      Robert Goldberg
Tags:              gsap, animation, scrolltrigger, splittext, morphsvg, wordpress
Requires at least: 6.0
Tested up to:      6.5
Stable tag:        1.2.1
License:           GPLv2 or later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Loads GSAP core *and* any GSAP plugins you list, but **only** on content in the **animated** category.  
Ships ready-made CSS classes—plus optional **`rotate-X`** modifiers—for character/line SplitText, fade-ups, scale-ins, and MorphSVG scroll animations (use HTML block for inline SVG, not image insertion for the SVG). NOTE: install an SVG support plugin to use SVG. 

== Description ==

* Enqueues `gsap.min.js` and every plugin named in `$plugins`.
* Runs scripts only on posts **or pages** assigned to the `animated` category (custom taxonomy support included).
* Includes a `gsap-custom.js` helper set:
  * `.gsap-split-chars` – per-character reveal  
  * `.gsap-split-lines` – per-line reveal, **angle controlled by `rotate-X` class**  
  * `.gsap-fade-up` – core fade / slide  
  * `.gsap-scale-in` – zoom-pop  
  * `.gsap-morph` – MorphSVG path-to-path morph (supports `fill` tween & optional `data-delay`)

== Installation ==

1. Upload `gsap-conditional-loader` to `/wp-content/plugins/`.
2. Activate the plugin.
3. Ensure the **animated** category exists and assign it to any post **or page** that needs GSAP.

== Usage ==

### Quick-start class list

| Effect | Base class | Optional modifier(s) | Result |
|--------|-----------|----------------------|--------|
| Split by **characters** | `gsap-split-chars` | — | Slides each character up & fades in |
| Split by **lines** | `gsap-split-lines` | `rotate-0`, `rotate-10`, `rotate-25`, … | Controls hinge angle (°). `rotate-0` = horizontal slide, defaults to −18° if omitted |
| **Fade-up** | `gsap-fade-up` | — | 40 px slide-up + fade |
| **Scale-in** | `gsap-scale-in` | — | Zoom from 50 % scale |
| **MorphSVG** | `gsap-morph` | `data-delay="0.75"` (optional) | Morphs *.morph-from* ➜ *.morph-to*; colour tween supported |


### Block-level examples (copy into “Custom HTML” **or** use Paragraph block + *Additional CSS class*)

```html
<!-- 1. Split-by-characters -->
<p class="gsap-split-chars">
  Animate me <strong>letter</strong> by <em>letter</em>
</p>

<!-- 2a. Split-by-lines, default hinge (−18°) -->
<p class="gsap-split-lines">
  Each line<br>
  swings in like a door
</p>

<p class="gsap-split-lines rotate-25">Lines hinge in at 25°</p>
<!-- 2b. Split-by-lines, horizontal slide (rotate-0) -->
<p class="gsap-split-lines rotate-0">
  Horizontal slide-in<br>
  with no tilt
</p>

<!-- 3. Fade-up text block -->
<p class="gsap-fade-up">
  I start lower and fade into view.
</p>

<!-- 4. Scale-in hero line -->
<p class="gsap-scale-in">
  Zoom-pop entrance effect!
</p>

<!-- 5. MorphSVG demo with optional delay, use HTML block for inline SVG, not image insertion -->
<svg class="gsap-morph" data-delay="0.5"
     xmlns="http://www.w3.org/2000/svg"
     width="140" height="140" viewBox="0 0 140 140">
  <path class="morph-from" fill="#66ccff"
        d="M70 5 A65 65 0 1 1 69.9 5 Z"/>
  <path class="morph-to"   fill="#049b4f"
        d="M5 5 H135 V135 H5 Z"
        style="display:none"/>
</svg>

