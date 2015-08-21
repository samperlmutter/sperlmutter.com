function Player(x, y) {
	this.position = [x, y];
}
Player.prototype = new GameObject(0, 0);
Player.prototype.constructor = GameObject.prototype.constructor;