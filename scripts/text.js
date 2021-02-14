export default class Text extends ISpriteFontInstance
{
	constructor()
	{
		super();
	}

	static create(runtime, x, y)
	{
		runtime.objects.text.createInstance("main", x, y);
	}
	
	static find(runtime, type, index)
	{
		for (const instance of runtime.objects.text.instances())
		{
			if (instance.instVars.type == type && instance.instVars.index == index) {
				return instance;
			}
		}

		return null;
	}
	
	update(text)
	{
		this.text = text;
	}
}
