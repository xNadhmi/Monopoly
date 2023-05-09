<?php
	$onclick = "";
	if ($tile["type"] == "street" || $tile["type"] == "utility") {
		$onclick = "onclick='monopoly.showTileCard($tile[id])'";
	}
?>

<div class="<?php echo $tile["css-class"] ?>" id="<?php echo $tile["id"] ?>" style="order: <?php echo $tile["order"] ?>" <?php echo $onclick ?>>
	<?php if ($tile["type"] == "go") { ?>
		<div class="container">
			<h2><?php echo $tile["name"] ?></h2>
			<h3><?php echo $tile["description"] ?></h3>
		</div>
		<img src="assets/go_arrow.png">

	<?php } elseif ($tile["type"] == "in_jail") { ?>
		<div class="container">
			<div class="inside">
				<div class="inner">
					<h3><?php echo explode(" ", $tile["name"])[0] ?></h3>
					<img src="assets/in_jail.png" alt="in jail">
					<h3><?php echo explode(" ", $tile["name"])[1] ?></h3>
				</div>
			</div>
			<div class="outside">
				<h3><?php echo explode(" ", $tile["description"])[0] ?></h3>
				<h3><?php echo explode(" ", $tile["description"])[1] ?></h3>
			</div>
		</div>

	<?php } elseif ($tile["type"] == "free") { ?>
		<div class="container">
			<h3><?php echo explode(" ", $tile["name"])[0] ?></h3>
			<img src="assets/parking.png" alt="in jail">
			<h3><?php echo explode(" ", $tile["name"])[1] ?></h3>
		</div>

	<?php } elseif ($tile["type"] == "go_jail") { ?>
		<div class="container">
			<h3><?php echo explode(" ", $tile["name"])[0] . " " . explode(" ", $tile["name"])[1] ?></h3>
			<img src="assets/go_to_jail.png" alt="in jail">
			<h3><?php echo explode(" ", $tile["name"])[2] ?></h3>
		</div>

	<?php } else { ?>
		<div class="container">
			<div class="name"><?php echo $tile["name"] ?></div>

			<?php if (!empty($tile["image"])) { ?>
				<div class="image"><img src="/assets/tiles/<?php echo $tile["image"] ?>" alt="<?php echo $tile["image"] ?>"></div>
			<?php } ?>

			<?php if (!empty($tile["type"])) { ?>
				<div class="description"><?php echo $tile["description"] ?></div>
			<?php } ?>


			<?php if ($tile["price"] > 0) { ?>
				<div class="price"><span class="money" unit="€"><?php echo $tile["price"] ?></span></div>
			<?php } ?>
		</div>

		<?php if ($tile["type"] == "street") { ?>
			<div class="color" color="<?php echo $tile["color"] ?>"></div>
		<?php } ?>
	<?php } ?>
</div>