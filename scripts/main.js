import Ball from "./Ball.js";
import Pad from "./Pad.js";
import Input from "./input.js";

runOnStartup(async runtime =>
{
	runtime.objects.ball.setInstanceClass(Ball);
	runtime.objects.pad.setInstanceClass(Pad);
	
	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
});

function OnBeforeProjectStart(runtime)
{
	runtime.layout.addEventListener("beforelayoutstart", () => OnBeforeLayoutStart(runtime));
	runtime.addEventListener("tick", () => Tick(runtime));
	runtime.addEventListener("keydown", e => OnKeyDown(e, runtime));
}

function OnBeforeLayoutStart(runtime)
{
	if (runtime.layout.name == 'menu')
	{
		for (const ballInstance of runtime.objects.ball.instances())
		{
			ballInstance.angleDegrees = runtime.random() * 360;
		}
	}
}

function Tick(runtime)
{
// 	if (runtime.layout.name == 'menu')
// 	{
// 		TickMenu(runtime);
// 	}
	
// 	if (runtime.layout.name == 'input')
// 	{
// 		TickInput(runtime);
// 	}
	
	if (runtime.layout.name == 'main')
	{
		TickMain(runtime);
	}
}

// function TickMenu(runtime)
// {
// }

// function TickInput(runtime)
// {
// }

function TickMain(runtime)
{
	if (runtime.globalVars.input_0_type == 'KEYBOARD_AD')
	{
		Input.evaluateAD(runtime, 0);
	}
	
	if (runtime.globalVars.input_1_type == 'KEYBOARD_AD')
	{
		Input.evaluateAD(runtime, 1);
	}
	
	if (runtime.globalVars.input_0_type == 'KEYBOARD_ARROWS')
	{
		Input.evaluateArrows(runtime, 0);
	}
	
	if (runtime.globalVars.input_1_type == 'KEYBOARD_ARROWS')
	{
		Input.evaluateArrows(runtime, 1);
	}
}

function OnKeyDown(e, runtime)
{
	if (e.key == 'Escape')
	{
		runtime.goToLayout("menu");
		
		return;
		//pause menu stuff or getting back from input section
	}

	const inputTypes = [runtime.globalVars.input_0_type, runtime.globalVars.input_1_type];

	if (false == inputTypes.includes('KEYBOARD_AD') && false == inputTypes.includes('KEYBOARD_ARROW')) {
		return;
	}
}
