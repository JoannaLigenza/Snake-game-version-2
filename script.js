
document.addEventListener('DOMContentLoaded', function() {
	
	const canvas = document.getElementById("canvas");
	const context = canvas.getContext("2d");
	
	let snake_position_x = 20;
	let snake_position_y = 20;
	snake_width = 60;
	snake_length = 20;
	//const snake = [ [40, 20, 10, 10], [30, 20, 10, 10], [20, 20, 10, 10]  ]
	const snake = [ [20, 40, 10, 10], [20, 30, 10, 10], [20, 20, 10, 10]  ]
	
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
		
		//for (i=0; i < snake.length; i++) { 
		//snake goes to right
		if (set_direction() == "right") { 
			
			snake.unshift([snake[0][0]+stepX, snake[0][1], 10, 10]);
			//snake[0][0] += stepX;
			//snake[0][1] = snake[0][1];
			snake.pop(snake[snake.length-1]);
			console.log(snake);
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
		
		//snake_position_x += stepX;
		//snake_position_y = snake_position_y;
		
		//snake goes to left
		//snake_position_x -= stepX;
		//snake_position_y = snake_position_y;
		
		//snake goes down
		//snake_position_x = snake_position_x;
		//snake_position_y += stepY;
		
		//snake goes up
		//snake_position_x = snake_position_x;
		//snake_position_y -= stepY;
		
		for (i=0; i < snake.length; i++) { 
			context.fillRect(snake[i][0], snake[i][1], snake[i][2], snake[i][3]);
		}
	}
	
	function loop() {
		//console.log(snake);
		console.log(which_key_pressed);
		draw_snake();
		setTimeout(function() {
			const req = requestAnimationFrame(loop); 
		}, 100);
	} 
	
		
		
	
	const buton = document.getElementById("buton");
	
	buton.addEventListener("click", function() {
		draw_snake();
	})
	
	check_key();
	set_direction();
	loop();
	
});