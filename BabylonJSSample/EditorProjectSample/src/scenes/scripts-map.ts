import { ScriptMap } from "./tools";

/**
 * Defines the interface that exposes all exported scripts in this project.
 */
export interface ISceneScriptMap {
	"src/scenes/player.ts": ScriptMap;
	"src/scenes/room.ts": ScriptMap;
	"src/scenes/videowalls.ts": ScriptMap;
}

/**
 * Defines the map of all available scripts in the project.
 */
export const scriptsMap: ISceneScriptMap = {
	"src/scenes/player.ts": require("./player"),
	"src/scenes/room.ts": require("./room"),
	"src/scenes/videowalls.ts": require("./videowalls"),
}
