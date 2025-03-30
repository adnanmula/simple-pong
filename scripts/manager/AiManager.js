import * as Utils from "../utils.js";
import Pad from "../Prop/Pad.js";

export default class AiManager {
	static evaluate(index) {
		let pad = Pad.find(index);
		let ball = globalThis.runtime.objects.ball.getFirstInstance();

		if (ball !== null && ball.y < (ball.layout.height / 2) && Utils.getVectorY(ball.behaviors.Bullet.speed, ball.behaviors.Bullet.angleOfMotion) < 0) {
			AiManager.followBall(pad, ball);
		}

		if (ball !== null && ball.y > (ball.layout.height / 2)) {
			AiManager.centerPosition(pad);
		}

		if (ball !== null && Utils.getVectorY(ball.behaviors.Bullet.speed, ball.behaviors.Bullet.angleOfMotion) > 0) {
			AiManager.centerPosition(pad);
		}

		if (ball === null) {
			AiManager.centerPosition(pad);
		}
	}

	static followBall(pad, ball) {
		if (ball.x < (pad.x - pad.width / 10)) {
			pad.simulateLeft();
		}

		if (ball.x > (pad.x + pad.width / 10)) {
			pad.simulateRight();
		}
	}

	static centerPosition(pad) {
		if ((globalThis.runtime.layout.width / 2 - pad.width / 10) <= pad.x) {
			pad.simulateLeft();
		}

		if ((globalThis.runtime.layout.width / 2 + pad.width / 10) >= pad.x) {
			pad.simulateRight();
		}
	}
}
