import Text from "./Text.js";

export default class LayoutMenuManager
{
	static before()
	{
		const runtime = globalThis.runtime;
	
		runtime.globalVars.score_team_0 = 0;
		runtime.globalVars.score_team_1 = 0;

		for (const ballInstance of runtime.objects.ball.instances())
		{
			ballInstance.angleDegrees = runtime.random() * 360;
		}
	}

	static tick()
	{
		if (true === Text.find('main_option', 0).isInTouch())
		{
			runtime.globalVars.gamemode = 0;
			runtime.goToLayout('input');
		}

		if (true === Text.find('main_option', 1).isInTouch())
		{
			runtime.globalVars.gamemode = 1;
			runtime.goToLayout('input');
		}

		if (true === Text.find('main_option', 2).isInTouch())
		{
			runtime.callFunction('browserClose');
		}
	}
}
