export default class PadInstance extends ISpriteInstance
{
	constructor()
	{
		super();
		
		this.colorRgb = [Math.random(), Math.random(), Math.random()];
	}

	static create(runtime, x, y)
	{
		runtime.objects.pad.createInstance("main", x, y);
	}
	
	static find(runtime, index)
	{
		for (const pad of runtime.objects.pad.instances())
		{
			if (pad.instVars.player == index) {
				return pad;
			}
		}

		return null;
	}
}
