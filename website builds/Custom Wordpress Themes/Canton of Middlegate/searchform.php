<?php
/**
 * Custom Archival Search Form Template
 *
 * @package Canton_Middlegate
 */
?>
<form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
    <label class="screen-reader-text" for="search-input">
        <?php esc_html_e( 'Search for:', 'canton-middlegate' ); ?>
    </label>
    <input type="search" id="search-input" class="search-field" placeholder="<?php esc_attr_e( 'Search the archives…', 'canton-middlegate' ); ?>" value="<?php echo get_search_query(); ?>" name="s" />
    <button type="submit" class="search-submit">
        <i class="fa-solid fa-magnifying-glass"></i> <?php esc_html_e( 'Search', 'canton-middlegate' ); ?>
    </button>
</form>