import * as Utils from "./utils.js";
import InputManager from "./InputManager.js";
import MatchManager from "./MatchManager.js";

export default class LayoutMainManager
{
	static before()
	{
		globalThis.runtime.globalVars.layoutTransitionScheduled = false;
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
	}
}
