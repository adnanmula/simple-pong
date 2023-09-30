export default class TouchDetector extends ISpriteInstance
{
	constructor()
	{
		super();
	}
	
	static find(index, action)
	{
		for (const instance of globalThis.runtime.objects.input_touch_detector.instances())
		{
			if (instance.instVars.index === index && instance.instVars.action === action) {
				return instance;
			}
		}

		return null;
	}
}
