<?php
/**
 * The template for displaying 404 pages (Not Found)
 *
 * @package Sacred_Stone
 */

get_header(); // Opens header markup and <main id="primary" class="site-main container">
?>

<section class="error-404 not-found callout-card" style="text-align: center; padding: 3rem 2rem !important; margin: 2rem auto;">
    
    <!-- Heraldic / Scriptorium Icon -->
    <div style="font-size: 3.5rem; color: var(--baronial-green); margin-bottom: 1rem;">
        <i class="fa-solid fa-scroll"></i>
    </div>

    <header class="entry-header" style="display: block !important; border-bottom: none !important; margin-bottom: 1rem !important;">
        <h1 class="entry-title" style="font-size: 2.2rem; color: var(--baronial-green);">
            <?php esc_html_e( '404: Lost in the Scriptorium', 'sacred-stone' ); ?>
        </h1>
        <p style="font-style: italic; color: var(--baronial-gold); font-size: 1.1rem; margin-top: 0.5rem;">
            <?php esc_html_e( '“Here be dragons, rogue scribes, and missing parchment.”', 'sacred-stone' ); ?>
        </p>
    </header>

    <div class="entry-content" style="max-width: 750px; margin: 0 auto;">
        <p>
            <?php esc_html_e( 'Alas, weary traveler! The manuscript page or chronicle entry you seek has vanished from our archives. A stray quill slip by the Webminister, a hungry library mouse, or perchance a mischievous court jester has carried it off.', 'sacred-stone' ); ?>
        </p>

        <hr class="wp-block-separator" style="margin: 1.5rem auto !important; width: 60%;" />

        <p style="font-size: 1rem; margin-bottom: 1rem;">
            <strong><?php esc_html_e( 'Fear not! You may consult the archives below to regain your bearing:', 'sacred-stone' ); ?></strong>
        </p>

        <!-- Search Bar Integration -->
        <div style="max-width: 450px; margin: 0 auto 1.5rem auto;">
            <?php get_search_form(); ?>
        </div>

        <!-- Navigation Action Buttons Stack -->
        <div class="error-404-action-buttons" style="display: flex; flex-direction: column; align-items: center; gap: 0.85rem; margin-top: 1.5rem;">
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="wp-block-button__link" style="width: 100%; max-width: 380px; text-decoration: none !important;">
                <i class="fa-solid fa-house"></i> <?php esc_html_e( 'Return to the Great Hall', 'sacred-stone' ); ?>
            </a>
            
            <a href="mailto:webminister@sacredstone.atlantia.sca.org" class="wp-block-button__link" style="width: 100%; max-width: 380px; background-color: transparent !important; color: var(--baronial-green) !important; border: 2px solid var(--baronial-green) !important; text-decoration: none !important;">
                <i class="fa-solid fa-feather-pointed"></i> <?php esc_html_e( 'Summon the Scribe', 'sacred-stone' ); ?>
            </a>
        </div>

    </div>

</section>

</main><!-- #primary -->

<?php
get_footer(); // Includes footer.php