export default class BallInstance extends ISpriteInstance
{
	constructor()
	{
		super();
		
		this.colorRgb = [Math.random(), Math.random(), Math.random()];
	}

	static create(runtime, x, y, angle)
	{
		let instance = runtime.objects.ball.createInstance("main", x, y);
		
		instance.angleDegrees = angle;
	}
}
