<?php
/**
 * The template for displaying archive pages
 *
 * @package Canton_Middlegate
 */

get_header(); // Opens header markup and <main id="primary" class="site-main container">
?>

<?php if ( have_posts() ) : ?>

    <header class="entry-header" style="display: block !important;">
        <h1 class="entry-title"><?php the_archive_title(); ?></h1>
        <?php the_archive_description( '<div class="archive-description">', '</div>' ); ?>
    </header>

    <?php while ( have_posts() ) : the_post(); ?>

        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?> style="margin-bottom: 2rem; border-bottom: 1px dashed var(--border-color); padding-bottom: 1.5rem;">
            <h2 style="border: none; margin-bottom: 0.25rem;">
                <a href="<?php the_permalink(); ?>" style="text-decoration: none; color: var(--middlegate-red);"><?php the_title(); ?></a>
            </h2>
            <div style="font-size: 0.85rem; font-style: italic; color: #666; margin-bottom: 0.75rem;">
                <?php echo get_the_date(); ?>
            </div>
            <div class="entry-summary">
                <?php 
                if ( has_excerpt() ) {
                    echo wp_kses_post( get_the_excerpt() );
                } else {
                    $raw_content = get_the_content();
                    $clean_content = strip_shortcodes( $raw_content );
                    $clean_content = preg_replace( '/<(object|embed|iframe)[^>]*>.*?<\/\1>/i', '', $clean_content );
                    $clean_content = wp_strip_all_tags( $clean_content );
                    
                    echo esc_html( wp_trim_words( $clean_content, 35, '...' ) );
                }
                ?>
            </div>
        </article>

    <?php endwhile; ?>

    <?php the_posts_navigation(); ?>

<?php else : ?>

    <section class="no-results not-found callout-card" style="text-align: center; padding: 3rem 2rem !important; margin: 2rem auto;">
        <div style="font-size: 3rem; color: var(--middlegate-red); margin-bottom: 1rem;">
            <i class="fa-solid fa-scroll"></i>
        </div>
        <h2 style="border-bottom: none; font-size: 1.8rem; margin-top: 0; margin-bottom: 0.5rem;">
            <?php esc_html_e( 'No Records Found in the Archives', 'canton-middlegate' ); ?>
        </h2>
        <p style="font-size: 1.05rem; max-width: 600px; margin: 0 auto 1.5rem auto; color: #444;">
            <?php esc_html_e( 'Alas, our scribes found no chronicles matching your request. Try refining your keywords or searching for a broader topic below:', 'canton-middlegate' ); ?>
        </p>
        <div style="max-width: 480px; margin: 0 auto;">
            <?php get_search_form(); ?>
        </div>
    </section>

<?php endif; ?>

</main><!-- #primary -->

<?php
get_footer(); // Includes footer.php