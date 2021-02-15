import * as Utils from "./utils.js";
import InputManager from "./InputManager.js";
import MatchManager from "./MatchManager.js";

export default class TickManager
{
	static menu(runtime)
	{
		//
	}

	static input(runtime)
	{
		if (runtime.globalVars.input_0_type != '' && runtime.globalVars.input_1_type != '')
		{
			if (false == runtime.globalVars.layoutTransitionScheduled)
			{
				runtime.globalVars.layoutTransitionScheduled = true;
				setTimeout(function(){ runtime.goToLayout('main') }, 1000);
			}
		}
	}

	static main(runtime)
	{
		if (runtime.globalVars.score_team_0 >= 10 || runtime.globalVars.score_team_1 >= 10)
		{
			MatchManager.end(runtime);
		}

		let ball = runtime.objects.ball.getFirstInstance();

		if (null != ball && Utils.isOutside(ball) && ball.y > runtime.layout.height / 2)
		{
			ball.destroy();
			MatchManager.score(runtime, 0);
			
			if (false === MatchManager.isFinished(runtime))
			{
				setTimeout(function(){ MatchManager.respawnBall(runtime, 0) }, 1000);
			}
		}

		if (null != ball && Utils.isOutside(ball) && ball.y < runtime.layout.height / 2)
		{
			ball.destroy();
			MatchManager.score(runtime, 1);
			
			if (false === MatchManager.isFinished(runtime))
			{
				setTimeout(function(){ MatchManager.respawnBall(runtime, 0) }, 1000);
			}
		}
	
		InputManager.evaluate(runtime);
	}
}
