import Ball from "./Ball.js";
import Pad from "./Pad.js";
import Text from "./Text.js";
import Input from "./input.js";

export default class MatchManager
{
	static scoreGoal(runtime, team)
	{
		runtime.globalVars['score_team_' + team]++;

		Text.find(runtime, 'scoreboard', team).update(String(runtime.globalVars['score_team_' + team]));
	}

	static respawnBall(runtime, team)
	{
		for (const instance of runtime.objects.ball.instances())
		{
			instance.destroy();
		}
	
		Ball.create(runtime, runtime.layout.width/2, runtime.layout.height/2, team ? 270 : 90);
	}
	
	static end(runtime)
	{
	}
}
