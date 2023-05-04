<div class="<?php echo $tile["css-class"] ?>" style="order: <?php echo 40 - $tile["id"] ?>">
	<div class="container">
		<div class="name"><?php echo $tile["name"] ?></div>
		<div class="price">Price €</div>
	</div>
	
	<?php if ($tile["type"] == "street") { ?>
		<div class="color" color="red"></div>
	<?php } ?>
</div>