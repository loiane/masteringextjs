<html>
<head>
<title><?php bloginfo('name'); ?> <?php wp_title(); ?></title>  
<link rel="stylesheet" href="<?php bloginfo('stylesheet_directory'); ?>/extjs/resources/css/ext-all.css" type="text/css"/> 
<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>"/>
<script src="<?php bloginfo('stylesheet_directory'); ?>/extjs/ext-all.js"></script>
<script src="<?php bloginfo('stylesheet_directory'); ?>/app.js"></script>
</head>
<body>
	<div id="headerCont" style="display:none;">	
		<div id="top-bar-tile">
		<div id="top-bar-content">
			<h1><a href="<?php bloginfo('url'); ?>"><?php bloginfo('name'); ?></a></h1>
			<span class="slogan"><?php bloginfo('description'); ?></span>
			<div id="search-box">
				<form method="get" id="searchform" action="" > 
					<input type="text" value="Search..." 
					onfocus="if(this.value == this.defaultValue) this.value = ''" 
					name="s" id="s" /> 
				</form>
			</div><!-- search-box -->
		</div><!-- top-bar-content -->
		</div><!-- top-bar-tile -->
		<div id="links" style="display:none;">
			 <?php wp_nav_menu(array( 
			 'menu' => 'mainnav', 
			 'menu_class' => 'nav-bar-content', 
			 'menu_id' => 'navigation', 
			 'container' => false, 
			 'theme_location' => 'primary-menu', 
			 'show_home' => '1')); ?>
		</div><!-- links -->
	</div><!-- headerCont -->