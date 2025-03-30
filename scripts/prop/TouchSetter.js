export default class TouchSetter extends ISpriteInstance {
	constructor() {
		super();
	}

	static find(index) {
		for (const instance of globalThis.runtime.objects.input_touch_setter.instances()) {
			if (instance.instVars.player === index) {
				return instance;
			}
		}

		return null;
	}
}
