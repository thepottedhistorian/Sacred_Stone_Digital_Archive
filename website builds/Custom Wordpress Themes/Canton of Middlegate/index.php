<?php
/**
 * The main template file
 *
 * @package Canton_Middlegate
 */

get_header(); // Opens header markup and <main id="primary" class="site-main container">
?>

<?php if ( have_posts() ) : ?>

    <?php while ( have_posts() ) : the_post(); ?>

        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            
            <?php if ( get_the_title() ) : ?>
                <header class="entry-header">
                    <h1 class="entry-title"><?php the_title(); ?></h1>
                </header>
            <?php endif; ?>

            <div class="entry-content">
                <?php
                the_content(
                    sprintf(
                        wp_kses(
                            /* translators: %s: Name of current post. */
                            __( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'canton-middlegate' ),
                            array(
                                'span' => array(
                                    'class' => array(),
                                ),
                            )
                        ),
                        wp_kses_post( get_the_title() )
                    )
                );

                wp_link_pages(
                    array(
                        'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'canton-middlegate' ),
                        'after'  => '</div>',
                    )
                );
                ?>
            </div>

        </article>

    <?php endwhile; ?>

<?php else : ?>

    <section class="no-results not-found callout-card" style="text-align: center; padding: 3rem 2rem !important; margin: 2rem auto;">
        <div style="font-size: 3rem; color: var(--middlegate-red); margin-bottom: 1rem;">
            <i class="fa-solid fa-scroll"></i>
        </div>
        <h2 style="border-bottom: none; font-size: 1.8rem; margin-top: 0; margin-bottom: 0.5rem;">
            <?php esc_html_e( 'No Records Found in the Archives', 'canton-middlegate' ); ?>
        </h2>
        <p style="font-size: 1.05rem; max-width: 600px; margin: 0 auto 1.5rem auto; color: #444;">
            <?php esc_html_e( 'Alas, our scribes found no historical chronicles matching your request. Try refining your keywords or searching for a broader topic below:', 'canton-middlegate' ); ?>
        </p>
        <div style="max-width: 480px; margin: 0 auto;">
            <?php get_search_form(); ?>
        </div>
    </section>

<?php endif; ?>

</main><!-- #primary -->

<?php
get_footer(); // Includes footer.php