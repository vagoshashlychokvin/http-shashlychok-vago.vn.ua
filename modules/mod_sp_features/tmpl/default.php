<?php
    /**
    * @author    JoomShaper http://www.joomshaper.com
    * @copyright Copyright (C) 2010 - 2014 JoomShaper
    * @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2
    */

	// no direct access
    defined('_JEXEC') or die;
    ?>

    <div class="sp-features container <?php echo $moduleclass_sfx;?>">
        <div class="row-fluid">
            <?php $i=200;?>
            <?php foreach ($data as $key => $value): ?>
                <?php
                    $class = '';
                    if( isset($value['class']) && ($value['class'] !='') ){
                        $class = $value['class'];
                    }
                ?>
                <div class="span<?php echo round(12/count($data)); ?> <?php echo $class; ?> sp-feature-item-wrapper">
                    <div class="sp-feature">
                        <?php if ($value['icon_image']== 1): ?>
                        <div class="feature-img-wrapper wow scaleUp" data-wow-duration="600ms" data-wow-delay="<?php echo $i+100; ?>ms">
                            <a href="<?php echo $value['desc']; ?>" target="blank"><img src="<?php echo $value['image']; ?>" /></a>
                        </div>
                        <?php else: ?>
                            <i class="<?php echo $value['icon']; ?>"></i>
                        <?php endif ?>
                        
                        <?php if( isset($value['title']) && ($value['title'] !='') ): ?>
                            <h3 class="wow scaleUp" data-wow-duration="600ms" data-wow-delay="<?php echo $i+200; ?>ms"><?php echo $value['title']; ?></h3>
                        <?php endif; ?>
                        <?php if( isset($value['desc']) && ($value['desc'] !='') ): ?>
                            <p class="wow fadeInUp" data-wow-duration="600ms" data-wow-delay="<?php echo $i+400; ?>ms" style="color:#ffff00"></p>
                        <?php endif; ?>
                    </div><!--/.sp-feature-->
                </div>
                <?php $i=$i+200; ?>
            <?php endforeach; ?>
        </div><!--/.row-fluid-->
    </div><!--/.sp-features-->