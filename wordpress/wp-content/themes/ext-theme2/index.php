<?php get_header(); ?>

<div id="main">
<div id="content">
  <div id="contentCont" style="display:none;"> 
<?php while ( have_posts() ) : the_post(); ?>

<div id='post' class="post">
	<div id="title" style="display:none;"><?php the_title(); ?></div>
	<div class="post-details">
		<div class="post-details-left">
		Posted on <strong><?php the_date(); ?></strong> by <span class="author"><?php the_author(); ?></span> under <span class="author"><?php the_category(', '); ?></span>
		</div>
		<div class="post-details-right">
		<?php edit_post_link('Edit', '<span class="comment-count">&nbsp;&nbsp;' , '</span>'); ?><span class="comment-count"><?php comments_popup_link('Leave a comment', '1 Comment', '% Comments'); ?></span>
		</div>
	</div>
	
	<?php if ( is_archive() || is_search() ) : // Only display excerpts for archives and search. ?>
			<?php the_excerpt(); ?>
	<?php else : ?>
			<?php the_content('Read More'); ?>
	<?php endif; ?>

</div><!-- post -->

<?php endwhile; ?>
</div>
</div>

</div>

<div id="delimiter"></div>

<?php get_footer(); ?>