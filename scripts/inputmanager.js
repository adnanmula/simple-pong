import Pad from "./Pad.js";
import Text from "./Text.js";
import AiManager from "./AiManager.js";
import PointerManager from "./PointerManager.js";

export default class InputManager
{
	static get ArrowUp() { return 'ArrowUp' }
	static get ArrowDown() { return 'ArrowDown' }
	static get ArrowLeft() { return 'ArrowLeft' }
	static get ArrowRight() { return 'ArrowRight' }
	static get KeyW() { return 'KeyW' }
	static get KeyA() { return 'KeyA' }
	static get KeyS() { return 'KeyS' }
	static get KeyD() { return 'KeyD' }
	static get Escape() { return 'Escape' }
	
	static get TypeBot() { return 'Bot' }
	static get TypeKeyboardAd() { return 'KeyboardAd' }
	static get TypeKeyboardArrows() { return 'KeyboardArrows' }
	static get TypeGamepad0() { return 'Gamepad0' }
	static get TypeGamepad1() { return 'Gamepad1' }
	static get TypeGamepad2() { return 'Gamepad2' }
	static get TypeGamepad3() { return 'Gamepad3' }
	static get TypeTouch0() { return 'Touch0' }
	static get TypeTouch1() { return 'Touch1' }
	
	static evaluate()
	{
		const runtime = globalThis.runtime;

		if ([InputManager.TypeKeyboardAd, InputManager.TypeKeyboardArrows, InputManager.TypeBot, InputManager.TypeTouch0].includes(runtime.globalVars.input_0_type))
		{
			this['evaluate' + runtime.globalVars.input_0_type](0);
		}
		
		if ([InputManager.TypeKeyboardAd, InputManager.TypeKeyboardArrows, InputManager.TypeBot, InputManager.TypeTouch1].includes(runtime.globalVars.input_1_type))
		{
			this['evaluate' + runtime.globalVars.input_1_type](1);
		}
		
		if ([InputManager.TypeGamepad0, InputManager.TypeGamepad1, InputManager.TypeGamepad2, InputManager.TypeGamepad3].includes(runtime.globalVars.input_0_type))
		{
			InputManager.evaluateGamepad(0, runtime.globalVars.input_0_type.substring(7, 8));
		}
		
		if ([InputManager.TypeGamepad0, InputManager.TypeGamepad1, InputManager.TypeGamepad2, InputManager.TypeGamepad3].includes(runtime.globalVars.input_1_type))
		{
			InputManager.evaluateGamepad(1, runtime.globalVars.input_0_type.substring(7, 8));
		}
	}
	
	static evaluateKeyboardAd(index)
	{
		let pad = Pad.find(index);
	
		if (globalThis.runtime.keyboard.isKeyDown(InputManager.KeyA))
		{
			pad.simulateLeft();
		}

		if (globalThis.runtime.keyboard.isKeyDown(InputManager.KeyD))
		{
			pad.simulateRight();
		}
	}
	
	static evaluateKeyboardArrows(index)
	{
		let pad = Pad.find(index);
	
		if (globalThis.runtime.keyboard.isKeyDown(InputManager.ArrowLeft))
		{
			pad.simulateLeft();
		}

		if (globalThis.runtime.keyboard.isKeyDown(InputManager.ArrowRight))
		{
			pad.simulateRight();
		}
	}
	
	static evaluateTouch0()
	{
		InputManager.evaluateTouch(0, 0);
		InputManager.evaluateTouch(0, 1);
	}
	
	static evaluateTouch1()
	{
		InputManager.evaluateTouch(1, 0);
		InputManager.evaluateTouch(1, 1);
	}
	
	static evaluateTouch(index, action)
	{
		const result = PointerManager.detectorIsInTouch(index, action);
		
		if (false === result)
		{
			return;
		}

		const pad = Pad.find(index);

		if (action === 0)
		{
			pad.simulateLeft();
		}
		
		if (action === 1)
		{
			pad.simulateRight();
		}
	}
	
	static evaluateGamepad(player, gamepadIndex)
	{
		runtime.callFunction('evaluateInputGamepad', player, gamepadIndex);
	}
	
	static evaluateBot(index)
	{
		AiManager.evaluate(index);
	}
	
	static setInput(type)
	{
		const runtime = globalThis.runtime;
		const textBottom = Text.find('input_label', 0);
		const textTop = Text.find('input_label', 1);

		if (textBottom !== null && runtime.globalVars.input_0_type === '')
		{
			runtime.globalVars.input_0_type = type;

			let text = type + " selected!";
			if (type === InputManager.TypeTouch0) {
				text = 'Touch (Bottom screen) selected!';
			}

			textBottom.update(text);

			return;
		}

		if (textTop !== null && runtime.globalVars.input_0_type !== '' && runtime.globalVars.input_1_type === '')
		{
			runtime.globalVars.input_1_type = type;

			let text = type + " selected!";
			if (type === InputManager.TypeTouch1) {
				text = 'Touch (Top screen) selected!';
			}

			textTop.update(text);
		}
	}
}
