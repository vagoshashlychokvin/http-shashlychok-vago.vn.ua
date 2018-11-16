<?php
/**
 * @package Helix Framework
 * Template Name - Shaper Organic Life
 * @author JoomShaper http://www.joomshaper.com
 * @copyright Copyright (c) 2010 - 2014 JoomShaper
 * @license http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 or later
*/
//no direct accees
defined ('_JEXEC') or die ('resticted aceess');

if( $this->params->get('enable_comingsoon', 0) ) header("Location: ".$this->baseUrl."?tmpl=comingsoon"); 

?><!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"  lang="<?php echo $this->language; ?>"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"  lang="<?php echo $this->language; ?>"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"  lang="<?php echo $this->language; ?>"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="<?php echo $this->language; ?>"> <!--<![endif]-->
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <jdoc:include type="head" />
        <?php
            $this->helix->Header()
            ->addCSS('animate.min.css')
            ->addJS('wow.min.js, smoothscroll.js, main.js')
            ->setLessVariables(array(
                    'preset'=>$this->helix->Preset(),
                    'bg_color'=> $this->helix->PresetParam('_bg'),
                    'text_color'=> $this->helix->PresetParam('_text'),
                    'link_color'=> $this->helix->PresetParam('_link')
                ))
            ->addLess('master', 'template')
            ->addLess( 'presets',  'presets/'.$this->helix->Preset() );
        ?>
    </head>
    <body <?php echo $this->helix->bodyClass('bg hfeed clearfix'); ?>>
		<div class="body-innerwrapper">
        <?php
            $this->helix->layout();
            $this->helix->Footer();
        ?>
        <jdoc:include type="modules" name="debug" />
		</div>
    </body>
</html>