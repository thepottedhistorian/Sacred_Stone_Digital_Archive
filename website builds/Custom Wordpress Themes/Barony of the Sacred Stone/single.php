<?php
/**
 * The template for displaying single blog posts or news items
 *
 * @package Sacred_Stone
 */

get_header(); // Opens header markup and <main id="primary" class="site-main container">
?>

<?php while ( have_posts() ) : the_post(); ?>

    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
        
        <header class="entry-header" style="display: block !important;">
            <h1 class="entry-title"><?php the_title(); ?></h1>
            <div class="entry-meta" style="font-style: italic; color: #555; margin-top: 0.5rem;">
                <?php esc_html_e( 'Published on ', 'sacred-stone' ); ?> <?php echo get_the_date(); ?>
            </div>
        </header>

        <div class="entry-content">
            <?php
            the_content();

            wp_link_pages(
                array(
                    'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'sacred-stone' ),
                    'after'  => '</div>',
                )
            );
            ?>
        </div>

    </article>

<?php endwhile; ?>

</main><!-- #primary -->

<?php
get_footer(); // Includes footer.php