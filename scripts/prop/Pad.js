export default class Pad extends ISpriteInstance {
	constructor() {
		super();

		this.colorRgb = [Math.random(), Math.random(), Math.random()];
	}

	static create(x, y) {
		globalThis.runtime.objects.pad.createInstance("main", x, y);
	}

	static find(index) {
		for (const instance of globalThis.runtime.objects.pad.instances()) {
			if (instance.instVars.player === index) {
				return instance;
			}
		}

		return null;
	}

	vectorX() {
		return this.behaviors['8Direction'].vectorX;
	}

	simulateLeft() {
		this.behaviors['8Direction'].simulateControl('left');
	}

	simulateRight() {
		this.behaviors['8Direction'].simulateControl('right');
	}

	setMaxSpeed(speed) {
		this.behaviors['8Direction'].maxSpeed = speed;
	}
}
