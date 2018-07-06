
document.addEventListener('DOMContentLoaded', function() {
	
	const body = document.querySelector("body");
	const canvas = document.getElementById("canvas");
	const context = canvas.getContext("2d");
	
	let snake_position_x = 20;
	let snake_position_y = 20;
	snake_width = 60;
	snake_length = 20;
	const snake = [ [40, 20, 10, 10], [30, 20, 10, 10], [20, 20, 10, 10]  ]
	
	const stepX = 10;
	const stepY = 10;
	
	context.fillStyle = "green";
	context.fillRect(snake[0][0], snake[0][1], snake[0][2], snake[0][3]);
	context.fillRect(snake[1][0], snake[1][1], snake[1][2], snake[1][3]);
	context.fillRect(snake[2][0], snake[2][1], snake[2][2], snake[2][3]);
	
	//context.fillRect(snake_position_x, snake_position_y, snake_width, snake_length);
	
	let which_key_pressed;
		
	function check_key() { 
		document.addEventListener("keydown", function(e) {
			which_key_pressed = e.key;
		})
	}
	
	function set_direction() {
		let direction;
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
		context.clearRect(0, 0, canvas.width, canvas.height);
		
		draw_food(food_x, food_y);
		
		//for (i=0; i < snake.length; i++) { 
		//snake goes to right
		if (set_direction() == "right") { 
			
			snake.unshift([snake[0][0]+stepX, snake[0][1], 10, 10]);
			//snake[0][0] += stepX;
			//snake[0][1] = snake[0][1];
			snake.pop(snake[snake.length-1]);
		}
		//snake goes to left
		if (set_direction() == "left") { 
		
			snake.unshift([snake[0][0]-stepX, snake[0][1], 10, 10]);
			snake.pop(snake[snake.length-1]);
			//snake[0][0] -= stepX;
			//snake[0][1] = snake[0][1];
		}
		//snake goes up
		if (set_direction() == "up") { 
			snake.unshift([snake[0][0], snake[0][1]-stepY, 10, 10]);
			snake.pop(snake[snake.length-1]);
			//snake[0][0] = snake[0][0];
			//snake[0][1] -= stepY;
		}
		//snake goes down
		if (set_direction() == "down") { 
			snake.unshift([snake[0][0], snake[0][1]+stepY, 10, 10]);
			snake.pop(snake[snake.length-1]);
			//snake[0][0] = snake[0][0];
			//snake[0][1] += stepY;
		}
		
		for (i=0; i < snake.length; i++) { 
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
			console.log("width: ", canvas_width_minus_snake);
			console.log("height: ", canvas_height_minus_snake);
		return [random_x, random_y];
	}
	
	function draw_food(random_x, random_y) {
		//context.fillStyle = "red";
		context.fillRect(random_x, random_y, 10, 10);
	}
	
	
	function collision() {
		if (snake[0][0] < 0 || snake[0][0] > canvas.width || snake[0][1] < 0 || snake[0][1] > canvas.height) {
			console.log("zderzenie");
			game_over();
			return;
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
		body.appendChild(end_game_div);
		end_game_div.appendChild(end_game_div_header);
		end_game_div.appendChild(play_again_button);		
	}
	
	function loop() {
		// collision check
		if (snake[0][0] < 0 || snake[0][0] >= canvas.width || snake[0][1] < 0 || snake[0][1] >= canvas.height) {
			console.log("zderzenie");
			game_over();
			return;
		} 
		//collision();
		//console.log(snake);
		//console.log(which_key_pressed);
		draw_snake();
		setTimeout(function() {
			const req = requestAnimationFrame(loop); 
		}, 100);
	} 
	
	const food_x = random_coordinates_for_food()[0]
	const food_y = random_coordinates_for_food()[1]
	console.log(food_x, food_y)
	
	
	check_key();
	set_direction();
	loop();
	random_coordinates_for_food();
	
});