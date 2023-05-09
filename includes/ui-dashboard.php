<aside>
	<div class="game-welcome">
		<h1>Bienvenue à Monopoly</h1>
		<h3>Commencez en spécifiant les joueurs</h3>
	</div>
	<div class="player-selection">
		<div class="player" spectating="false" id="1">
			<h4>Premier Joueur</h4>
			<div class="avatar" token-id="0">
				<img class="token" src="" alt="token">
				<h4>token</h4>
				<div class="nav">
					<span direction="previous"><</span>
					<span direction="next">></span>
				</div>
			</div>
			<div class="name">
				<input type="text" name="player-1" id="player-1" placeholder="Nom" theme="light">
			</div>
		</div>
		
		<div class="player" spectating="false" id="2">
			<h4>Deuxième Joueur</h4>
			<div class="avatar" token-id="1">
				<img class="token" src="" alt="token">
				<h4>token</h4>
				<div class="nav">
					<span direction="previous"><</span>
					<span direction="next">></span>
				</div>
			</div>
			<div class="name">
				<input type="text" name="player-name" id="player-name" placeholder="Nom" theme="light">
			</div>
		</div>
		
		<div class="player" spectating="true" id="3">
			<h4>Troisième Joueur</h4>
			<div class="add"><span>+</span></div>
			<div class="remove hidden">-</div>
			<div class="avatar" token-id="2">
				<img class="token" src="" alt="token">
				<h4>token</h4>
				<div class="nav">
					<span direction="previous"><</span>
					<span direction="next">></span>
				</div>
			</div>
			<div class="name">
				<input type="text" name="player-name" id="player-name" placeholder="Nom" theme="light">
			</div>
		</div>
		
		<div class="player" spectating="true" id="4">
			<h4>Quatrième Joueur</h4>
			<div class="add"><span>+</span></div>
			<div class="remove hidden">-</div>
			<div class="avatar" token-id="3">
				<img class="token" src="" alt="token">
				<h4>token</h4>
				<div class="nav">
					<span direction="previous"><</span>
					<span direction="next">></span>
				</div>
			</div>
			<div class="name">
				<input type="text" name="player-name" id="player-name" placeholder="Nom" theme="light">
			</div>
		</div>
	</div>
	<div class="start-game">
		<button theme="green" disabled>Commencer le jeu</button>
	</div>

	<div class="info-game">
		<div class="active-player">
			<h2>Tour de: <span class="active-name">player</span></h2>
		</div>
		<div class="dice-throw">
			<button theme="blue" onclick="monopoly.throwDice()">Lancez le dé</button>
			<?php include "../includes/ui-dice.php" ?>
		</div>
		<div class="active-tile">
			<div class="text">Case actuelle: <span class="tile-name">null</span></div>
		<button theme="green" disabled>Acheter</button>
		</div>
	</div>
</aside>