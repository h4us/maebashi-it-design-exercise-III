"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@babylonjs/core");
var decorators_1 = require("./decorators");
var gui_1 = require("../gui");
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
var Room = /** @class */ (function (_super) {
    __extends(Room, _super);
    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    function Room() {
        var _this = this;
        _this._playMode = 0;
        return _this;
    }
    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    Room.prototype.onInitialize = function () {
        // ...
        this._gui = new gui_1.CMCGui('cmc-gui', this._scene);
        this._gui.blank();
        this._birdCamera = new core_1.ArcRotateCamera('birdCamera', Math.PI / 3, Math.PI / 3, 10, new core_1.Vector3(-100, 300, -100), this._scene);
        this._birdCamera.setTarget(core_1.Vector3.Zero());
    };
    /**
     * Called on the scene starts.
     */
    Room.prototype.onStart = function () {
        var _this = this;
        // ...
        this._playerMesh = this._scene.getMeshByName('tracker');
        this._wall_east.enableEdgesRendering();
        this._wall_east.edgesWidth = 8.0;
        this._wall_east.edgesColor = new core_1.Color4(0.05, 0.05, 0.05, 1);
        this._wall_east.checkCollisions = true;
        this._wall_east.ellipsoid = new core_1.Vector3(0.5, 1.0, 0.5);
        this._wall_east.ellipsoidOffset = new core_1.Vector3(0, 0, 0);
        this._wall_west.enableEdgesRendering();
        this._wall_west.edgesWidth = 8.0;
        this._wall_west.edgesColor = new core_1.Color4(0.05, 0.05, 0.05, 1);
        this._wall_west.checkCollisions = true;
        this._wall_west.ellipsoid = new core_1.Vector3(0.5, 1.0, 0.5);
        this._wall_west.ellipsoidOffset = new core_1.Vector3(0, 0, 0);
        this._entranceAnim = this._scene.getAnimationGroupByName('CameraAction.002');
        this._entranceAnim.onAnimationEndObservable.add(function () {
            var matrix = _this._fixedAnimateCamera.computeWorldMatrix();
            var local_position = _this._fixedAnimateCamera.position;
            var global_position = core_1.Vector3.TransformCoordinates(local_position, matrix);
            _this._userCamera.position = global_position;
            _this._scene.activeCamera = _this._userCamera;
            _this._gui.build();
            // this._cpps = new ScreenSpaceReflectionPostProcess('ussr', this._scene, 1.0, this._userCamera);
            // this._cpps.reflectionSamples = 32;
            // this._cpps.strength = 1;
            // this._cpps.reflectionSpecularFalloffExponent = 1;
            // one shot!
            _this._entranceAnim.dispose();
        });
        this._exitAnim = this._scene.getAnimationGroupByName('CameraAction.001');
        this._exitAnim.onAnimationEndObservable.add(function () {
            window.location.href = '';
        });
        this._scene.activeCamera = this._fixedAnimateCamera;
        this._bCamOrig = this._birdCamera.position.clone();
        this._bCamLookOrig = this._birdCamera.target.clone();
        this._camPosTransition = new core_1.Animation('camPos', 'position', 60, core_1.Animation.ANIMATIONTYPE_VECTOR3, core_1.Animation.ANIMATIONLOOPMODE_CONSTANT);
        this._camLookTransition = new core_1.Animation('camLook', 'target', 60, core_1.Animation.ANIMATIONTYPE_VECTOR3, core_1.Animation.ANIMATIONLOOPMODE_CONSTANT);
        var easingFunction = new core_1.CircleEase();
        easingFunction.setEasingMode(core_1.EasingFunction.EASINGMODE_EASEINOUT);
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
        var uit = function (e) {
            // console.log('tap',  e.target, e.currentTarget);
            if (!_this._entranceAnim.isStarted) {
                _this._gui.blank();
                _this._entranceAnim.start(false, 1.0, _this._entranceAnim.from, _this._entranceAnim.to, false);
                // window.removeEventListener('click', uit);
                document.removeEventListener('click', uit);
            }
        };
        // window.addEventListener('click', uit);
        document.addEventListener('click', uit);
        this._gui.intro();
    };
    /**
     * Called each frame.
     */
    Room.prototype.onUpdate = function () {
        // ...
        // TODO: improve
        if (this._playerMesh.intersectsMesh(this._exit, true) && this._scene.activeCamera == this._userCamera) {
            this._scene.activeCamera.detachControl();
            this._gui.outro();
            if (this._playMode == 1) {
                this._userCamera.pullPosition();
                this._gui.build(true);
            }
        }
        else {
            this._playMode = 0;
        }
    };
    /**
     * Called on the object has been disposed.
     * Object can be disposed manually or when the editor stops running the scene.
     */
    Room.prototype.onStop = function () {
        // ...
    };
    Room.prototype.confirm = function () {
        this._gui.blank();
        this._scene.activeCamera = this._fixedAnimateOutroCamera;
        if (!this._exitAnim.isStarted) {
            this._exitAnim.start(false, 1.0, this._exitAnim.to, this._exitAnim.from, false);
        }
    };
    Room.prototype.cancel = function () {
        // TODO:
        this._playMode = 1;
        this._gui.build(true);
        this._scene.activeCamera.detachControl();
        this._scene.activeCamera = this._userCamera;
        this._scene.activeCamera.attachControl(this.getEngine().getRenderingCanvas(), false);
    };
    Room.prototype.l2g = function (t) {
        var matrix = t.computeWorldMatrix();
        var local_position = t.position;
        return core_1.Vector3.TransformCoordinates(local_position, matrix);
    };
    Room.prototype.l2gTarget = function (t) {
        var matrix = t.computeWorldMatrix();
        var local_position = t.target;
        return core_1.Vector3.TransformCoordinates(local_position, matrix);
    };
    Room.prototype.switchCamera = function (t) {
        return __awaiter(this, void 0, void 0, function () {
            var ranim;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!t) return [3 /*break*/, 2];
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
                        ranim = this._scene.beginDirectAnimation(this._birdCamera, [this._camPosTransition, this._camLookTransition], 0, 60, false);
                        return [4 /*yield*/, ranim.waitAsync()];
                    case 1:
                        _a.sent();
                        this._scene.activeCamera = this._userCamera;
                        return [3 /*break*/, 3];
                    case 2:
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
                        _a.label = 3;
                    case 3:
                        this._scene.activeCamera.detachControl();
                        this._scene.activeCamera.attachControl(this._scene.getEngine().getRenderingCanvas(), false);
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, decorators_1.fromScene)('Camera.001')
    ], Room.prototype, "_fixedAnimateCamera", void 0);
    __decorate([
        (0, decorators_1.fromScene)('Camera.002')
    ], Room.prototype, "_fixedAnimateOutroCamera", void 0);
    __decorate([
        (0, decorators_1.fromScene)('camera')
    ], Room.prototype, "_userCamera", void 0);
    __decorate([
        (0, decorators_1.fromScene)('exit')
    ], Room.prototype, "_exit", void 0);
    __decorate([
        (0, decorators_1.fromScene)('wall_east')
    ], Room.prototype, "_wall_east", void 0);
    __decorate([
        (0, decorators_1.fromScene)('wall_west')
    ], Room.prototype, "_wall_west", void 0);
    return Room;
}(core_1.Mesh));
exports.default = Room;
//# sourceMappingURL=room.js.map