<?php
/**
 * @package	HikaShop for Joomla!
 * @version	2.3.2
 * @author	hikashop.com
 * @copyright	(C) 2010-2014 HIKARI SOFTWARE. All rights reserved.
 * @license	GNU/GPLv3 http://www.gnu.org/licenses/gpl-3.0.html
 */
defined('_JEXEC') or die('Restricted access');
?><?php
class plgHikashopShippingmanual_prices extends JPlugin {

	function __construct(&$subject, $config) {
		parent::__construct($subject, $config);
	}

	function _getShippings($product) {
		if(empty($product->product_id)) {
			$product_id = 0;
		} else {
			$product_id = $product->product_id;
		}

		$db = JFactory::getDBO();
		$query = 'SELECT b.*, a.*, c.currency_symbol FROM ' . hikashop_table('shipping') . ' AS a LEFT JOIN '.
			hikashop_table('shipping_price').' AS b ON a.shipping_id = b.shipping_id AND b.shipping_price_ref_id = '.$product_id.' INNER JOIN '.
			hikashop_table('currency').' AS c ON c.currency_id = a.shipping_currency_id '.
			'WHERE a.shipping_params LIKE '.
			$db->Quote('%s:20:"shipping_per_product";s:1:"1"%') . ' AND (b.shipping_price_ref_id IS NULL OR (b.shipping_price_ref_id = ' . $product_id . ' AND b.shipping_price_ref_type = \'product\')) '.
			'ORDER BY a.shipping_id, b.shipping_price_min_quantity';
		$db->setQuery($query);
		$shippings = $db->loadObjectList();
		return $shippings;
	}

	function onProductBlocksDisplay(&$product, &$html) {
		$shippings = $this->_getShippings($product);
		if(empty($shippings))
			return;

		$currencyHelper = hikashop_get('class.currency');

		ob_start();
		include dirname(__FILE__).DS.'shippingprices_views'.DS.'backend_product.php';
		$data = ob_get_clean();
		$html[] = $data;
	}

	function onMarketProductBlocksDisplay(&$product, &$html) {
		if(!defined('HIKAMARKET_COMPONENT'))
			return;

		$marketConfig = hikamarket::config();
		if(!$marketConfig->get('frontend_edition',0)) return;
		if(!hikamarket::acl('product_edit_plugin_shippingprices')) return;

		$shippings = $this->_getShippings($product);
		if(empty($shippings))
			return;

		$currencyHelper = hikashop_get('class.currency');

		if(empty($product->product_id)) {
			$product_id = 0;
		} else {
			$product_id = $product->product_id;
		}

		ob_start();
		include dirname(__FILE__).DS.'shippingprices_views'.DS.'market_product.php';
		$data = ob_get_clean();
		$html[] = $data;
		return;
	}

	function onMarketAclPluginListing(&$categories) {
		$categories['product'][] = 'shippingprices';
	}

	function onAfterProductCreate(&$product) {
		return $this->onAfterProductUpdate($product);
	}

	function onAfterProductUpdate(&$product) {
		$app = JFactory::getApplication();
		if(!$app->isAdmin()) {
			if(!defined('HIKAMARKET_COMPONENT')) {
				return;
			} else {
				$marketConfig = hikamarket::config();
				if(!$marketConfig->get('frontend_edition',0)) return;
				if(!hikamarket::acl('product_edit_plugin_shippingprices')) return;
			}
		}

		$formData = JRequest::getVar('shipping_prices', array(), '', 'array');
		if(empty($formData))
			return;

		if(!$app->isAdmin()) {
			if(isset($formData[$product->product_id]))
				$formData = $formData[$product->product_id];
			else
				$formData = array();
		}

		if(empty($product->product_id))
			return;

		$db = JFactory::getDBO();
		$query = 'SELECT b.*, a.*, c.currency_symbol FROM ' . hikashop_table('shipping') . ' AS a INNER JOIN '.
			hikashop_table('shipping_price').' AS b ON a.shipping_id = b.shipping_id INNER JOIN '.
			hikashop_table('currency').' AS c ON c.currency_id = a.shipping_currency_id '.
			'WHERE a.shipping_params LIKE '.
			$db->Quote('%s:20:"shipping_per_product";s:1:"1"%') . ' AND b.shipping_price_ref_id = ' . $product->product_id . ' AND b.shipping_price_ref_type = \'product\' '.
			'ORDER BY a.shipping_id, b.shipping_price_min_quantity';
		$db->setQuery($query);
		$shippings = $db->loadObjectList('shipping_price_id');

		$toRemove = array_keys($shippings);
		if(!empty($toRemove)) {
			$toRemove = array_combine($toRemove, $toRemove);
		}
		$toInsert = array();


		$checks = array();
		foreach($formData as &$data) {
			if(is_string($data)) {
				$data = null;
			} else {
				if(empty($checks[$data['shipping_id']])) {
					$checks[$data['shipping_id']] = array();
				}
				if(!isset($checks[$data['shipping_id']][$data['qty']])) {
					$checks[$data['shipping_id']][$data['qty']] = true;
				} else {
					$data = null;
				}
			}
			unset($data);
		}
		unset($checks);

		foreach($formData as $data) {
			if($data == null)
				continue;
			$shipping = null;
			if(!empty($data['id']) && isset($shippings[$data['id']]) ) {
				if(empty($data['value']) && empty($data['fee']))
					continue;

				$shipping = $shippings[$data['id']];
				unset($toRemove[$data['id']]);

				if(empty($data['qty']) || (int)$data['qty'] < 1)
					$data['qty'] = 1;

				if( (int)$shipping->shipping_price_min_quantity != (int)$data['qty'] || (float)$shipping->shipping_price_value != (float)$data['value'] || (float)$shipping->shipping_fee_value != (float)$data['fee']) {
					$query = 'UPDATE ' . hikashop_table('shipping_price') .
						' SET shipping_price_min_quantity = ' . (int)$data['qty'] . ', shipping_price_value = ' . (float)$data['value'] . ', shipping_fee_value = ' . (float)$data['fee'] .
						' WHERE shipping_price_id = ' . $data['id'] . ' AND shipping_price_ref_id = ' . $product->product_id . ' AND shipping_price_ref_type = \'product\'';
					$db->setQuery($query);
					$db->query();
				}
			} else {
				if((!empty($data['value']) || !empty($data['fee'])) && !empty($data['shipping_id']) ) {
					if(empty($data['qty']) || (int)$data['qty'] < 1)
						$data['qty'] = 1;
					$toInsert[] = (int)$data['shipping_id'].','.$product->product_id.',\'product\','.(int)$data['qty'].','.(float)$data['value'].','.(float)$data['fee'];
				}
			}
		}


		if(!empty($toRemove)) {
			$db->setQuery('DELETE FROM ' . hikashop_table('shipping_price') . ' WHERE shipping_price_ref_id = ' . $product->product_id . ' AND shipping_price_ref_type = \'product\' AND shipping_price_id IN ('.implode(',',$toRemove).')');
			$db->query();
		}
		if(!empty($toInsert)) {
			$db->setQuery('INSERT IGNORE INTO ' . hikashop_table('shipping_price') . ' (`shipping_id`,`shipping_price_ref_id`,`shipping_price_ref_type`,`shipping_price_min_quantity`,`shipping_price_value`,`shipping_fee_value`) VALUES ('.implode('),(',$toInsert).')');
			$db->query();
		}
	}
}
