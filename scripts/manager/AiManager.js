import * as Utils from "../utils.js";
import Pad from "../Prop/Pad.js";

export default class AiManager {
	static isWinning() {
		return runtime.globalVars.score_team_1 > runtime.globalVars.score_team_0;
	}

	static evaluate(index) {
		let pad = Pad.find(index);
		let ball = globalThis.runtime.objects.ball.getFirstInstance();

		if (ball === null) {
			if (this.isWinning()) {
				return;
			}

			AiManager.centerPosition(pad);
			return;
		}

		if (ball.y < (ball.layout.height / 2) && Utils.getVectorY(ball.behaviors.Bullet.speed, ball.behaviors.Bullet.angleOfMotion) < 0) {
			let threshold = 0.1;

			if (this.isWinning()) {
				threshold += 0.25;
			}

			if (Math.random() < threshold) {
				return;
			}

			AiManager.predicBall(pad, ball);
			return;
		}

		if (ball.y > (ball.layout.height / 2)) {
			AiManager.centerPosition(pad);
			return;
		}

		if (Utils.getVectorY(ball.behaviors.Bullet.speed, ball.behaviors.Bullet.angleOfMotion) > 0) {
			AiManager.centerPosition(pad);
			return;
		}

		if (this.isWinning()) {
			return;
		}

		AiManager.centerPosition(pad);
	}

	static predicBall(pad, ball) {
		const predictedPosition = this.predictPosition(ball);

		if (predictedPosition.x < (pad.x - pad.width / 10)) {
			pad.simulateLeft();
		}

		if (predictedPosition.x > (pad.x + pad.width / 10)) {
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

	static predictPosition(ball) {
		const timeLimit = 10;
		const timeStep = 0.1;

		const speed = ball.behaviors.Bullet.speed;
		const angle = ball.behaviors.Bullet.angleOfMotion;

		const dx = speed * Math.cos(angle);
		const dy = speed * Math.sin(angle);

		let currentX = ball.x;
		let currentY = ball.y;

		let lastValidX = currentX;
		let lastValidY = currentY;

		for (let time = 0; time < timeLimit; time += timeStep) {
			currentX += dx * timeStep;
			currentY += dy * timeStep;

			if (currentY < 0) {
				return { x: lastValidX, y: lastValidY };
			}

			lastValidX = currentX;
			lastValidY = currentY;
		}

		return { x: currentX, y: currentY };
	}
}
