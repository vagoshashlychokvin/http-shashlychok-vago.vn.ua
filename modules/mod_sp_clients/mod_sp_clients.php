<?php
/**
 * @package		Joomla.Site
 * @subpackage	mod_sp_clients
 * @copyright	Copyright (C) 2010 - 2014 JoomShaper. All rights reserved.
 * @license		GNU General Public License version 2 or later; 
 */

// no direct access
defined('_JEXEC') or die;

$layout                 = $params->get('layout', 'default');
$moduleclass_sfx        = $params->get('moduleclass_sfx');

$data = array();

//Client 1
if( $params->get('client1_img') ){
	$data[0][ 'title' ] 				= $params->get('client1_title');
	$data[0][ 'img' ] 				= $params->get('client1_img');
	$data[0][ 'url' ] 				= $params->get('client1_url');
}

//Client 2
if( $params->get('client2_img') ){
	$data[1][ 'title' ] 				= $params->get('client2_title');
	$data[1][ 'img' ] 				= $params->get('client2_img');
	$data[1][ 'url' ] 				= $params->get('client2_url');
}

//Client 3
if( $params->get('client3_img') ){
	$data[2][ 'title' ] 				= $params->get('client3_title');
	$data[2][ 'img' ] 				= $params->get('client3_img');
	$data[2][ 'url' ] 				= $params->get('client3_url');
}

//Client 4
if( $params->get('client4_img') ){
	$data[3][ 'title' ] 				= $params->get('client4_title');
	$data[3][ 'img' ] 				= $params->get('client4_img');
	$data[3][ 'url' ] 				= $params->get('client4_url');
}

//Client 5
if( $params->get('client5_img') ){
	$data[4][ 'title' ] 				= $params->get('client5_title');
	$data[4][ 'img' ] 				= $params->get('client5_img');
	$data[4][ 'url' ] 				= $params->get('client5_url');
}

//Client 6
if( $params->get('client6_img') ){
	$data[5][ 'title' ] 				= $params->get('client6_title');
	$data[5][ 'img' ] 				= $params->get('client6_img');
	$data[5][ 'url' ] 				= $params->get('client6_url');
}

//Client 7
if( $params->get('client7_img') ){
	$data[6][ 'title' ] 				= $params->get('client7_title');
	$data[6][ 'img' ] 				= $params->get('client7_img');
	$data[6][ 'url' ] 				= $params->get('client7_url');
}

//Client 8
if( $params->get('client8_img') ){
	$data[7][ 'title' ] 				= $params->get('client8_title');
	$data[7][ 'img' ] 				= $params->get('client8_img');
	$data[7][ 'url' ] 				= $params->get('client8_url');
}

//Client 9
if( $params->get('client9_img') ){
	$data[8][ 'title' ] 				= $params->get('client9_title');
	$data[8][ 'img' ] 				= $params->get('client9_img');
	$data[8][ 'url' ] 				= $params->get('client9_url');
}


//Client 10
if( $params->get('client10_img') ){
	$data[9][ 'title' ] 				= $params->get('client10_title');
	$data[9][ 'img' ] 				= $params->get('client10_img');
	$data[9][ 'url' ] 				= $params->get('client10_url');
}

//Client 11
if( $params->get('client11_img') ){
	$data[10][ 'title' ] 				= $params->get('client11_title');
	$data[10][ 'img' ] 				= $params->get('client11_img');
	$data[10][ 'url' ] 				= $params->get('client11_url');
}

//Client 12
if( $params->get('client12_img') ){
	$data[11][ 'title' ] 				= $params->get('client12_title');
	$data[11][ 'img' ] 				= $params->get('client12_img');
	$data[11][ 'url' ] 				= $params->get('client12_url');
}



require(JModuleHelper::getLayoutPath('mod_sp_clients', $layout) );