<?php
	include_once "../../includes/init.php";

	
	$tiles = dbGetTiles();

	echo json_encode($tiles);
?>