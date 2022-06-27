import { Mesh, ArcRotateCamera, Vector3 } from "@babylonjs/core";
import PlayerCamera from './player';
/**
 * This represents a script that is attached to a node in the editor.
 * Available nodes are:
 *      - Meshes
 *      - Lights
 *      - Cameas
 *      - Transform nodes
 *
 * You can extend the desired class according to the node type.
 * Example:
 *      export default class MyMesh extends Mesh {
 *          public onUpdate(): void {
 *              this.rotation.y += 0.04;
 *          }
 *      }
 * The function "onInitialize" is called immediately after the constructor is called.
 * The functions "onStart" and "onUpdate" are called automatically.
 */
export default class Room extends Mesh {
    private _fixedAnimateCamera;
    private _fixedAnimateOutroCamera;
    private _userCamera;
    private _exit;
    private _wall_east;
    private _wall_west;
    private _playerMesh;
    private _entranceAnim;
    private _exitAnim;
    private _birdCamera;
    private _bCamOrig;
    private _bCamLookOrig;
    private _gui;
    private _playMode;
    private _camPosTransition;
    private _camLookTransition;
    private _cpps;
    /**
     * Override constructor.
     * @warn do not fill.
     */
    protected constructor();
    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    onInitialize(): void;
    /**
     * Called on the scene starts.
     */
    onStart(): void;
    /**
     * Called each frame.
     */
    onUpdate(): void;
    /**
     * Called on the object has been disposed.
     * Object can be disposed manually or when the editor stops running the scene.
     */
    onStop(): void;
    confirm(): void;
    cancel(): void;
    l2g(t: Mesh | PlayerCamera | ArcRotateCamera): Vector3;
    l2gTarget(t: PlayerCamera | ArcRotateCamera): Vector3;
    switchCamera(t: boolean): Promise<void>;
}
