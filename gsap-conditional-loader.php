<?php
/**
 * Plugin Name: GSAP Conditional Loader (All-Plugin Edition)
 * Description:	Loads GSAP core + any GSAP plugins you list, but only
 *              on content in the “animated” category. See readme.txt for instructions. 
 * Version:		1.2.2
 * Author:		Rob Goldberg
 * License:		GPL-2.0+
 */

defined( 'ABSPATH' ) || exit;

add_action( 'wp_enqueue_scripts', function () {

	/* --------------------------------------------------------------
	 * 1. Decide whether this request needs GSAP at all
	 * ------------------------------------------------------------ */
	$needs_gsap =
		( is_singular() && has_term( 'animated', 'category' ) ) ||
		is_category( 'animated' );

	if ( ! $needs_gsap ) {
		return;                                  // nothing to enqueue
	}

	/* --------------------------------------------------------------
	 * 2. CDN + version (keep all files on the same version!)
	 * ------------------------------------------------------------ */
	$ver = '3.13.0';
	$cdn = "https://cdn.jsdelivr.net/npm/gsap@$ver/dist/"; // or unpkg

	/* --------------------------------------------------------------
	 * 3. Core GSAP
	 * ------------------------------------------------------------ */
	wp_enqueue_script(
		'gsap',
		$cdn . 'gsap.min.js',
		[],
		$ver,
		true
	);

	/* --------------------------------------------------------------
	 * 4. Plug-ins you want to add (edit this list!)
	 * ------------------------------------------------------------ */
	$plugins = [
		'ScrollTrigger',
		'ScrollToPlugin',
		'Draggable',
		'MorphSVGPlugin',
		'SplitText',
		'ScrollSmoother',
		// add/remove names as needed
	];

	foreach ( $plugins as $plugin ) {
		$handle = 'gsap-' . strtolower( $plugin );         // e.g. gsap-scrolltrigger
		wp_enqueue_script(
			$handle,
			$cdn . $plugin . '.min.js',
			[ 'gsap' ],                                   // depend on core
			$ver,
			true
		);
	}

	/* --------------------------------------------------------------
	 * 5. Your own timeline logic (optional)
	 * ------------------------------------------------------------ */
	wp_enqueue_script(
		'gsap-custom',
		plugin_dir_url( __FILE__ ) . 'js/gsap-custom.js',
		array_merge( [ 'gsap' ], array_map(
			fn( $p ) => 'gsap-' . strtolower( $p ),
			$plugins
		) ),
		'1.0.0',
		true
	);
} );

/**
 * Allow the built-in “category” taxonomy on Pages
 * ----------------------------------------------------------------
 * Runs early on init so the editor UI and queries pick it up.
 */
add_action( 'init', function () {
    // Attach the core taxonomy “category” to the post-type “page”
    register_taxonomy_for_object_type( 'category', 'page' );
}, 5 );   // priority 5 → before the editor loads
