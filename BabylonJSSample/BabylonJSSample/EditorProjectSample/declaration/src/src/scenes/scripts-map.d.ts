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
export declare const scriptsMap: ISceneScriptMap;
