

var monopoly = {
	valid_tokens				: [
		{name: "Botte", path: "/assets/pawns/boot.png"},
		{name: "Voiture", path: "/assets/pawns/car.png"},
		{name: "Chapeau", path: "/assets/pawns/hat.png"},
		{name: "Fer à repasser", path: "/assets/pawns/iron.png"},
		{name: "Navire", path: "/assets/pawns/ship.png"},
		{name: "Dé à coudre", path: "/assets/pawns/thimble.png"},
	],
	players:					[
		{name: "Premier Joueur"},
		{name: "Deuxième Joueur"},
		{name: "Troisième Joueur"},
		{name: "Quatrième Joueur"},
	]
};





function onPageLoad() {

	let divs_player_selectors = document.querySelectorAll(".player-selection .player");

	divs_player_selectors.forEach(div_player => {
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
		
		let spans_nav = div_player.querySelectorAll(".nav span");
		spans_nav.forEach(span_nav => {
			span_nav.addEventListener("click", function() {
				let current_token_id = parseInt(div_avatar.getAttribute("token-id"));
				current_token_id = (current_token_id + (this.getAttribute("direction") == "next" ? 1 : monopoly.valid_tokens.length - 1)) % monopoly.valid_tokens.length;
				img_elem.setAttribute("src", monopoly.valid_tokens[current_token_id].path);
				img_elem.setAttribute("alt", monopoly.valid_tokens[current_token_id].name);
				token_label.textContent = monopoly.valid_tokens[current_token_id].name;
				
				div_avatar.setAttribute("token-id", current_token_id);
			});
		});

	});
		

	// Get default player settings
	monopoly.getPlayerStats(1000, function(data) {
		console.log(data);
	});

	$(".start-game button").on("click", function() {
		$(".game-welcome").toggleDisplay(false, ["opacity", "height", "padding"]);
		$(".player-selection").toggleDisplay(false, ["opacity", "height", "padding"]);
		$(".start-game").toggleDisplay(false, ["opacity", "height", "padding"]);
		
		$(".info-game").toggleDisplay(true, ["opacity", "height", "padding"]);
	});
}
window.addEventListener("load", onPageLoad);



monopoly.getPlayerStats = function(player_id, callback) {
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
