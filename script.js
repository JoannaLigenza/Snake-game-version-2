
document.addEventListener('DOMContentLoaded', function() {
	
	const canvas = document.getElementById("canvas");
	const context = canvas.getContext("2d");
	
	let snake_position_x = 20;
	let snake_position_y = 20;
	
	const stepX = 10;
	const stepY = 10;
	
	let time = null;
	let fps = 5;
	const delay = 1000/fps;
	
	context.fillStyle = "green";
	context.fillRect(snake_position_x, snake_position_y, 10, 10);
	//context.fillRect(30, 20, 10, 10);
	//context.fillRect(40, 20, 10, 10);
	
	function draw_snake() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		//snake goes to right
		snake_position_x += stepX;
		snake_position_y = snake_position_y;
		
		//snake goes to left
		//snake_position_x -= stepX;
		//snake_position_y = snake_position_y;
		
		//snake goes down
		//snake_position_x = snake_position_x;
		//snake_position_y += stepY;
		
		//snake goes up
		//snake_position_x = snake_position_x;
		//snake_position_y -= stepY;
		
		context.fillRect(snake_position_x, snake_position_y, 10, 10);
	}
	
	function loop(timestamp) {
		if (time == null) { 
			time = timestamp;
		}
		console.log("timestamp: ", timestamp);
		console.log("time: ", time);
		progress = timestamp - time;
		
		let seg = Math.floor(progress);
		console.log("seg: ", seg);
		console.log("delay: ", delay);
		if (seg < ) {
			seg = 0;
			draw_snake();
		}
		
		const req = requestAnimationFrame(loop);
	}
	
	
	const buton = document.getElementById("buton");
	
	buton.addEventListener("click", function() {
		draw_snake();
	})
	
	loop();
	
});