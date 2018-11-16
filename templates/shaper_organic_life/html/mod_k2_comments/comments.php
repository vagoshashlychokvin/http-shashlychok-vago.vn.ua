<?php
/**
 * @version		2.6.x
 * @package		K2
 * @author		JoomlaWorks http://www.joomlaworks.net
 * @copyright	Copyright (c) 2006 - 2014 JoomlaWorks Ltd. All rights reserved.
 * @license		GNU/GPL license: http://www.gnu.org/copyleft/gpl.html
 */

// no direct access
defined('_JEXEC') or die;

?>

<div id="k2ModuleBox<?php echo $module->id; ?>" class="k2LatestCommentsBlock<?php if($params->get('moduleclass_sfx')) echo ' '.$params->get('moduleclass_sfx'); ?>">

	<?php if(count($comments)){ ?>
	<?php foreach ($comments as $key=>$comment) { ?>
	<div class="media <?php echo ($key%2) ? "odd" : "even"; if(count($comments)==$key+1) echo ' lastItem'; ?>">
		<?php if($comment->userImage) { ?>
		<div class="pull-left">
			<a class="k2Avatar lcAvatar" href="<?php echo $comment->link; ?>" title="<?php echo K2HelperUtilities::cleanHtml($comment->commentText); ?>">
				<img src="<?php echo $comment->userImage; ?>" alt="<?php echo JFilterOutput::cleanText($comment->userName); ?>" style="width:<?php echo $lcAvatarWidth; ?>px;height:auto;" />
			</a>
		</div>
		<div class="media-body">
			<?php } ?>

			<?php if($params->get('itemCategory')) { ?>
			<span class="lcItemCategory"><a href="<?php echo $comment->catLink; ?>"><?php echo $comment->categoryname; ?></a></span>
			<?php } ?>

			<?php if($params->get('commenterName') || $params->get('commentDate')) { ?>
			<h4 class="lcUsername media-heading">
				<?php if($params->get('commenterName')) { ?>
				<?php if(isset($comment->userLink)) { ?>
				<a rel="author" href="<?php echo $comment->userLink; ?>"><?php echo $comment->userName; ?></a>
				<?php } else if ($comment->commentURL) { ?>
				<a target="_blank" rel="nofollow" href="<?php echo $comment->commentURL; ?>"><?php echo $comment->userName; ?></a>
				<?php } else { ?>
				<?php echo $comment->userName; ?>
				<?php } ?>
				<?php } ?>

				<?php if($params->get('commentDate')) { ?>
				<span class="lcCommentDate">
					<?php if($params->get('commentDateFormat') == 'relative') { ?>
					<?php echo $comment->commentDate; ?>
					<?php } else { ?>
					<?php echo JText::_('K2_ON'); ?> <?php echo JHTML::_('date', $comment->commentDate, JText::_('DATE_FORMAT_LC3')); ?>
					<?php } ?>
				</span>
				<?php } ?>
			</h4>
			<?php } ?>

			<?php if($params->get('commentLink')) { ?>
			<a href="<?php echo $comment->link; ?>"><span class="lcComment"><?php echo $comment->commentText; ?></span></a>
			<?php } else { ?>
			<span class="lcComment"><?php echo $comment->commentText; ?></span>
			<?php } ?>
			<div class="clr"></div>

			<?php if($params->get('itemTitle')) { ?>
			<span class="lcItemTitle"><a href="<?php echo $comment->itemLink; ?>"><?php echo $comment->title; ?></a></span>
			<?php } ?>			

			<?php if($comment->userImage) { ?>
		</div>
		<?php } ?>

	</div>
	<?php } ?>
	<?php } ?>

	<?php if($params->get('feed')) { ?>
	<div class="k2FeedIcon">
		<a href="<?php echo JRoute::_('index.php?option=com_k2&view=itemlist&format=feed&moduleID='.$module->id); ?>" title="<?php echo JText::_('K2_SUBSCRIBE_TO_THIS_RSS_FEED'); ?>">
			<span><?php echo JText::_('K2_SUBSCRIBE_TO_THIS_RSS_FEED'); ?></span>
		</a>
		<div class="clr"></div>
	</div>
	<?php } ?>

</div>
