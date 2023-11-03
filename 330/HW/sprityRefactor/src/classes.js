// #1 CLASS CODE
// we've put these Sprite classes in a separate <script> tag from the rest of the code, but this code should really be in another file
class Sprite{
	constructor(x = 0, y = 0, span = 10, fwd = {x:1, y:0}, speed = 0, color = "black"){
		this.x = x;
		this.y = y;
		this.span = span;
		this.fwd = fwd;
		this.speed = speed;
		this.color = color;
		
		// #2 - Here's a cooler idiom to accomplish the same property assignment as above, 
		// with one line of code!
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
		//Object.assign(this,{x,y,span,fwd,speed,color});
	}
	
	draw(ctx){
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.beginPath();
		ctx.rect(-this.span / 2, -this.span / 2, this.span, this.span);
		ctx.closePath();
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.restore();
	}
	
	move(){
		this.x += this.fwd.x * this.speed;
		this.y += this.fwd.y * this.speed;
	}
	
	reflectX(){
		this.fwd.x *= -1;
	}
	
	reflectY(){
		this.fwd.y *= -1;
	}
}

// #3 - Inheritance example. Note that `RingSprite` is using all the methods of Sprite 
// except for `draw()`, which it is replacing (overriding) with its own implementation
class RingSprite extends Sprite{
	draw(ctx){
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.beginPath();
		ctx.arc(0, 0, this.span / 2 , 0, Math.PI * 2, false);
		ctx.arc(0, 0, this.span / 4, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.restore();
	}
}

class TriangleSprite extends Sprite{
	draw(ctx){
		ctx.save();
		// Drawing styles
		ctx.fillStyle = this.color;
		ctx.lineWidth = 1;
		// Transformations
		ctx.translate(this.x, this.y);
		// Drawing Triangle
		ctx.beginPath();
		ctx.moveTo(0, -(this.span / 2));
		ctx.lineTo(this.span / 2, this.span / 2);
		ctx.lineTo(-(this.span / 2), this.span / 2);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}
}

class ImageSprite extends Sprite{
	constructor (x = 0, y = 0, span = 10, fwd = {x:1, y:0}, speed = 0, rotationSpeed = 1, image){
		super (x, y, span, fwd, speed);
		this.rotationSpeed = rotationSpeed;
		this.image = image;
		this.rotation = 0;
	}
	
	draw(ctx){
		ctx.save();
		ctx.translate(this.x, this.y)
		ctx.rotate(this.rotation);
		ctx.drawImage(this.image, -this.span / 2, -this.span / 2, this.span, this.span);
		ctx.restore();
	}
}

export {Sprite, RingSprite, TriangleSprite, ImageSprite};