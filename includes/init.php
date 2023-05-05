
<?php
	// Connect to database
	$hostname		= "localhost";
	$dbname			= "monopoly";
	$username		= "root";
	$password		= "";

	try {		
		// Create a PDO connection
		$pdo = new PDO("mysql:host = $hostname;dbname=$dbname", $username, $password,
			array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING, PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4")
		);

	} catch(PDOException $e) {
		// If the connection failed, print an error message
		echo "Connection failed: " . $e->getMessage();
	}

	// Start a session
	session_start();
?>

<?php
	// USERFUL FUNCTIONS
	
	function dbGetTiles() {
		global $pdo;
		
		$query = "SELECT * FROM tiles ORDER BY id ASC";
		$stmt = $pdo->prepare($query);
		$stmt->execute();

		$tiles = $stmt->fetchAll(PDO::FETCH_ASSOC);
		
		$colors = [
			"brown", "brown", "light-blue", "light-blue", "light-blue", "purple", "purple", "purple", "orange", "orange", "orange",
			"red", "red", "red", "yellow", "yellow", "yellow", "green", "green", "green", "blue", "blue"
		];
		$color_index = 0;

		foreach ($tiles as &$tile) {
			$tile["corner"]				= (($tile["id"] - 1) % 10 == 0);
			$tile["css-class"]			= "tile";

			if ($tile["type"] == "street") {
				$tile["color"] = $colors[$color_index];
				$color_index += 1;
			}
			
			if ($tile["id"] < 11) {
				$tile["css-class"] .= " " . "bottom";
				$tile["order"] = 40 - $tile["id"] + 1;

			} elseif ($tile["id"] < 21) {
				$tile["css-class"] .= " " . "left";
				$tile["order"] = 28 - 2 * ($tile["id"] - 12);

			} elseif ($tile["id"] < 32) {
				$tile["css-class"] .= " " . "top";
				$tile["order"] = $tile["id"] - 21;

			} else {
				$tile["css-class"] .= " " . "right";
				$tile["order"] = 12 + 2 * ($tile["id"] - 32);
			}
		}

		return $tiles;
	}
?>