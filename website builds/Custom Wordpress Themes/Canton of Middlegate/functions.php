<?php
/**
 * Theme Functions and Definitions
 * 
 * @package Canton_Middlegate
 */

if ( ! function_exists( 'canton_middlegate_setup' ) ) :
    /**
     * Sets up theme defaults and registers support for various WordPress features.
     */
    function canton_middlegate_setup() {
        // Let WordPress handle the browser <title> tag dynamically
        add_theme_support( 'title-tag' );

        // Enable support for Post Thumbnails / Featured Images
        add_theme_support( 'post-thumbnails' );

        // Switch default core markup to output valid HTML5
        add_theme_support( 'html5', array(
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
            'script',
            'style',
        ) );

        // Register primary navigation menu
        register_nav_menus( array(
            'primary' => esc_html__( 'Primary Menu', 'canton-middlegate' ),
        ) );
    }
endif;
add_action( 'after_setup_theme', 'canton_middlegate_setup' );

/**
 * Enqueue scripts and styles.
 */
function canton_middlegate_scripts() {
    // Main Theme Stylesheet
    wp_enqueue_style( 'canton-middlegate-main-style', get_stylesheet_uri(), array(), '0.1.3' );

    // Font Awesome Icon CDN
    wp_enqueue_style( 'font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css', array(), '6.5.1' );
}
add_action( 'wp_enqueue_scripts', 'canton_middlegate_scripts' );