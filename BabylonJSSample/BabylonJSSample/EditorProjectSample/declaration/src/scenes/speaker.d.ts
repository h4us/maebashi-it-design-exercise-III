import { TransformNode } from '@babylonjs/core';
export default class Sepaker extends TransformNode {
    private _aurl;
    private _segment_b;
    private _segment_c;
    private _segment_d;
    private _segment_e;
    private _segment_f;
    private _snd_fragments;
    private _playerMesh;
    private _birdCamera;
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
    unlockAndPlayAll(): void;
}
