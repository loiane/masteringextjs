<?php get_header(); ?>

<?php /* If there are no posts to display, such as an empty archive page */ ?>
<?php if ( ! have_posts() ) : ?>
		<h1>Not Found</h1>
			<p>Apologies, but no results were found for the requested archive. Perhaps searching will help find a related post</p>
<?php endif; ?>
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
</div>
<div class="spacer"></div>

<?php comments_template( '', true ); ?>

<?php endwhile; ?>

<div class="spacer"></div>
<?php get_footer(); ?>