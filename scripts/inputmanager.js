import Pad from "./Pad.js";

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
	
	static evaluate(runtime)
	{
		if ([InputManager.TypeKeyboardAd, InputManager.TypeKeyboardArrows].includes(runtime.globalVars.input_0_type))
		{
			this['evaluate' + runtime.globalVars.input_0_type](runtime, 0);
		}
		
		if ([InputManager.TypeKeyboardAd, InputManager.TypeKeyboardArrows].includes(runtime.globalVars.input_1_type))
		{
			this['evaluate' + runtime.globalVars.input_1_type](runtime, 0);
		}
	}
	
	static evaluateKeyboardAd(runtime, index)
	{
		let pad = Pad.find(runtime, index);
	
		if (runtime.keyboard.isKeyDown(InputManager.KeyA))
		{
			pad.simulateLeft();
		}

		if (runtime.keyboard.isKeyDown(InputManager.KeyD))
		{
			pad.simulateRight();
		}
	}
	
	static evaluateKeyboardArrows(runtime, index)
	{
		let pad = Pad.find(runtime, index);
	
		if (runtime.keyboard.isKeyDown(InputManager.ArrowLeft))
		{
			pad.simulateLeft();
		}

		if (runtime.keyboard.isKeyDown(InputManager.ArrowRight))
		{
			pad.simulateRight();
		}
	}
}
