<div class="<?php echo $tile["css-class"] ?>" id="<?php echo $tile["id"] ?>" style="order: <?php echo $tile["order"] ?>">
	<div class="container">
		<div class="name"><?php echo $tile["name"] ?></div>

		<?php if (!empty($tile["image"])) { ?>
			<div class="image"><img src="/assets/tiles/<?php echo $tile["image"] ?>" alt="<?php echo $tile["image"] ?>"></div>
		<?php } ?>

		<div class="price"><span class="money" unit="€"><?php echo $tile["price"] ?></span></div>
	</div>
	
	<?php if ($tile["type"] == "street") { ?>
		<div class="color" color="<?php echo $tile["color"] ?>"></div>
	<?php } ?>
</div>