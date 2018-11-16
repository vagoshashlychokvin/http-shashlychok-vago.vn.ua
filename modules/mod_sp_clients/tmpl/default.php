<?php
/**
 * @subpackage	mod_sp_slients
 * @copyright	Copyright (C) 2010 - 2014 JoomShaper. All rights reserved.
 * @license		GNU General Public License version 2 or later; 
 */

// no direct access
defined('_JEXEC') or die;

?>

<div class="sp-clients <?php echo $moduleclass_sfx;?>">

    <ul>
     <?php $i=200;?>
    	<?php foreach ($data as $key => $value):  ?>
         
       		<li>

                <div>

                    <?php if( isset($value['title']) && ($value['title'] !='') ): ?>
                      <h3 class"sp-client-title"><?php echo $value['title']; ?></h3>
                    <?php endif; ?>

                     <?php if( isset($value['url']) && ($value['url'] !='') ): ?>

                     <?php endif; ?>

                     <a href="<?php echo $value['url'] ;?>" target="_blank"><img src="<?php echo $value['img'] ;?>" class="wow scaleUp" data-wow-duration="600ms" data-wow-delay="<?php echo $i+100; ?>ms"></a>

                </div>

          </li><!--/.li-->
           <?php $i=$i+200; ?>
    	<?php endforeach; ?>

    </ul><!--/.ul-->

</div>