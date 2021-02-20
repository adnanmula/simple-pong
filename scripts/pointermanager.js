import TouchSetter from "./TouchSetter.js";
import TouchDetector from "./TouchDetector.js";

export default class PointerManager
{
	static setterIsInTouch(index)
	{
		const setter = TouchSetter.find(index);

		if (setter === null)
		{
			return false;
		}
		
		for (const pointer of globalThis.pointers)
		{	
			if (setter.containsPoint(pointer.x, pointer.y))
			{
				return true;
			}
		}
		
		return false;
	}
	
	static detectorIsInTouch(index, action)
	{
		const detector = TouchDetector.find(index, action);

		if (detector === null)
		{
			return false;
		}
		
		for (const pointer of globalThis.pointers)
		{
			if (detector.containsPoint(pointer.x, pointer.y))
			{
				return true;
			}
		}
		
		return false;
	}
	
	static addPointer(id, absoluteX, absoluteY)
	{
		const [relativeX, relativeY] = globalThis.runtime.layout.getLayer("main").cssPxToLayer(absoluteX, absoluteY);
		
		globalThis.pointers.push({id: id, x: relativeX, y: relativeY});
	}

	static removePointer(id)
	{
		globalThis.pointers = globalThis.pointers.filter(pointer => pointer.id !== id);
	}
	
	static movePointer(id, absoluteX, absoluteY)
	{
		let pointer = globalThis.pointers.filter(pointer => pointer.id === id);
		
		if (pointer.length === 0)
		{
			return;
		}
		
		PointerManager.removePointer(id);
		PointerManager.addPointer(id, absoluteX, absoluteY);
	}
}
