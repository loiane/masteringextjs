<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'masteringextjs');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'root');

/** MySQL hostname */
define('DB_HOST', '127.0.0.1');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'l+MeX.SIg*G})aXppH@WkLMq]pN{?PriSMJi?z~ef,V(3iClr*S$S0-`^(r+*<3-');
define('SECURE_AUTH_KEY',  'Wjl@3`ic]b~2]64W+KXLx)P@oWd!*z|4B)0{c29D?PAFJ<SCJm4AbEVKSzhQ,A:d');
define('LOGGED_IN_KEY',    'wP/`|`s:K<h/;T rKu?N/ad}J1b| Q%sQ*H[jUP#aV=,y<xXD6[]+JX23Nu PJ+ ');
define('NONCE_KEY',        '`cu%!433-IN_D1s``LakBjQG{RH,{7~v+hq7|jHUs~>Z~I]wUe( -f8aB3 laPlg');
define('AUTH_SALT',        'C`A4#?VSv{a>@aLqMuhV)gJI364v5-Jv,p{*hf[ISUy@dIJhJ+JQ+mh+K?o{*/)|');
define('SECURE_AUTH_SALT', 'VyyKTHQYoE,wL0y`_W6kuoYN?|pO-]h .2YzB,),aZ&UfZ@8xqrgFFfcA<$c98jN');
define('LOGGED_IN_SALT',   'x[_}We81o.{ p@Zwk}^fXlE$|-N:`Ic0[8wtY*w/7_-^C3souu3h.nxYkc+]Q04P');
define('NONCE_SALT',       '`%6B-(?W0.|JyiD5D*NLObf[%5of5kUf%CBBolI{EH8c7,3Xm?U.We4cp`;=30!!');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
