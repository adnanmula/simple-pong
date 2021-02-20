export default class Text extends ISpriteFontInstance
{
	constructor()
	{
		super();
	}

	static create(x, y)
	{
		globalThis.runtime.objects.text.createInstance("main", x, y);
	}
	
	static find(type, index)
	{
		for (const instance of globalThis.runtime.objects.text.instances())
		{
			if (instance.instVars.type === type && instance.instVars.index === index) {
				return instance;
			}
		}

		return null;
	}
	
	isInTouch()
	{
		//TODO
	}
	
	update(text)
	{
		this.text = text;
	}
}
