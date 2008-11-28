<?php
/*
Plugin Name: Fliptext
Plugin URI: http://www.telesphore.org/plugins/fliptext
Description: Display your text in mirror mode
Version: 1.0
Author: Telesphore
Author URI: http://www.telesphore.org
*/

function tinyMceButton()
{
	add_filter("mce_external_plugins", 'addTinymcePlugin', 5);
	add_filter('mce_buttons', 'registerButton', 5);
}

function registerButton($buttons)
{
	array_push($buttons, "fliptext");
	return $buttons;
}

function addTinymcePlugin($plugin_array)
{
	$plugin_array['fliptext'] = get_option('siteurl').'/wp-content/plugins/'.dirname(plugin_basename(__FILE__)).'/fliptext.js';
	return $plugin_array;
}

function changeMceVersion($v)
{
	return ++$v;
}
function setDefaults()
{
	global $wpdb;
	$wpdb->query("ALTER TABLE `".$wpdb->prefix."posts` CHANGE `post_content` `post_content` LONGTEXT CHARACTER SET utf8 COLLATE utf8_bin NOT NULL ");
	$wpdb->query("ALTER TABLE `".$wpdb->prefix."posts` CHANGE `post_title` `post_title` TEXT CHARACTER SET utf8 COLLATE utf8_bin NOT NULL ");
	$wpdb->query("ALTER TABLE `".$wpdb->prefix."posts` CHANGE `post_excerpt` `post_excerpt` TEXT CHARACTER SET utf8 COLLATE utf8_bin NOT NULL ");
	$wpdb->query("ALTER TABLE `".$wpdb->prefix."comments` CHANGE `comment_author` `comment_author` TINYTEXT CHARACTER SET utf8 COLLATE utf8_bin NOT NULL ");
	$wpdb->query("ALTER TABLE `".$wpdb->prefix."comments` CHANGE `comment_content` `comment_content` TEXT CHARACTER SET utf8 COLLATE utf8_bin NOT NULL ");
}

add_filter('init', 'tinyMceButton');
add_filter('tiny_mce_before_init', 'changeMceVersion');
register_activation_hook(__FILE__, 'setDefaults');