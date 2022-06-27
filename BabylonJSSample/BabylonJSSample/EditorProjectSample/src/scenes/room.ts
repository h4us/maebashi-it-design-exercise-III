import {
    Mesh,
    UniversalCamera,
    ArcRotateCamera,
    AnimationGroup,
    Vector3,
    Color4,
    Animation,
    Animatable,
    CircleEase,
    EasingFunction,
    PointerInfo,
    PointerEventTypes,
    TransformNode,
    ScreenSpaceReflectionPostProcess,
} from "@babylonjs/core";


import { fromScene } from "./decorators";
import { CMCGui } from '../gui';

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
    @fromScene('Camera.001')
    private _fixedAnimateCamera: UniversalCamera;
    @fromScene('Camera.002')
    private _fixedAnimateOutroCamera: UniversalCamera;
    @fromScene('camera')
    private _userCamera: PlayerCamera;
    @fromScene('exit')
    private _exit: Mesh;
    @fromScene('wall_east')
    private _wall_east: Mesh;
    @fromScene('wall_west')
    private _wall_west: Mesh;

    private _playerMesh: Mesh;
    private _entranceAnim: AnimationGroup;
    private _exitAnim: AnimationGroup
    private _birdCamera: ArcRotateCamera;
    private _bCamOrig: Vector3;
    private _bCamLookOrig: Vector3;
    private _gui: CMCGui;
    private _playMode: number = 0;

    private _camPosTransition: Animation;
    private _camLookTransition: Animation;
    private _cpps: ScreenSpaceReflectionPostProcess;

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
        this._gui = new CMCGui('cmc-gui', this._scene);
        this._gui.blank();

        this._birdCamera = new ArcRotateCamera('birdCamera', Math.PI / 3, Math.PI / 3, 10, new Vector3(-100, 300, -100), this._scene);
        this._birdCamera.setTarget(Vector3.Zero());
    }

    /**
     * Called on the scene starts.
     */
    public onStart(): void {
        // ...
        this._playerMesh = this._scene.getMeshByName('tracker') as Mesh;

        this._wall_east.enableEdgesRendering();
        this._wall_east.edgesWidth = 8.0;
        this._wall_east.edgesColor = new Color4(0.05, 0.05, 0.05, 1);
        this._wall_east.checkCollisions = true;
        this._wall_east.ellipsoid = new Vector3(0.5, 1.0, 0.5);
        this._wall_east.ellipsoidOffset = new Vector3(0, 0, 0);

        this._wall_west.enableEdgesRendering();
        this._wall_west.edgesWidth = 8.0;
        this._wall_west.edgesColor = new Color4(0.05, 0.05, 0.05, 1);
        this._wall_west.checkCollisions = true;
        this._wall_west.ellipsoid = new Vector3(0.5, 1.0, 0.5);
        this._wall_west.ellipsoidOffset = new Vector3(0, 0, 0);

        this._entranceAnim = this._scene.getAnimationGroupByName('CameraAction.002');
        this._entranceAnim.onAnimationEndObservable.add(() => {
            const matrix = this._fixedAnimateCamera.computeWorldMatrix();
            const local_position = this._fixedAnimateCamera.position;
            const global_position = Vector3.TransformCoordinates(local_position, matrix);

            this._userCamera.position = global_position;
            this._scene.activeCamera = this._userCamera;

            this._gui.build();

            // this._cpps = new ScreenSpaceReflectionPostProcess('ussr', this._scene, 1.0, this._userCamera);
            // this._cpps.reflectionSamples = 32;
            // this._cpps.strength = 1;
            // this._cpps.reflectionSpecularFalloffExponent = 1;

            // one shot!
            this._entranceAnim.dispose();
        });

        this._exitAnim = this._scene.getAnimationGroupByName('CameraAction.001');
        this._exitAnim.onAnimationEndObservable.add(() => {
            window.location.href = '';
        });

        this._scene.activeCamera = this._fixedAnimateCamera;

        this._bCamOrig = this._birdCamera.position.clone();
        this._bCamLookOrig = this._birdCamera.target.clone();
        this._camPosTransition = new Animation(
            'camPos',
            'position', 60, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT
        );
        this._camLookTransition = new Animation(
            'camLook',
            'target', 60, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT
        );

        var easingFunction = new CircleEase();
        easingFunction.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
        this._camPosTransition.setEasingFunction(easingFunction);
        this._camLookTransition.setEasingFunction(easingFunction);

        // TEST:
        // this._scene.onKeyboardObservable.add((kInfo: KeyboardInfo) => {
        //     if (kInfo.type == KeyboardEventTypes.KEYUP && kInfo.event.code == 'Space') {
        //         this._userCamera.setEnabled(!this._userCamera.isEnabled());

        //         if (this._userCamera.isEnabled()) {
        //             this._scene.activeCamera = this._userCamera;
        //         } else {
        //             this._scene.activeCamera = this._birdCamera;
        //         }

        //         this._scene.activeCamera.detachControl();
        //         this._scene.activeCamera.attachControl(this.getEngine().getRenderingCanvas(), false);
        //     }
        // });

        //! tweeeaaaks
        const uit = (e: MouseEvent) => {
            // console.log('tap',  e.target, e.currentTarget);
            if (!this._entranceAnim.isStarted) {
                this._gui.blank();
                this._entranceAnim.start(false, 1.0, this._entranceAnim.from, this._entranceAnim.to, false);
                // window.removeEventListener('click', uit);
                document.removeEventListener('click', uit);
            }
        }
        // window.addEventListener('click', uit);
        document.addEventListener('click', uit);

        this._gui.intro();
    }

    /**
     * Called each frame.
     */
    public onUpdate(): void {
        // ...
        // TODO: improve
        if (this._playerMesh.intersectsMesh(this._exit, true) && this._scene.activeCamera == this._userCamera) {
            this._scene.activeCamera.detachControl();
            this._gui.outro();

            if (this._playMode == 1) {
                this._userCamera.pullPosition();
                this._gui.build(true);
            }
        } else {
            this._playMode = 0;
        }
    }

    /**
     * Called on the object has been disposed.
     * Object can be disposed manually or when the editor stops running the scene.
     */
    public onStop(): void {
        // ...
    }

    public confirm(): void {
        this._gui.blank();
        this._scene.activeCamera = this._fixedAnimateOutroCamera;

        if (!this._exitAnim.isStarted) {
            this._exitAnim.start(false, 1.0, this._exitAnim.to, this._exitAnim.from, false);
        }
    }

    public cancel(): void {
        // TODO:
        this._playMode = 1;
        this._gui.build(true);
        this._scene.activeCamera.detachControl();
        this._scene.activeCamera = this._userCamera;
        this._scene.activeCamera.attachControl(this.getEngine().getRenderingCanvas(), false);
    }

    public l2g(t: Mesh | PlayerCamera | ArcRotateCamera): Vector3 {
        const matrix = t.computeWorldMatrix();
        const local_position = t.position;
        return Vector3.TransformCoordinates(local_position, matrix);
    }

    public l2gTarget(t: PlayerCamera | ArcRotateCamera): Vector3 {
        const matrix = t.computeWorldMatrix();
        const local_position = t.target;
        return Vector3.TransformCoordinates(local_position, matrix);
    }

    public async switchCamera(t: boolean) {
        // this._userCamera.setEnabled(t);

        if (t) {
            this._camPosTransition.setKeys([
                {
                    frame: 0,
                    value: this._birdCamera.position.clone()
                },
                {
                    frame: 60,
                    value: this._userCamera.position.clone()
                },
            ]);
            this._camLookTransition.setKeys([
                {
                    frame: 0,
                    value: this._birdCamera.target.clone()
                },
                {
                    frame: 60,
                    value: this._userCamera.target.clone()
                }
            ]);
            const ranim: Animatable = this._scene.beginDirectAnimation(this._birdCamera, [this._camPosTransition, this._camLookTransition], 0, 60, false);
            await ranim.waitAsync();

            this._scene.activeCamera = this._userCamera;
        } else {
            this._scene.activeCamera = this._birdCamera;

            this._camPosTransition.setKeys([
                {
                    frame: 0,
                    value: this._userCamera.position.clone()
                },
                {
                    frame: 60,
                    value: this._bCamOrig
                }
            ]);
            this._camLookTransition.setKeys([
                {
                    frame: 0,
                    value: this._userCamera.target.clone()
                },
                {
                    frame: 60,
                    value: this._bCamLookOrig
                }
            ]);
            this._scene.beginDirectAnimation(this._birdCamera, [this._camPosTransition, this._camLookTransition], 0, 60, false);
        }

        this._scene.activeCamera.detachControl();
        this._scene.activeCamera.attachControl(this._scene.getEngine().getRenderingCanvas(), false);
    }
}
