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
		<button theme="green">Commencer le jeu</button>
	</div>

	<div class="info-game hidden">
		<h2>test</h2>
		<button theme="blue" onclick="monopoly.throwDice()">Lancez le dé</button>
		<button theme="green" disabled>Acheter pour </button>
		<div class="dice-wrapper">
			<div class="dice show-1">
				<div class="side one">
					<div class="dot one-1"></div>
				</div>
				<div class="side two">
					<div class="dot two-1"></div>
					<div class="dot two-2"></div>
				</div>
				<div class="side three">
					<div class="dot three-1"></div>
					<div class="dot three-2"></div>
					<div class="dot three-3"></div>
				</div>
				<div class="side four">
					<div class="dot four-1"></div>
					<div class="dot four-2"></div>
					<div class="dot four-3"></div>
					<div class="dot four-4"></div>
				</div>
				<div class="side five">
					<div class="dot five-1"></div>
					<div class="dot five-2"></div>
					<div class="dot five-3"></div>
					<div class="dot five-4"></div>
					<div class="dot five-5"></div>
				</div>
				<div class="side six">
					<div class="dot six-1"></div>
					<div class="dot six-2"></div>
					<div class="dot six-3"></div>
					<div class="dot six-4"></div>
					<div class="dot six-5"></div>
					<div class="dot six-6"></div>
				</div>
			</div>
	</div>
	</div>
</aside>