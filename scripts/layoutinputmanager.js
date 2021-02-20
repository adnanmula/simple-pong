import * as Utils from "./utils.js";
import Text from "./Text.js";
import InputManager from "./InputManager.js";
import PointerManager from "./PointerManager.js";

export default class LayoutInputManager
{
	static before()
	{
		const runtime = globalThis.runtime;

		runtime.globalVars.input_0_type = '';
		runtime.globalVars.input_1_type = '';
	
		if (runtime.globalVars.gamemode === 1)
		{	
			runtime.globalVars.input_1_type = InputManager.TypeBot;
					
			Text.find('input_label', 1).isVisible = false;
			Text.find('label', 1).isVisible = false;
		}
		
		globalThis.pointers = [];
	}

	static tick()
	{
		const runtime = globalThis.runtime;

		if (true === runtime.globalVars.layoutTransitionScheduled)
		{
			return;
		}
	
		if (runtime.globalVars.input_0_type !== '' && runtime.globalVars.input_1_type !== '')
		{
			runtime.globalVars.layoutTransitionScheduled = true;
			setTimeout(function(){ runtime.goToLayout('main') }, 1000);
			
			return;
		}
		
		if ((runtime.keyboard.isKeyDown(InputManager.KeyW) || runtime.keyboard.isKeyDown(InputManager.KeyA) || runtime.keyboard.isKeyDown(InputManager.KeyS) || runtime.keyboard.isKeyDown(InputManager.KeyD))
			&& runtime.globalVars.input_0_type !== InputManager.TypeKeyboardAd && runtime.globalVars.input_1_type !== InputManager.TypeKeyboardAd
			&& (runtime.globalVars.input_0_type === '' || runtime.globalVars.input_1_type === ''))
		{
			InputManager.setInput(InputManager.TypeKeyboardAd);
		}
		
		if ((runtime.keyboard.isKeyDown(InputManager.ArrowUp) || runtime.keyboard.isKeyDown(InputManager.ArrowLeft) || runtime.keyboard.isKeyDown(InputManager.ArrowDown) || runtime.keyboard.isKeyDown(InputManager.ArrowRight))
			&& runtime.globalVars.input_0_type !== InputManager.TypeKeyboardArrows && runtime.globalVars.input_1_type !== InputManager.TypeKeyboardArrows
			&& (runtime.globalVars.input_0_type === '' || runtime.globalVars.input_1_type === ''))
		{
			InputManager.setInput(InputManager.TypeKeyboardArrows);
		}
		
		if (PointerManager.setterIsInTouch(0))
		{
			if (runtime.globalVars.input_0_type === '')
			{
				InputManager.setInput(InputManager.TypeTouch0);
			}
		}

		if (PointerManager.setterIsInTouch(1))
		{
			if (runtime.globalVars.input_1_type === '')
			{
				InputManager.setInput(InputManager.TypeTouch1);
			}
		}
	}
}
