function GameObject(x, y) {
	this.position = [x, y];
	this.velocity = [0, 0];
}

GameObject.prototype.update = function(msElapsed) {
	var radius = this.getRadius()
	if (this.position[0] <= radius) {
		this.velocity[0] = Math.abs(this.velocity[0]);
	} else if (this.position[0] >= canvas.width - radius) {
		this.velocity[0] = -Math.abs(this.velocity[0]);
	}
	if (this.position[1] <= radius) {
		this.velocity[1] = Math.abs(this.velocity[1]);
	} else if (this.position[1] >= canvas.height - radius) {
		this.velocity[1] = -Math.abs(this.velocity[1]);
	}
	this.position[0] += this.velocity[0];
	this.position[1] += this.velocity[1];
}

GameObject.prototype.draw = function(color) {
	context.beginPath();
	context.arc(this.position[0], this.position[1], this.getRadius(), 0, 2*Math.PI);
	context.strokeStyle = color;
	context.stroke();
//	context.fill();
}

GameObject.prototype.getRadius = function() {
	return canvas.width / 24
}