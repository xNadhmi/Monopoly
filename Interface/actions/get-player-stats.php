<?php
	include_once "../../includes/init.php";

	
	if (isset($_POST["player-id"])) {
		$player_id = intval($_POST["player-id"]);

		$player = dbGetPlayerStats($player_id);

		echo json_encode($player);
	}
?>