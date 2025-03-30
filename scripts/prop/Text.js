export default class Text extends ISpriteFontInstance {
	constructor() {
		super();
	}

	static create(x, y) {
		globalThis.runtime.objects.text.createInstance("main", x, y);
	}

	static find(type, index) {
		for (const instance of globalThis.runtime.objects.text.instances()) {
			if (instance.instVars.type === type && instance.instVars.index === index) {
				return instance;
			}
		}

		return null;
	}

	update(text) {
		this.text = text;
	}

	isInTouch() {
		for (const pointer of globalThis.pointers) {
			if (this.containsPoint(pointer.x, pointer.y)) {
				return true;
			}
		}

		return false;
	}
}
