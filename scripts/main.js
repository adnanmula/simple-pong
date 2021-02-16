import Ball from "./Ball.js";
import Pad from "./Pad.js";
import Text from "./Text.js";

import LayoutMenuManager from "./LayoutMenuManager.js";
import LayoutInputManager from "./LayoutInputManager.js";
import LayoutMainManager from "./LayoutMainManager.js";

runOnStartup(async runtime =>
{
	runtime.objects.ball.setInstanceClass(Ball);
	runtime.objects.pad.setInstanceClass(Pad);
	runtime.objects.text.setInstanceClass(Text);
	
	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
});

function OnBeforeProjectStart(runtime)
{
	runtime.globalVars.layoutTransitionScheduled = false;
	runtime.globalVars.score_team_0 = 0;
	runtime.globalVars.score_team_1 = 0;

	runtime.getLayout('menu').addEventListener("beforelayoutstart", () => LayoutMenuManager.before(runtime));
	runtime.getLayout('input').addEventListener("beforelayoutstart", () => LayoutInputManager.before(runtime));
	runtime.getLayout('main').addEventListener("beforelayoutstart", () => LayoutMainManager.before(runtime));

	runtime.addEventListener("tick", () => Tick(runtime));
	
	runtime.addEventListener("keydown", e => OnKeyDown(e, runtime));
}

function Tick(runtime)
{
	if (runtime.layout.name === 'menu')
	{
		LayoutMenuManager.tick(runtime);
	}
	
	if (runtime.layout.name === 'input')
	{
		LayoutInputManager.tick(runtime);
	}
	
	if (runtime.layout.name === 'main')
	{
		LayoutMainManager.tick(runtime);
	}
}

function OnKeyDown(e, runtime)
{
	if (e.key == 'Escape')
	{
		runtime.globalVars.layoutTransitionScheduled = false;
		runtime.goToLayout("menu");
		
		return;
		//pause menu stuff or getting back from input section
	}

// 	const inputTypes = [runtime.globalVars.input_0_type, runtime.globalVars.input_1_type];

// 	if (false == inputTypes.includes('KEYBOARD_AD') && false == inputTypes.includes('KEYBOARD_ARROW')) {
// 		return;
// 	}
}
