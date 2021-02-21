import * as Utils from "./utils.js";
import Pad from "./Pad.js";
import Ball from "./Ball.js";
import InputManager from "./InputManager.js";
import MatchManager from "./MatchManager.js";

export default class LayoutMainManager
{
	static before()
	{
		globalThis.runtime.globalVars.layoutTransitionScheduled = false;
		
		if (runtime.globalVars.input_0_type === InputManager.TypeBot)
		{
			Pad.find(0).setMaxSpeed(250);
		}
		
		if (runtime.globalVars.input_1_type === InputManager.TypeBot)
		{
			Pad.find(1).setMaxSpeed(250);
		}
	}

	static tick()
	{
		const runtime = globalThis.runtime;
	
		if (runtime.globalVars.score_team_0 >= MatchManager.MaxScore || runtime.globalVars.score_team_1 >= MatchManager.MaxScore)
		{
			MatchManager.end();
		}

		let ball = runtime.objects.ball.getFirstInstance();

		if (null != ball && Utils.isOutside(ball) && ball.y > runtime.layout.height / 2)
		{
			ball.destroy();
			MatchManager.score(1);
			
			if (false === MatchManager.isFinished())
			{
				setTimeout(function(){ MatchManager.respawnBall(0) }, 1000);
			}
		}

		if (null != ball && Utils.isOutside(ball) && ball.y < runtime.layout.height / 2)
		{
			ball.destroy();
			MatchManager.score(0);
			
			if (false === MatchManager.isFinished())
			{
				setTimeout(function(){ MatchManager.respawnBall(1) }, 1000);
			}
		}
	
		InputManager.evaluate();
		
		if (null === ball)
		{
			return;
		}

		const angle = Math.abs(Utils.toDegrees(ball.behaviors.Bullet.angleOfMotion));

		if (angle >= 178 && angle <= 182)
		{
			ball.deviate(Ball.NormalDeviation, Ball.ClockwiseDeviation);
		}
		
		if (angle >= 0 && angle <= 3)
		{
			ball.deviate(Ball.NormalDeviation, Ball.ClockwiseDeviation);
		}
	}
}
