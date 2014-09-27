<?php
add_filter('smart-donations-register-provider',function($providerList){
	wp_enqueue_script('smart-donations-donation-provider',plugin_dir_url(__FILE__).'js/donationProvider.js',array('isolated-slider','smart-donations-eventmanager'));
	array_push($providerList,'smart-donations-donation-provider');
	return $providerList;
});


add_filter('smart-donations-register-designers',function($designers){
	wp_enqueue_script('smart-donations-paypal-designer',plugin_dir_url(__FILE__).'js/SDPayPalProviderDesigner.js',array('smart-donations-base-designer'));
	array_push($designers,'smart-donations-paypal-designer');
	return $designers;
});