
document.addEventListener('DOMContentLoaded', function() {
	
	const div_with_canvas = document.getElementById("div_with_canvas");
	const div_score = document.getElementById("score");
	const canvas = document.getElementById("canvas");
	const context = canvas.getContext("2d");
	
	let which_key_pressed;
	let score = 0;
	
	const snake_width = 10;
	const snake_height = 10;
	const snake = [ [40, 20, snake_width, snake_height], [30, 20, snake_width, snake_height], [20, 20, snake_width, snake_height]  ]
	
	
		
	function check_key() { 
		document.addEventListener("keydown", function(e) {
			which_key_pressed = e.key;
		})
	}
	
	function set_direction() {
		let direction = "right";
		if (which_key_pressed == "ArrowRight") {
			direction = "right";
		}
		if (which_key_pressed == "ArrowLeft") {
			direction = "left";
		}
		if (which_key_pressed == "ArrowUp") {
			direction = "up";
		}
		if (which_key_pressed == "ArrowDown") {
			direction = "down";
		}
		
		return direction;
	}
		
	
	function draw_snake() {
		let stepX = 0;
		let stepY = 0;
		context.clearRect(0, 0, canvas.width, canvas.height);
		
		draw_food(food_x, food_y);
		
		//for (i=0; i < snake.length; i++) { 
		//snake goes to right
		if (set_direction() == "right") { 
			stepX = 10;
		}
		//snake goes to left
		if (set_direction() == "left") { 
			stepX = -10;
		}
		//snake goes up
		if (set_direction() == "up") { 
			stepY = -10;
		}
		//snake goes down
		if (set_direction() == "down") { 
			stepY = 10;
		}
		snake.unshift([snake[0][0]+stepX, snake[0][1]+stepY, snake_width, snake_height])
		if (food_x !== snake[0][0] || food_y !== snake[0][1] ) {
			snake.pop(snake[snake.length-1]);
		}
		eat_food();
		for (i=0; i < snake.length; i++) { 
			context.fillStyle = "green";
			context.fillRect(snake[i][0], snake[i][1], snake[i][2], snake[i][3]);
		}
	}
	
	function random_coordinates_for_food() {
		const canvas_width_minus_snake = []
		const canvas_height_minus_snake = []
		for (i=0; i < canvas.width; i++) {
			// every number of canvas width are division in 10. If some of them has no modulo rest, put it in the array
			if ( i % 10 === 0) {
				canvas_width_minus_snake.push(i);
			}
		}
		for (i=0; i < canvas.height; i++) {
			if ( i % 10 === 0) {
				canvas_height_minus_snake.push(i);
			}
		}
			// remove snake coordinates from canvas_width_minus_snake and canvas_height_minus_snake
		for (i=0; i < snake.length; i++) {
			const index_of_snake_x_position = canvas_width_minus_snake.indexOf(snake[i][0]);
			const index_of_snake_y_position = canvas_height_minus_snake.indexOf(snake[i][1]);
			if (index_of_snake_x_position != -1) { 
				canvas_width_minus_snake.splice(index_of_snake_x_position,1);
			}
			if (index_of_snake_y_position != -1) { 
				canvas_height_minus_snake.splice(index_of_snake_y_position,1);
			}
		}
		const random_x = canvas_width_minus_snake[Math.floor(Math.random() * canvas_width_minus_snake.length)];
		const random_y = canvas_height_minus_snake[Math.floor(Math.random() * canvas_height_minus_snake.length)];
			//console.log("width: ", canvas_width_minus_snake);
			//console.log("height: ", canvas_height_minus_snake);
		return [random_x, random_y];
	}
	
	function draw_food(random_x, random_y) {
		//context.fillStyle = "red";
		context.fillRect(random_x, random_y, snake_width, snake_height);
	}
	
	function eat_food() {
		if (food_x == snake[0][0] && food_y == snake[0][1] ) {
			random_coordinates_for_food();
			food_x = random_coordinates_for_food()[0];
			food_y = random_coordinates_for_food()[1]
			score += 10;
			console.log("eat food")
		}
	}

	
	function count_score() {
		div_score.innerText = "Your score is: " + score;
	}
	
	
	function check_collision(req) {
		for (i=1; i < snake.length; i++) {
			// snake eat itself
			if (snake[0][0] == snake[i][0] && snake[0][1] == snake[i][1] ) { 
				game_over();
				cancelAnimationFrame(req);
			}
		}
		// snake hits the wall
		if (snake[0][0] < 0 || snake[0][0] >= canvas.width || snake[0][1] < 0 || snake[0][1] >= canvas.height ) {
			console.log("zderzenie");
			game_over();
			cancelAnimationFrame(req);
		} 
	}
	
	function game_over() {
		const play_again_button = document.createElement("button");
		const end_game_div = document.createElement("div");
		const end_game_div_header = document.createElement("h2");
		end_game_div.id = "end_game_div";
		end_game_div.zIndex = 30;
		end_game_div_header.innerText = "Game Over";
		play_again_button.innerText = "Play Again";
		play_again_button.id = "play_again_button";
		div_with_canvas.appendChild(end_game_div);
		end_game_div.appendChild(end_game_div_header);
		end_game_div.appendChild(play_again_button);
	}
	
	function snake_speed() {
		let speed = 100;
		if(score < 30 && score >= 0){
			speed = 100
		}
		if(score < 60 && score >= 30){
			speed = 80
		}
		if(score < 90 && score >= 60){
			speed = 60
		}
		if(score < 120 && score >= 90){
			speed = 50
		}
		if(score < 140 && score >= 120){
			speed = 40
		}
		if(score < 160 && score >= 140){
			speed = 30
		}
		if(score >= 160){
			speed = 20
		}
		return speed;
	}
	
	function loop() {
		console.log("idzie");
		console.log(snake_speed());
		draw_snake();
		count_score(score);
		setTimeout(function() {
			const req = requestAnimationFrame(loop); 
			check_collision(req);
		}, snake_speed());
	} 
	
	let food_x = random_coordinates_for_food()[0]
	let food_y = random_coordinates_for_food()[1]
	console.log(food_x, food_y)
	
	
	check_key();
	set_direction();
	loop();
	random_coordinates_for_food();
	
	// ukryte zmienne globalne
	// naprawic kierunki lewo-prawo
	// snake_speed zamien na funkcje uniwersalna (petla? )
			// wspolrzedne snake - 10 zamien na zmienne
	// draw_snake step = 0 i w ifach ustawiasz step na +10 lub -10
});