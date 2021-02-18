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
		//
	}
}
