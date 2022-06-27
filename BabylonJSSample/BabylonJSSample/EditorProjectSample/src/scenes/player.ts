import {
    FreeCamera,
    FreeCameraInputsManager,
    FreeCameraTouchInput,
    Mesh,
    MeshBuilder,
    KeyboardInfo,
    KeyboardEventTypes,
    Vector3
} from "@babylonjs/core";

import { fromScene } from "./decorators";

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
export default class PlayerCamera extends FreeCamera {
    @fromScene('exit')
    private _exit: Mesh;

    private _vt: Mesh;
    private _orgSpeed: number;
    private _currentSpeed: number;
    private _maxSpeed: number;
    private _initPos: Vector3;
    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    protected constructor() { }

    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    public onInitialize(): void {
        // ...
        this._vt = MeshBuilder.CreateSphere('tracker');
        this._vt.visibility = 0;
        this._vt.parent = this;
        this._initPos = this.position.clone();
    }

    /**
     * Called on the scene starts.
     */
    public onStart(): void {
        // ...
        const inputsManager: FreeCameraInputsManager = this.inputs;
        const tInput = new FreeCameraTouchInput();
        tInput.singleFingerRotate = true;
        tInput.touchAngularSensibility = 8000;
        // tInput.touchMoveSensibility = 1000;
        inputsManager.add(tInput);

        // - accereleration
        // TODO: for mobile dvice touch operation
        this._orgSpeed = this.speed;
        this._currentSpeed = this.speed;
        this._maxSpeed = this.speed * 2.5;

        this._scene.onKeyboardObservable.add((kInfo: KeyboardInfo) => {
            if (kInfo.type == KeyboardEventTypes.KEYDOWN && kInfo.event.shiftKey) {
                this.speed = this._maxSpeed;
            } else if (kInfo.type == KeyboardEventTypes.KEYUP && kInfo.event.shiftKey) {
                this.speed = this._orgSpeed;
            }
        });
        // --
    }

    /**
     * Called each frame.
     */
    public onUpdate(): void {
        // ...
    }

    /**
     * Called on the object has been disposed.
     * Object can be disposed manually or when the editor stops running the scene.
     */
    public onStop(): void {
        // ...
    }

    public initPosition(): void {
        this.position = this._initPos.clone();
    }

    public pullPosition(): void {
        this.setTarget(new Vector3(0, 1, 0));
        this.position.addInPlace(this.getForwardRay(3).direction);
    }
}
