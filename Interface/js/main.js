

var monopoly = {
	valid_tokens:				[
		{name: "Botte", path: "/assets/pawns/boot.png"},
		{name: "Voiture", path: "/assets/pawns/car.png"},
		{name: "Chapeau", path: "/assets/pawns/hat.png"},
		{name: "Fer à repasser", path: "/assets/pawns/iron.png"},
		{name: "Navire", path: "/assets/pawns/ship.png"},
		{name: "Dé à coudre", path: "/assets/pawns/thimble.png"},
	],
	players:					[
		{name: "Premier Joueur", money: 0, token: {}, spactating: false},
		{name: "Deuxième Joueur", money: 0, token: {}, spactating: false},
		{name: "Troisième Joueur", money: 0, token: {}, spactating: true},
		{name: "Quatrième Joueur", money: 0, token: {}, spactating: true},
	],
	tiles:						[],
};





function onPageLoad() {

	let divs_player_selectors = document.querySelectorAll(".player-selection .player");

	divs_player_selectors.forEach(div_player => {
		let player_id = parseInt(div_player.getAttribute("id")) - 1;
		let div_add_player = div_player.querySelector(".add");
		let div_remove_player = div_player.querySelector(".remove");

		if (div_add_player) {
			div_add_player.querySelector("span").addEventListener("click", function() {
				div_player.setAttribute("spectating", "false");
				$(div_add_player).toggleDisplay(false, ["opacity", "height"]);
				
				if (div_remove_player) {toggleClass(div_remove_player, "hidden", false)}
			});
		}
		if (div_remove_player) {
			div_remove_player.addEventListener("click", function() {
				div_player.setAttribute("spectating", "true");
				if (div_add_player) {$(div_add_player).toggleDisplay(true, ["opacity", "height"])}
				
				toggleClass(div_remove_player, "hidden", true);
			});
		}

		let div_avatar = div_player.querySelector(".avatar");
		let img_elem = div_avatar.querySelector("img");
		let token_label = div_avatar.querySelector("h4");
		let token_id = parseInt(div_avatar.getAttribute("token-id"));
		img_elem.setAttribute("src", monopoly.valid_tokens[token_id].path);
		img_elem.setAttribute("alt", monopoly.valid_tokens[token_id].name);
		token_label.textContent = monopoly.valid_tokens[token_id].name;
		monopoly.players[player_id].token = monopoly.valid_tokens[token_id];
		
		let spans_nav = div_player.querySelectorAll(".nav span");
		spans_nav.forEach(span_nav => {
			span_nav.addEventListener("click", function() {
				let current_token_id = parseInt(div_avatar.getAttribute("token-id"));
				current_token_id = (current_token_id + (this.getAttribute("direction") == "next" ? 1 : monopoly.valid_tokens.length - 1)) % monopoly.valid_tokens.length;
				img_elem.setAttribute("src", monopoly.valid_tokens[current_token_id].path);
				img_elem.setAttribute("alt", monopoly.valid_tokens[current_token_id].name);
				token_label.textContent = monopoly.valid_tokens[current_token_id].name;
				
				div_avatar.setAttribute("token-id", current_token_id);
				monopoly.players[player_id].token = monopoly.valid_tokens[current_token_id];
			});
		});

	});
	

	// Get default player settings
	monopoly.dbGetPlayerStats(1000, function(data) {
		monopoly.players.forEach(player => {
			player.money = data.money;
		});
	});
	

	// Get database tiles
	monopoly.dbGetTiles(function(data) {
		monopoly.tiles = data;

		let div_board = document.querySelector(".board-wrapper .board");

		monopoly.tiles.forEach((tile, index, array) => {
			setTimeout(() => {
				tile.test = true;
				$.ajax({
					type:			"POST",
					url:			"/actions/get-tile-html.php",
					data:			{"tile": tile},
					// dataType:		"json",
					// processData:	false,
					// contentType:	false,
					success: function(data) {
						let div_tile = createElementFromHTML(data);
						div_board.append(div_tile);

						tile.elem = div_tile;
						if (index === array.length - 1) {
							let div_preloader = document.querySelector(".board-wrapper .board .preloader");
							setTimeout(() => {
								$(div_preloader).toggleDisplay(false, ["opacity"]);
								toggleClass(div_board, "loaded", true);
							}, 1000);
						}
					},
					error: function(xhr, status, error) {
						console.log(error);
					}
				});
			}, 20 * index);
		});
	});

	$(".start-game button").on("click", function() {
		// Start the game
		monopoly.startGame();
	});
}
window.addEventListener("load", onPageLoad);




monopoly.startGame = function() {
	// Hide components
	$(".game-welcome").toggleDisplay(false, ["opacity", "height", "padding"]);
	$(".player-selection").toggleDisplay(false, ["opacity", "height", "padding"]);
	$(".start-game").toggleDisplay(false, ["opacity", "height", "padding"]);

	// Show components
	$(".info-game").toggleDisplay(true, ["opacity", "height", "padding"]);

	// Set up data
	document.querySelectorAll(".player-selection .player").forEach(div_player => {
		let is_spectating = div_player.getAttribute("spectating") == "true";

		if (!is_spectating) {
			let player_id = parseInt(div_player.getAttribute("id")) - 1;
			monopoly.players[player_id].spactating = false;
			
			let player_name = div_player.querySelector("input").value;
			if (player_name.trim() !== "") {
				monopoly.players[player_id].name = player_name;
			}
			$.ajax({
				type:			"POST",
				url:			"/actions/get-player-card.php",
				data:			{"player": monopoly.players[player_id]},
				// dataType:		"json",
				// processData:	false,
				// contentType:	false,
				success: function(data) {
					let elem_aside = document.querySelector("aside");
					
					let div_player_card = createElementFromHTML(data);
					elem_aside.append(div_player_card);
				},
				error: function(xhr, status, error) {
					console.log(error);
				}
			});
		}
	});
}

monopoly.dbGetPlayerStats = function(player_id, callback) {
	player_id = parseInt(player_id);
	if (!isNaN(player_id)) {
		$.ajax({
			type:			"POST",
			url:			"/actions/get-player-stats.php",
			data:			{"player-id": player_id},
			dataType:		"json",
			// processData:	false,
			// contentType:	false,
			success: function(data) {
				if (callback) callback(data);
			},
			error: function(xhr, status, error) {
				console.log(error);
			}
		});
	} else {
		console.log("Ajax: player_id is not a valid int");
	}
}

monopoly.dbGetTiles = function(callback) {
	$.ajax({
		type:			"POST",
		url:			"/actions/get-tiles.php",
		// data:			{"player-id": player_id},
		dataType:		"json",
		// processData:	false,
		// contentType:	false,
		success: function(data) {
			if (callback) callback(data);
		},
		error: function(xhr, status, error) {
			console.log(error);
		}
	});
}

monopoly.throwDice = function() {
	let dice_result			= Math.floor((Math.random() * 6) + 1);
	let div_dice			= document.querySelector(".dice-wrapper .dice");
   
	console.log(dice_result);
  
	for (var i = 1; i <= 6; i++) {
		div_dice.classList.remove("show-" + i);
		if (dice_result === i) {
			div_dice.classList.add("show-" + i);
		}
	}
	// setTimeout(rollDice(), 1000);
}











function createElementFromHTML(htmlString) {
	var div = document.createElement("div");
	div.innerHTML = htmlString.trim();
	return div.firstChild;
}

function toggleClass(element, className, state) {
	if (state != undefined) {
		if (state) element.classList.add(className);
		else element.classList.remove(className);
	}
	else {
		if (element.classList.contains(className)) element.classList.remove(className);
		else element.classList.add(className);
	}
}

(function($) {
	$.fn.toggleDisplay = function(state, propertiesToAnimate = ["opacity"]) {
		let animationProperties = {};
		let action = (state === undefined) ? "toggle" : (state ? "show" : "hide");

		propertiesToAnimate.forEach(property => {
			animationProperties[property] = action;
		});

		return this.animate(animationProperties, 300);
	};
})(jQuery);
