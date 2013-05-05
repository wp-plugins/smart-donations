<?php
/**
 * Created by JetBrains PhpStorm.
 * User: edseventeen
 * Date: 3/29/13
 * Time: 9:29 AM
 * To change this template use File | Settings | File Templates.
 */

global $wpdb;
if(!defined('ABSPATH'))
    die('Forbidden');

define('SMART_DONATIONS_PLUGIN_NAME',dirname(plugin_basename(__FILE__)));
define('SMART_DONATIONS_DIR',WP_PLUGIN_DIR.'/'.SMART_DONATIONS_PLUGIN_NAME);
define('SMART_DONATIONS_TABLE_NAME',$wpdb->prefix . "smart_donations_donation_item");
define('SMART_DONATIONS_LATEST_DB_VERSION',2);

?>