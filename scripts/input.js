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
	
	static evaluateAD(runtime, index)
	{
		let pad = Pad.find(runtime, index);
	
		if (runtime.keyboard.isKeyDown(Input.KeyA))
		{
			pad.behaviors['8Direction'].simulateControl('left');
		}

		if (runtime.keyboard.isKeyDown(Input.KeyD))
		{
			pad.behaviors['8Direction'].simulateControl('right');
		}
	}
	
	static evaluateArrows(runtime, index)
	{
		let pad = Pad.find(runtime, index);
	
		if (runtime.keyboard.isKeyDown(Input.ArrowLeft))
		{
			pad.behaviors['8Direction'].simulateControl('left');
		}

		if (runtime.keyboard.isKeyDown(Input.ArrowRight))
		{
			pad.behaviors['8Direction'].simulateControl('right');
		}
	}
}
