import Ball from "./Ball.js";
import Pad from "./Pad.js";
import Text from "./Text.js";
import Input from "./input.js";

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
		Input.evaluate(runtime);
		
		Text.find(runtime, 'scoreboard', 0).update(runtime.globalVars.score_team_0);
		Text.find(runtime, 'scoreboard', 1).update(runtime.globalVars.score_team_1);
	}
}
