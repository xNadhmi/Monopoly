<?php
	include_once "../../includes/init.php";

	
	if (isset($_POST["player"])) {
		$player = $_POST["player"];
		include "../../includes/ui-player-card.php";
	}
?>