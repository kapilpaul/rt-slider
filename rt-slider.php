<?php
/**
 * Plugin Name:       RT Slider
 * Description:       Custom slider block
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Kapil Paul
 * License:           gplv2
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       rt-slider
 *
 * @package           rtslider
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */
function rtslider_rt_slider_block_init() {
	register_block_type_from_metadata( __DIR__ );
}
add_action( 'init', 'rtslider_rt_slider_block_init' );
