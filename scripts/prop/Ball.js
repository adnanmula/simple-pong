export default class Ball extends ISpriteInstance {
	static get NormalDeviation() { return 30 }
	static get SmallDeviation() { return 6 }

	static get ClockwiseDeviation() { return 'ClockwiseDeviation' }
	static get CounterClockwiseDeviation() { return 'CounterClockwiseDeviation' }

	constructor() {
		super();

		this.colorRgb = [Math.random() * 0.75, Math.random() * 0.75, Math.random() * 0.75];
	}

	static create(x, y, angle) {
		let instance = globalThis.runtime.objects.ball.createInstance("main", x, y);

		instance.angleDegrees = angle;
	}

	static find(uid) {
		return globalThis.runtime.objects.ball.getInstanceByUid(uid);
	}

	deviate(deviation, direction) {
		if (direction === Ball.ClockwiseDeviation) {
			this.angleDegrees += deviation;
		} else {
			this.angleDegrees -= deviation;
		}
	}
}
