import Ball from "./Ball.js";
import Pad from "./Pad.js";
import Text from "./Text.js";
import Input from "./input.js";

export default class BeforeLayoutManager
{
	static menu(runtime)
	{
		for (const ballInstance of runtime.objects.ball.instances())
		{
			ballInstance.angleDegrees = runtime.random() * 360;
		}
	}

	static input(runtime)
	{
		if (runtime.globalVars.gamemode == 1)
		{	
			runtime.globalVars.input_1_type = Input.TypeBot;
			
			Text.find(runtime, 'input_label', 1).isVisible = false;
			Text.find(runtime, 'label', 1).isVisible = false;
		}
	}

	static main(runtime)
	{
		runtime.globalVars.layoutTransitionScheduled = false;
		runtime.globalVars.score_team_0 = 0;
		runtime.globalVars.score_team_1 = 0;
	}
}