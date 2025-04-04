import Ball from "./Prop/Ball.js";
import Pad from "./Prop/Pad.js";
import Text from "./Prop/Text.js";
import TouchSetter from "./Prop/TouchSetter.js";
import TouchDetector from "./Prop/TouchDetector.js";

import PointerManager from "./Manager/PointerManager.js";
import LayoutMenuManager from "./Layout/LayoutMenuManager.js";
import LayoutInputManager from "./Layout/LayoutInputManager.js";
import LayoutMainManager from "./Layout/LayoutMainManager.js";

runOnStartup(async runtime => {
	runtime.objects.ball.setInstanceClass(Ball);
	runtime.objects.pad.setInstanceClass(Pad);
	runtime.objects.text.setInstanceClass(Text);

	runtime.objects.input_touch_setter.setInstanceClass(TouchSetter);
	runtime.objects.input_touch_detector.setInstanceClass(TouchDetector);

	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
});

function OnBeforeProjectStart(runtime) {
	globalThis.runtime = runtime;
	globalThis.pointers = [];

	runtime.globalVars.layoutTransitionScheduled = false;
	runtime.globalVars.score_team_0 = 0;
	runtime.globalVars.score_team_1 = 0;
	runtime.globalVars.gamemode = 0;

	runtime.getLayout('menu').addEventListener("beforelayoutstart", () => LayoutMenuManager.before());
	runtime.getLayout('input').addEventListener("beforelayoutstart", () => LayoutInputManager.before());
	runtime.getLayout('main').addEventListener("beforelayoutstart", () => LayoutMainManager.before());

	runtime.addEventListener("tick", () => Tick());

	runtime.addEventListener("pointerdown", e => PointerManager.addPointer(e.pointerId, e.clientX, e.clientY));
	runtime.addEventListener("pointermove", e => PointerManager.movePointer(e.pointerId, e.clientX, e.clientY));
	runtime.addEventListener("pointerup", e => PointerManager.removePointer(e.pointerId));
}

function Tick() {
	const name = globalThis.runtime.layout.name;

	if (name === 'menu') {
		LayoutMenuManager.tick();
	}

	if (name === 'input') {
		LayoutInputManager.tick();
	}

	if (name === 'main') {
		LayoutMainManager.tick();
	}
}
