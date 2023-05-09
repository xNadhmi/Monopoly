<?php
	include_once "../../includes/init.php";

	
	if (isset($_POST["tile"])) {
		$tile = $_POST["tile"];
		include "../../includes/ui-tile.php";
	}
?>