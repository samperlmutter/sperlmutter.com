MAX_REFRESH_RATE = 16;
SPEED = 120;
ACCEL = 10;
MAX_SPEED = 20;
GRAVITY = 0.25;
WINDOW_BUFFER = 30

KEY_CODES = {"left":37, "up":38, "right":39, "down":40,
		"q":81, "w":87, "e":69, "a":65, "s":83, "d":68,
		"space":32, "enter":13, "esc":27, "shift":16, "ctrl":17,
		"0":48, "1":49, "2":50, "3":51, "4":52, "5":53, "6":54, "7":55, "8":56, "9":57};

function gameUpdate() {
	var now = new Date().getTime();
	var msElapsed = now - lastTick;
	lastTick = now;
	
	update(msElapsed);
	draw();
	
//	console.log(msElapsed + "ms");
//	console.log(keys);
}

function update(msElapsed) {
	var seconds = msElapsed / 1000;
	
	if (canvas.width != window.innerWidth) {
		canvas.width = window.innerWidth - WINDOW_BUFFER
	}
	if (canvas.height != window.innerHeight) {
		canvas.height = window.innerHeight - WINDOW_BUFFER
	}
	
	var accel = [0, 0];
	if (keys[KEY_CODES["left"]]) {
		accel[0] -= getScale() * seconds * ACCEL;
	}
	if (keys[KEY_CODES["right"]]) {
		accel[0] += getScale() * seconds * ACCEL;
	}
	if (keys[KEY_CODES["up"]]) {
		accel[1] -= getScale() * seconds * ACCEL;
	}
	if (keys[KEY_CODES["down"]]) {
		accel[1] += getScale() * seconds * ACCEL;
	}
	if (accel[0] != 0 && accel[1] != 0) {
		accel[0] /= Math.sqrt(2);
		accel[1] /= Math.sqrt(2);
	}
	gameObject.velocity[0] += accel[0];
	gameObject.velocity[1] += accel[1];
	
	var posFromCenter = [(gameObject.position[0]/canvas.width)-(planet.position[0] / canvas.width),
	                     (gameObject.position[1]/canvas.height)-(planet.position[1] / canvas.height)];
	var distFromCenter = Math.sqrt(Math.pow(posFromCenter[0],2)+Math.pow(posFromCenter[1],2));
	gameObject.velocity[0] -= GRAVITY * posFromCenter[0] / distFromCenter;
	gameObject.velocity[1] -= GRAVITY * posFromCenter[1] / distFromCenter;
	
	var currentSpeed = Math.sqrt(Math.pow(gameObject.velocity[0],2)+Math.pow(gameObject.velocity[1],2));
	if (currentSpeed > MAX_SPEED) {
		gameObject.velocity[0] *= MAX_SPEED / currentSpeed;
		gameObject.velocity[1] *= MAX_SPEED / currentSpeed;
	}
	
	planet.velocity = [0,0]
	if (keys[KEY_CODES["a"]]) {
		planet.velocity[0] -= getScale() * seconds * SPEED;
	}
	if (keys[KEY_CODES["d"]]) {
		planet.velocity[0] += getScale() * seconds * SPEED;
	}
	if (keys[KEY_CODES["w"]]) {
		planet.velocity[1] -= getScale() * seconds * SPEED;
	}
	if (keys[KEY_CODES["s"]]) {
		planet.velocity[1] += getScale() * seconds * SPEED;
	}
	
	gameObject.update(msElapsed);
	planet.update(msElapsed)
}

function draw() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	
//	context.beginPath();
	
//	var img = new Image(50, 50);
//	img.src = "yeti.png";
//	context.drawImage(img, 0, 0);
	
//	context.arc(getScale()*400, getScale()*300, getScale()*50, 0, 2*Math.PI);
//	context.strokeStyle = "#00FF00";
//	context.stroke();
//	context.fill();
	
	gameObject.draw("#FFFFFF");
	planet.draw("#00FF00")
}

function getScale() {
	return canvas.width / 800
}

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");
lastTick = new Date().getTime();
keys = new Object();
gameObject = new Player(getScale() * 75, getScale() * 75);
planet = new Player(getScale() * 100, getScale() * 100)

interval = setInterval(gameUpdate, MAX_REFRESH_RATE);
document.onkeydown = function(event) {keys[event.keyCode] = true};
document.onkeyup = function(event) {keys[event.keyCode] = false};