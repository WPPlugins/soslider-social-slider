<?php

if ( ! defined( 'HOUR_IN_SECONDS' ) ) {
    define( 'HOUR_IN_SECONDS', 3600 );
}

if (
	!function_exists( 'wp_is_mobile' ) &&
	defined( 'SOSLIDER_MOBILE_COMPAT' ) &&
	SOSLIDER_MOBILE_COMPAT
	) {
    // backported from WP4.0
    function wp_is_mobile() {
        static $is_mobile;

        if ( isset( $is_mobile ) )
            return $is_mobile;

        if ( empty( $_SERVER['HTTP_USER_AGENT'] ) ) {
            $is_mobile = false;
        } elseif ( strpos( $_SERVER['HTTP_USER_AGENT'], 'Mobile' ) !== false // many mobile devices (all iPhone, iPad, etc.)
            || strpos( $_SERVER['HTTP_USER_AGENT'], 'Android' ) !== false || strpos( $_SERVER['HTTP_USER_AGENT'], 'Silk/' ) !== false || strpos( $_SERVER['HTTP_USER_AGENT'], 'Kindle' ) !== false || strpos( $_SERVER['HTTP_USER_AGENT'], 'BlackBerry' ) !== false || strpos( $_SERVER['HTTP_USER_AGENT'], 'Opera Mini' ) !== false || strpos( $_SERVER['HTTP_USER_AGENT'], 'Opera Mobi' ) !== false ) {
            $is_mobile = true;
        } else {
            $is_mobile = false;
        }

        return $is_mobile;
    }
}

function soslider_compatibility_admin_init() {
    if (
        isset( $_GET['page'] ) &&
        'soslider_help' === $_GET['page']
    ) {
        wp_redirect( 'http://soslider.com/doc/#!/facebook' );
        exit();
    }
}
add_action( 'admin_init', 'soslider_compatibility_admin_init' );


