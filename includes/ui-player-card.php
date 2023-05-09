<div class="player-card" player-id="<?php echo $player["id"] ?>">
	<div class="identity">
		<div class="avatar"><img class="token" src="<?php echo $player["avatar"]["path"] ?>" alt="<?php echo $player["avatar"]["name"] ?>"></div>
		<div class="name"><h3><?php echo $player["name"] ?></h3></div>
	</div>
	<div class="money">
		<h2>Monnaie</h2>
		<h2>€<?php echo $player["money"] ?></h2>
	</div>
</div>