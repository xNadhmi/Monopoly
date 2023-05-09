

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
		{id: 0, name: "Premier Joueur", money: 0, avatar: {}, tile: 1, spectating: false},
		{id: 1, name: "Deuxième Joueur", money: 0, avatar: {}, tile: 1, spectating: false},
		{id: 2, name: "Troisième Joueur", money: 0, avatar: {}, tile: 1, spectating: true},
		{id: 3, name: "Quatrième Joueur", money: 0, avatar: {}, tile: 1, spectating: true},
	],
	tiles:						[],
	player_count:				0,				// How many players are playing
	current_player:				0,				// Index of the current active player
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
		monopoly.players[player_id].avatar = monopoly.valid_tokens[token_id];
		
		let spans_nav = div_player.querySelectorAll(".nav span");
		spans_nav.forEach(span_nav => {
			span_nav.addEventListener("click", function() {
				let current_token_id = parseInt(div_avatar.getAttribute("token-id"));
				current_token_id = (current_token_id + (this.getAttribute("direction") == "next" ? 1 : monopoly.valid_tokens.length - 1)) % monopoly.valid_tokens.length;
				img_elem.setAttribute("src", monopoly.valid_tokens[current_token_id].path);
				img_elem.setAttribute("alt", monopoly.valid_tokens[current_token_id].name);
				token_label.textContent = monopoly.valid_tokens[current_token_id].name;
				
				div_avatar.setAttribute("token-id", current_token_id);
				monopoly.players[player_id].avatar = monopoly.valid_tokens[current_token_id];
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
								document.querySelector(".start-game button").removeAttribute("disabled");
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

	// Hidden by default:
	$(".info-game").toggleDisplay(false);
}
window.addEventListener("load", onPageLoad);




monopoly.startGame = function() {
	let div_board = document.querySelector(".board-wrapper .board");
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
			monopoly.players[player_id].spectating = false;
			
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

			monopoly.player_count++;
		}
	});
	
	monopoly.players.forEach(player => {
		if (!player.spectating) {
			monopoly.placeToken(player);
		}
	});

	
	let span_current_name = document.querySelector(".info-game .active-player span.active-name");
	span_current_name.textContent = monopoly.players[monopoly.current_player].name + " (#" + (monopoly.current_player + 1) + ")";
	document.querySelector("aside").setAttribute("current-player", monopoly.current_player);
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
	let player = monopoly.players[monopoly.current_player];
	let dice_result = monopoly.randomizeDice();
	let target_tile_id = (player.tile + dice_result - 1) % monopoly.tiles.length;
	console.log(target_tile_id);
	let target_tile = monopoly.tiles[target_tile_id];

	setTimeout(() => {
		monopoly.moveToken(player, target_tile);
		setTimeout(() => {
			monopoly.setNextPlayer();
		}, 1000);
	}, 500);
}

monopoly.randomizeDice = function() {
	let dice_result			= Math.floor((Math.random() * 6) + 1);
	let div_dice			= document.querySelector(".dice-wrapper .dice");
  
	for (var i = 1; i <= 6; i++) {
		div_dice.classList.remove("show-" + i);
		if (dice_result === i) {
			div_dice.classList.add("show-" + i);
		}
	}

	return dice_result;
}

monopoly.setNextPlayer = function() {
	monopoly.current_player = (monopoly.current_player + 1) % monopoly.players.length;
	if (monopoly.players[monopoly.current_player].spectating) {monopoly.setNextPlayer();}
	else {
		let span_current_name = document.querySelector(".info-game .active-player span.active-name");
		span_current_name.textContent = monopoly.players[monopoly.current_player].name + " (#" + (monopoly.current_player + 1) + ")";

		document.querySelector("aside").setAttribute("current-player", monopoly.current_player);
	}
}


monopoly.placeToken = function(player) {
	let div_board = document.querySelector(".board-wrapper .board");
	let tile = monopoly.tiles[player.tile - 1];

	let div_player = document.createElement("div");
	div_player.setAttribute("class", "player");
	div_player.setAttribute("player-id", player.id);
	div_player.setAttribute("tie-id", player.tile);
	div_player.innerHTML = `
		<img class="token" src="${player.avatar.path}" alt="${player.avatar.name}">
	`;

	player.token = div_player;
	div_board.append(div_player);

	monopoly.moveToken(player, tile)
}

monopoly.moveToken = function(player, tile) {
	let offset_top = tile.elem.offsetTop + tile.elem.offsetHeight * (player.id / monopoly.player_count);
	let offset_left = tile.elem.offsetLeft + tile.elem.offsetWidth * 0.1;
	$(player.token).animateMove(offset_top, offset_left, 750);

	player.tile = tile.id;
	
	setTimeout(() => {
		player.token.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
	}, 750);
	
}

monopoly.showTileCard = function(tile_id) {
	let tile = monopoly.tiles[tile_id-1];
	if (!tile.cardElem) {

		let colorDiv = "";
		if (tile.color) {
			colorDiv = `<div class="color" color="${tile.color}"></div>`;
		}

		let html_code = `
			<div class="tile-card">
				${colorDiv}
				<div class="row"><h1 style="width:100%">${tile.name}</h1></div>
				<div class="row">
					<h2>Pourcentage du loyer</h2>
					<h2>%${tile.rent_percentage}</h2>
				</div>
				<div class="row">
					<h2>Valeur de revente</h2>
					<h2>-%${tile.bank_sale}</h2>
				</div>
				<div class="row"><h2>€${tile.price}</h2></div>
			</div>
		`;

		tile.cardElem = createElementFromHTML(html_code);
		$(tile.cardElem).toggleDisplay(false, ["opacity", "width", "height"], 10);
		document.body.append(tile.cardElem);

		tile.cardElem.addEventListener("click", function() {
			$(this).toggleDisplay(false, ["opacity", "width", "height"]);
		});
	}
	$(tile.cardElem).toggleDisplay(true, ["opacity", "width", "height"]);
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
	$.fn.toggleDisplay = function(state, propertiesToAnimate = ["opacity"], speed = 300) {
		let animationProperties = {};
		let action = (state === undefined) ? "toggle" : (state ? "show" : "hide");

		propertiesToAnimate.forEach(property => {animationProperties[property] = action;});

		return this.animate(animationProperties, speed);
	};
})(jQuery);

(function($) {
    $.fn.animateMove = function(newTop, newLeft, speed = 300) {
        let elem = this;
        let startPos = { top: parseFloat(elem.css("top")), left: parseFloat(elem.css("left")) };
        let distance = { top: newTop - startPos.top, left: newLeft - startPos.left };
        let startTime = null;

        function step(now) {
            if (!startTime) {
                startTime = now;
            }

            let progress = now - startTime;
            let percent = Math.min(progress / speed, 1);
            let easedPercent = easeInOutQuad(percent);
            let newTopPos = startPos.top + distance.top * easedPercent;
            let newLeftPos = startPos.left + distance.left * easedPercent;

            elem.css({ top: newTopPos + "px", left: newLeftPos + "px" });

            if (percent < 1) {
                window.requestAnimationFrame(step);
            }
        }

        window.requestAnimationFrame(step);

        function easeInOutQuad(x) {
            return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
        }

        return this;
    };
})(jQuery);

