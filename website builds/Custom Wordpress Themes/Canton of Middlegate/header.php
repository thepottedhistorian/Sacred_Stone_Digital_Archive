<?php
/**
 * The Header for our custom theme
 * 
 * @package Canton_Middlegate
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body id="top" <?php body_class(); ?>>
<?php wp_body_open(); ?>

    <!-- Accessible Skip Link -->
    <a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'canton-middlegate' ); ?></a>

    <!-- Header Banner Image Showcase (Clickable Home Link) -->
    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="header-banner-link" aria-label="<?php bloginfo( 'name' ); ?> - Home">
        <header class="site-header" role="banner">
            <div class="container">
                <h1 class="site-title screen-reader-text"><?php bloginfo( 'name' ); ?></h1>
                <p class="site-description screen-reader-text"><?php bloginfo( 'description' ); ?></p>
            </div>
        </header>
    </a>

    <!-- Navigation Menu -->
    <div class="navigation-wrap">
        <div class="container">
            <nav id="site-navigation" class="main-navigation" role="navigation" aria-label="Primary Navigation">
                
                <!-- Hamburger Toggle Button -->
                <button id="menu-toggle" class="menu-toggle" aria-controls="primary-menu" aria-expanded="false">
                    <span class="hamburger-icon">☰</span>
                    <span class="screen-reader-text"><?php esc_html_e( 'Primary Menu', 'canton-middlegate' ); ?></span>
                </button>

                <?php
                wp_nav_menu( array(
                    'theme_location' => 'primary',
                    'menu_id'        => 'primary-menu',
                    'container'      => false,
                    'fallback_cb'    => false,
                ) );
                ?>
            </nav>
        </div>
    </div>

    <!-- Main Content Container Opening Tag -->
    <main id="primary" class="site-main container">