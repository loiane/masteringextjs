<div id="sidebar" style="display:none;">
	<div id="categoriesCont">	
		<ul>
			<?php wp_list_cats('sort_column=name&optioncount=1&hierarchical=0'); ?>
		</ul>
	</div>
	<div id="archivesCont">
		<ul class="list-archives">
			<?php wp_get_archives('type=monthly'); ?>
		</ul>
	</div>
	<div id="tagsCont">
		<?php 
		  $args = array(
		    'smallest'  => 8,
		    'largest'  => 16
		   ); 
		   
		  wp_tag_cloud($args);
		?>
	</div>
	<div id="recentCont">
		<ul class="list-archives">
			<?php
				$args = array( 'numberposts' => '5' );
				$recent_posts = wp_get_recent_posts( $args );
				foreach( $recent_posts as $recent ){
					echo '<li><a href="' . get_permalink($recent["ID"]) . '" title="Look '.esc_attr($recent["post_title"]).'" >' .   $recent["post_title"].'</a> </li> ';
				}
			?>
		</ul>
	</div>
	<div id="booksCont">
		<center>
		<a style="text-decoration: none;" href="http://www.packtpub.com/mastering-ext-javascript/book" target="_blank"><img class="aligncenter size-full wp-image-2739" title="Mastering Ext JS by Loiane" src="http://www.loiane.com/wp-content/uploads/2013/03/4005OS_mockupcover_normal_0.jpg" alt="" width="180" height="223" /></a></center>
		<center>
		</br>
		<a style="text-decoration: none;" href="http://www.packtpub.com/ext-js-4-first-look/book" target="_blank"><img class="aligncenter size-full wp-image-2739" title="6662os_ExtJS4_book_loiane" src="http://www.loiane.com/wp-content/uploads/2011/07/6662os_ExtJS4_book_loiane.jpg" alt="" width="180" height="223" /></a></center>
	</div>
</div>