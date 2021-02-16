import * as Utils from "./utils.js";
import Text from "./Text.js";
import InputManager from "./InputManager.js";

export default class LayoutMainManager
{
	static before(runtime)
	{
		runtime.globalVars.input_0_type = '';
		runtime.globalVars.input_1_type = '';
	
		if (runtime.globalVars.gamemode == 1)
		{	
			runtime.globalVars.input_1_type = InputManager.TypeBot;
					
			Text.find(runtime, 'input_label', 1).isVisible = false;
			Text.find(runtime, 'label', 1).isVisible = false;
		}
	}

	static tick(runtime)
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
}
