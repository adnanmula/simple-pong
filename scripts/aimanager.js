import * as Utils from "./utils.js";
import Pad from "./Pad.js";

export default class AiManager
{
	static evaluate(runtime, index)
	{
		let pad = Pad.find(runtime, index);
		let ball = runtime.objects.ball.getFirstInstance();

		if (ball !== null && ball.y < (ball.layout.height / 2) && Utils.getVectorY(ball.behaviors.Bullet.speed, ball.behaviors.Bullet.angleOfMotion) < 0) {
			AiManager.followBall(runtime, pad, ball);
		}

		if (ball !== null && ball.y > (ball.layout.height / 2)) {
			AiManager.centerPosition(runtime, pad, ball);
		}

		if (ball !== null && Utils.getVectorY(ball.behaviors.Bullet.speed, ball.behaviors.Bullet.angleOfMotion) > 0) {
			AiManager.centerPosition(runtime, pad, ball);
		}

		if (ball === null) {
			AiManager.centerPosition(runtime, pad, ball);
		}
	}
	
	static followBall(runtime, pad, ball)
	{
		if (ball.x < (pad.x - pad.width / 10))
		{
			pad.simulateLeft();
		}

		if (ball.x > (pad.x + pad.width / 10))
		{
			pad.simulateRight();
		}
	}
	
	static centerPosition(runtime, pad, ball)
	{
		if ((runtime.layout.width / 2 - pad.width / 10) <= pad.x)
		{
			pad.simulateLeft();
		}

		if ((runtime.layout.width / 2 + pad.width / 10) >= pad.x)
		{
			pad.simulateRight();
		}
	}
}
