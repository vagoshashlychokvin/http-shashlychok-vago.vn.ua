<?php
 /**
 * @package mod_jlgrouppro
 * @author Kunicin Vadim (vadim@joomline.ru)
 * @version 1.2.1
 * @copyright (C) 2013 by JoomLine (http://www.joomline.net)
 * @license GNU/GPL: http://www.gnu.org/copyleft/gpl.html
 *
*/
// No direct access

$doc = JFactory::getDocument();
$doc->addCustomTag('<script src="//vk.com/js/api/openapi.js?87"></script>');
If ($typeviewercss==1) {
	$doc->addStyleSheet(JURI::root(true)."modules/mod_jlgrouppro/css/jlgroupetabs.css");
	}
If ($typeviewerjq==1) {
	$doc->addCustomTag('<script src="http://yandex.st/1.9.1/jquery.min.js"></script>');
	}
If ($typeviewerbs==1) {
	$doc->addCustomTag('<script src="http://yandex.st/bootstrap/2.3.0/js/bootstrap.min.js"></script>');
	}
If ($typeviewernojq==1) {
	$doc->addCustomTag ('<script type="text/javascript">var jqjlpro = jQuery.noConflict();</script>');
	}
else {}
?>

<?php  
$shares .= 'PGRpdiBzdHlsZT0iZm9udC1zaXplOjdweDt0ZXh0LWFsaWduOmNlbnRlcjsiPjxhIGhyZWY9Imh0dHA6Ly9qb29tbGFtb2R1bGkucnUvdml';
$shares .= 'kemhldC1zb2NpYWxueXgtc2V0ZWotZGx5YS1qb29tbGEuaHRtbCIgdGFyZ2V0PSJfYmxhbmsiIHRpdGxlPSLQnNC+0LTRg9C70Ywg0YHQvtGG';
?>
<div class="tab-content">

<?
$shares .= '0LjQsNC70YzQvdGL0YUg0YHQtdGC0LXQuSBKb29tbGEiPtCy0LjQtNC20LXRgjwvYT48L2Rpdj4=';
$parametr = base64_decode($shares);
foreach ($orders as $order) {		
	switch($order) {		
	case 1:
	if ($showvkontakte) { $scriptPage .= <<<HTML
	
	<div class="tab-pane active" id="vkgroup">
	<div  id="jlvkgrouppro$group_id"></div>
	<script type="text/javascript">
		VK.Widgets.Group("jlvkgrouppro$group_id", {mode: $mode, wide: $wide, width: "$width", height: "$height"}, $group_id);
	</script>
    </div>
HTML;
	
						} else {$scriptPage .='';} break;
	case 2:	
	if ($showok) { $scriptPage .= <<<HTML
	<div class="tab-pane" id="okgroup">
			<!-- OK Widget -->
			<div id="ok_grouppro_widget"></div>
			<script>
			!function(d,id,did,st){
			  var js=d.createElement('script');
			  js.src="http://connect.ok.ru/connect.js";
			  js.onload = js.onreadystatechange = function (){
				if(!this.readyState || this.readyState=="loaded" || this.readyState=="complete"){
				   if(!this.executed){
					 this.executed = true;
					 setTimeout(function(){OK.CONNECT.insertGroupWidget(id,did,st);},0);
				   }
				}
			  }
			  d.documentElement.appendChild(js);
			}
			(document, "ok_grouppro_widget", $group_id_ok, '{width: "$width",height: "$height"}');
			</script>
    </div>
HTML;
						} else {$scriptPage .='';} break;
	case 3:	
	if ($showfacebook) { $scriptPage .= <<<HTML
	<div class="tab-pane" id="fbgroup">
			<!-- FB Widget -->
			<div id="fb-root"></div>
			<script>(function(d, s, id) {
			  var js, fjs = d.getElementsByTagName(s)[0];
			  if (d.getElementById(id)) return;
			  js = d.createElement(s); js.id = id;
			  js.src = "//connect.facebook.net/$fblang/all.js#xfbml=1&appId=$fbappid";
			  fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));</script>

			<div class="fb-like-box" data-href="http://www.facebook.com/$group_id_fb" data-width="$width" data-height="$height" data-show-faces="true" data-stream="false" data-header="true"></div>
			
    </div>
HTML;
						} else {$scriptPage .='';} break;
		case 4:	
	if ($showfacebook) { $scriptPage .= <<<HTML
	<div class="tab-pane" id="ggroup">
		<div class="g-plus" data-width="$width" data-href="//plus.google.com/$googleid" data-rel="publisher"></div>

		<script type="text/javascript">
		  window.___gcfg = {lang: '$googlelang'};

		  (function() {
			var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
			po.src = 'https://apis.google.com/js/plusone.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
		  })();
		</script>
		
    </div>
HTML;
						} else {$scriptPage .='';} break;
}}
echo $scriptPage;

?>
</div>	


<script type="text/javascript">
jQuery(document).ready(function(){
jQuery('#jlgrouppro a:first').tab('show');
});
</script>