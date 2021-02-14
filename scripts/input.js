import Pad from "./Pad.js";

export default class Input
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
	static get TypeKeyboardAd() { return 'Bot' }
	static get TypeKeyboardArrows() { return 'Bot' }
	static get TypeGamepad0() { return 'Gamepad0' }
	static get TypeGamepad1() { return 'Gamepad1' }
	static get TypeGamepad2() { return 'Gamepad2' }
	static get TypeGamepad3() { return 'Gamepad3' }
	static get TypeTouch0() { return 'Touch0' }
	static get TypeTouch1() { return 'Touch1' }
	
	static evaluate(runtime)
	{
		if (runtime.globalVars.input_0_type != 'Bot' && runtime.globalVars.input_0_type != '')
		{
			this['evaluate' + runtime.globalVars.input_0_type](runtime, 0);
		}

		if (runtime.globalVars.input_1_type != 'Bot' && runtime.globalVars.input_1_type != '')
		{
			this['evaluate' + runtime.globalVars.input_1_type](runtime, 1);
		}
	}
	
	static evaluateKEYBOARD_AD(runtime, index)
	{
		let pad = Pad.find(runtime, index);
	
		if (runtime.keyboard.isKeyDown(Input.KeyA))
		{
			pad.simulateLeft();
		}

		if (runtime.keyboard.isKeyDown(Input.KeyD))
		{
			pad.simulateRight();
		}
	}
	
	static evaluateKEYBOARD_ARROWS(runtime, index)
	{
		let pad = Pad.find(runtime, index);
	
		if (runtime.keyboard.isKeyDown(Input.ArrowLeft))
		{
			pad.simulateLeft();
		}

		if (runtime.keyboard.isKeyDown(Input.ArrowRight))
		{
			pad.simulateRight();
		}
	}
}
