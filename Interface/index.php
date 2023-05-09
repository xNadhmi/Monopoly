
<?php
	include_once("../includes/init.php");
?>

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="css/style.css">
	<title>Monopoly</title>

	<!-- JQUERY -->
	<script type="text/javascript" src="/js/jquery/jquery-3.6.3.min.js"></script>

	<!-- Common JS -->
	<script type="text/javascript" src="/js/main.js"></script>
	
</head>

<body>
	<?php include "../includes/ui-dashboard.php"; ?>
	<main class="board-wrapper">
		<div class="board">
			<div class="preloader">Chargement du plateau</div>
			<div class="tile center">
				<div class="logo">
					<div class="text">Monopoly</div>
				</div>
				<div class="deck community">
					<h3>Caisse de Communauté</h3>
					<div class="outline"></div>
				</div>
				<div class="deck chance">
					<h3>Chance</h3>
					<div class="outline"></div>
				</div>
				<div class="version">
					<div class="text">édition</div>
					<img src="/assets/hetic_logo.png" alt="version">
					<div class="text">HETIC</div>
				</div>
			</div>
			<!-- <?php
				$tiles = dbGetTiles();
				
				foreach ($tiles as $tile) {
					include "../includes/ui-tile.php";
				}
			?> -->
		</div>
	</main>

	<main class="board-wrapper" style="display: none">
		<div class="board">
			<div class="tile center">
				<div class="logo">
					<div class="text">
						Monopoly
					</div>
				</div>
				<div class="deck community">
					<h2>Caisse de Communauté</h2>
					<div class="outline"></div>
				</div>
				<div class="deck chance">
					<h2>Chance</h2>
					<div class="outline"></div>
				</div>
			</div>
			<div class="tile corner tl">
				<div class="container">
					<h3>Parc</h3>
					<img src="assets/parking.png" alt="in jail">
					<h3>Gratuit</h3>
				</div>
			</div>
			<div class="tile corner tr">
				<div class="container">
					<h3>Allez En</h3>
					<img src="assets/go_to_jail.png" alt="in jail">
					<h3>Prison</h3>
				</div>
			</div>
			<div class="tile corner bl">
				<div class="container">
					<div class="inside">
						<div class="inner">
							<h3>En</h3>
							<img src="assets/in_jail.png" alt="in jail">
							<h3>Prison</h3>
						</div>
					</div>
					<div class="outside">
						<h3>Simple</h3>
						<h3>Visite</h3>
					</div>
				</div>
			</div>
			<div class="tile corner br">
				<div class="container">
					<h2>Départ</h2>
					<h3>Recevez €200 chaque fois que vous passez ici.</h3>
				</div>
				<img src="assets/go_arrow.png">
			</div>
			<div class="tile top">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<div class="color" color="red"></div>
			</div>
			<div class="tile top">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<!-- <div class="color" color="green"></div> -->
			</div>
			<div class="tile top">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<div class="color" color="red"></div>
			</div>
			<div class="tile top">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<div class="color" color="red"></div>
			</div>
			<div class="tile top">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<!-- <div class="color" color="green"></div> -->
			</div>
			<div class="tile top">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<div class="color" color="yellow"></div>
			</div>
			<div class="tile top">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<div class="color" color="yellow"></div>
			</div>
			<div class="tile top">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<!-- <div class="color" color="green"></div> -->
			</div>
			<div class="tile top">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<div class="color" color="yellow"></div>
			</div>
			<div class="tile left">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<div class="color" color="orange"></div>
			</div>
			<div class="tile right">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<div class="color" color="green"></div>
			</div>
			<div class="tile left">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<div class="color" color="orange"></div>
			</div>
			<div class="tile right">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<div class="color" color="green"></div>
			</div>
			<div class="tile left">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<!-- <div class="color" color="green"></div> -->
			</div>
			<div class="tile right">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<!-- <div class="color" color="green"></div> -->
			</div>
			<div class="tile left">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<div class="color" color="orange"></div>
			</div>
			<div class="tile right">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<div class="color" color="green"></div>
			</div>
			<div class="tile left">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<!-- <div class="color" color="green"></div> -->
			</div>
			<div class="tile right">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<!-- <div class="color" color="green"></div> -->
			</div>
			<div class="tile left">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<div class="color" color="violet"></div>
			</div>
			<div class="tile right">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<!-- <div class="color" color="green"></div> -->
			</div>
			<div class="tile left">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<div class="color" color="violet"></div>
			</div>
			<div class="tile right">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<div class="color" color="blue"></div>
			</div>
			<div class="tile left">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<!-- <div class="color" color="green"></div> -->
			</div>
			<div class="tile right">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<!-- <div class="color" color="green"></div> -->
			</div>
			<div class="tile left">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<div class="color" color="violet"></div>
			</div>
			<div class="tile right">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<div class="color" color="blue"></div>
			</div>
			<div class="tile bottom">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<div class="color" color="light-blue"></div>
			</div>
			<div class="tile bottom">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<div class="color" color="light-blue"></div>
			</div>
			<div class="tile bottom">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<!-- <div class="color" color="green"></div> -->
			</div>
			<div class="tile bottom">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<div class="color" color="light-blue"></div>
			</div>
			<div class="tile bottom">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<!-- <div class="color" color="green"></div> -->
			</div>
			<div class="tile bottom">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<!-- <div class="color" color="green"></div> -->
			</div>
			<div class="tile bottom">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<div class="color" color="brown"></div>
			</div>
			<div class="tile bottom">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<!-- <div class="color" color="green"></div> -->
			</div>
			<div class="tile bottom">
				<div class="container">
					<div class="name">Name</div>
					<div class="price">Price €</div>
				</div>
				<div class="color" color="brown"></div>
			</div>
		</div>
	</main>
</body>

</html>