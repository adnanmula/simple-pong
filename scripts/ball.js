export default class Ball extends ISpriteInstance
{
	static get NormalDeviation() { return 30 }
	static get SmallDeviation() { return 6 }
	
	static get ClockwiseDeviation() { return 'ClockwiseDeviation' }
	static get CounterClockwiseDeviation() { return 'CounterClockwiseDeviation' }

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
	
	static find(runtime, uid)
	{
		return runtime.objects.ball.getInstanceByUid(uid);
	}
	
	deviate(runtime, deviation, direction)
	{
		if (direction == Ball.ClockwiseDeviation){
			this.angleDegrees += deviation;
		} else {
			this.angleDegrees -= deviation;
		}
	}
}
