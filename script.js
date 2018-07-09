
document.addEventListener('DOMContentLoaded', function() {
	
	const div_with_canvas = document.getElementById("div_with_canvas");
	const div_score = document.getElementById("score");
	const canvas = document.getElementById("canvas");
	const context = canvas.getContext("2d");
	
	const snake_width = 10;
	const snake_height = 10;
	const snake = [ [40, 20, snake_width, snake_height], [30, 20, snake_width, snake_height], [20, 20, snake_width, snake_height]  ]
	
	const direct = { 
		direction: "right",
		
		check_key: function() { 
			document.addEventListener("keydown", function(e) {
				which_key_pressed = e.key;
				direct.set_direction(which_key_pressed)
				//console.log(this.which_key_pressed);
			})
		},
		
		set_direction: function(which_key_pressed) {
			if (which_key_pressed == "ArrowRight" && this.direction != "left") {
				this.direction = "right";
			}
			if (which_key_pressed == "ArrowLeft" && this.direction != "right") {
				this.direction = "left";
			}
			if (which_key_pressed == "ArrowUp" && this.direction != "down") {
				this.direction = "up";
			}
			if (which_key_pressed == "ArrowDown" && this.direction != "up") {
				this.direction = "down";
			}
			return this.direction;
		}
	}	
	
	function draw_snake() {
		let stepX = 0;
		let stepY = 0;
		context.clearRect(0, 0, canvas.width, canvas.height);
			
		draw.draw_food(draw.random_x, draw.random_x);
			
		//for (i=0; i < snake.length; i++) { 
		//snake goes to right
		if (direct.set_direction() == "right") { 
			stepX = 10;
		}
		//snake goes to left
		if (direct.set_direction() == "left") { 
			stepX = -10;
		}
		//snake goes up
		if (direct.set_direction() == "up") { 
			stepY = -10;
		}
		//snake goes down
		if (direct.set_direction() == "down") { 
			stepY = 10;
		}
		snake.unshift([snake[0][0]+stepX, snake[0][1]+stepY, snake_width, snake_height])
		if (draw.random_x !== snake[0][0] || draw.random_y !== snake[0][1] ) {
			snake.pop(snake[snake.length-1]);
		}
		draw.eat_food();
		for (i=0; i < snake.length; i++) { 
			context.fillStyle = "green";
			context.fillRect(snake[i][0], snake[i][1], snake[i][2], snake[i][3]);
		}
	}
		
	const draw = { 
		random_x: "",
		random_y: "",
		
		random_coordinates_for_food: function() {
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
			this.random_x = canvas_width_minus_snake[Math.floor(Math.random() * canvas_width_minus_snake.length)];
			this.random_y = canvas_height_minus_snake[Math.floor(Math.random() * canvas_height_minus_snake.length)];
		},
		
		draw_food: function() {
			context.fillRect(this.random_x, this.random_y, snake_width, snake_height);
		},
		
		eat_food: function() {
			if (this.random_x == snake[0][0] && this.random_y == snake[0][1] ) {
				console.log("eat food");
				draw.random_coordinates_for_food();
				set_score.score += 10;
			}
		}
	}
	
	const set_score = { 
		score: 0,
	
		count_score: function() {
			div_score.innerText = "Your score is: " + this.score;
		},
		
		return_score: function() {
			return this.score;
		}
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
		if(set_score.score < 30 && set_score.score >= 0){
			speed = 100
		}
		if(set_score.score < 60 && set_score.score >= 30){
			speed = 80
		}
		if(set_score.score < 90 && set_score.score >= 60){
			speed = 60
		}
		if(set_score.score < 120 && set_score.score >= 90){
			speed = 50
		}
		if(set_score.score < 140 && set_score.score >= 120){
			speed = 40
		}
		if(set_score.score < 160 && set_score.score >= 140){
			speed = 30
		}
		if(set_score.score >= 160){
			speed = 20
		}
		return speed;
	}
	
	function loop() {
		//console.log("idzie");
		//console.log(snake_speed());
		draw_snake();
		set_score.count_score();
		setTimeout(function() {
			const req = requestAnimationFrame(loop); 
			check_collision(req);
		}, snake_speed());
	} 
	
	direct.check_key();
	loop();
	draw.random_coordinates_for_food();
	
	// snake_speed zamien na funkcje uniwersalna (petla? )

});