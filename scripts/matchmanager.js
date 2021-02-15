import Ball from "./Ball.js";
import Text from "./Text.js";

export default class MatchManager
{
	static get MaxScore() { return 10 }

	static score(runtime, team)
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
		let text = Text.find(runtime, 'winner', 0);
		
		let winner = 1;
		if (runtime.globalVars.score_team_0 < runtime.globalVars.score_team_1) {
			let winner = 2;
		}
		
		text.update("Player " + winner + " wins!");
		text.isVisible = true;

		runtime.globalVars.score_team_0 = 0;
		runtime.globalVars.score_team_1 = 0;
		runtime.globalVars.input_0_type = '';
		runtime.globalVars.input_1_type = '';

		setTimeout(function(){ runtime.goToLayout('menu') }, 2500);
	}
	
	static isFinished(runtime)
	{
		if (runtime.globalVars.score_team_0 >= MatchManager.MaxScore || runtime.globalVars.score_team_1 >= MatchManager.MaxScore)
		{
			return true;
		}
		
		return false;
	}
}
