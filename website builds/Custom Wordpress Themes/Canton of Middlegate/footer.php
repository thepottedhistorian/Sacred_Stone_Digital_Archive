<?php
/**
 * The Footer for Canton of Middlegate Minimalist
 * 
 * @package Canton_Middlegate
 */
?>
    <footer class="site-footer" role="contentinfo">
        <div class="container footer-grid">
            
<!-- Column 1: Quick Info, Webminister Notice & Parent Links -->
            <div class="footer-col">
                <h4 class="footer-heading"><?php bloginfo( 'name' ); ?></h4>
                <p>
                    <a href="https://atlantia.sca.org/" target="_blank" rel="noopener">Kingdom of Atlantia</a> &bull; 
                    <a href="https://www.sca.org/" target="_blank" rel="noopener">SCA, Inc.</a>
                </p>
                <p class="webminister-credit">
                    Maintained by the <a href="mailto:webminister@middlegate.atlantia.sca.org">Canton Webminister</a>.
                </p>
                <img src="https://middlegate.atlantia.sca.org/Images/badge_middlegate.png" 
                     alt="Canton of Middlegate Crest" 
                     class="footer-badge" />
            </div>
            
            <!-- Column 2: Connect & Quick Links -->
            <div class="footer-col footer-links-col">
                <h4 class="footer-heading">Connect With Us</h4>
                <ul class="footer-social-links">
                    <li><a href="https://www.facebook.com/groups/canton.middlegate" target="_blank" rel="noopener"><i class="fa-brands fa-facebook"></i> Community Group</a></li>
                    <li><a href="https://discord.gg/PDXXtC5Tvy" target="_blank" rel="noopener"><i class="fa-brands fa-discord"></i> Baronial Discord</a></li>
                    <li><a href="mailto:webminister@middlegate.atlantia.sca.org"><i class="fa-solid fa-envelope"></i> Contact Webminister</a></li>
                </ul>
            </div>

            <!-- Column 3: Copyright, Policy & Legal Notice -->
            <div class="footer-col sca-disclaimer">
                <p>
                    This is the official website for the Canton of Middlegate of the Barony of the Sacred Stone, Kingdom of Atlantia, and the Society for Creative Anachronism, Inc. (SCA, Inc.). This site is maintained by the Canton Webminister.
                </p>
                <p>
                    All rights revert to the original authors, artists, or contributors upon publication. For questions or corrections regarding site content, contact the Webminister.
                </p>
                <p class="policy-notice">
                    The SCA prohibits harassment and bullying, and expects courteous behavior and high standards of conduct from all participants. For complete policy details, view the <a href="https://www.sca.org/conduct-behavior-in-the-sca/" target="_blank" rel="noopener">SCA Conduct &amp; Behavior Policies</a>.
                </p>
                <p class="copyright-line">
                    &copy; <?php echo date('Y'); ?> <?php bloginfo( 'name' ); ?> All rights reserved. &bull; 
                    <a href="<?php echo esc_url( home_url( '/privacy-policy/' ) ); ?>">Privacy Policy</a> &bull; 
                    <a href="#top" class="back-to-top"><i class="fa-solid fa-arrow-up"></i> Top</a>
                </p>
            </div>

        </div>
    </footer>

    <!-- Mobile Hamburger Menu Toggle Script -->
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        const menuToggle = document.getElementById('menu-toggle');
        const primaryMenu = document.getElementById('primary-menu');

        if (menuToggle && primaryMenu) {
            menuToggle.addEventListener('click', function() {
                primaryMenu.classList.toggle('active');
                const isExpanded = primaryMenu.classList.contains('active');
                menuToggle.setAttribute('aria-expanded', isExpanded);
            });
        }
    });
    </script>

    <?php wp_footer(); ?>
</body>
</html>