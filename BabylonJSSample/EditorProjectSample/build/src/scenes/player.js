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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@babylonjs/core");
var decorators_1 = require("./decorators");
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
var PlayerCamera = /** @class */ (function (_super) {
    __extends(PlayerCamera, _super);
    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    function PlayerCamera() {
        var _this = this;
        return _this;
    }
    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    PlayerCamera.prototype.onInitialize = function () {
        // ...
        this._vt = core_1.MeshBuilder.CreateSphere('tracker');
        this._vt.visibility = 0;
        this._vt.parent = this;
        this._initPos = this.position.clone();
    };
    /**
     * Called on the scene starts.
     */
    PlayerCamera.prototype.onStart = function () {
        var _this = this;
        // ...
        var inputsManager = this.inputs;
        var tInput = new core_1.FreeCameraTouchInput();
        tInput.singleFingerRotate = true;
        tInput.touchAngularSensibility = 8000;
        // tInput.touchMoveSensibility = 1000;
        inputsManager.add(tInput);
        // - accereleration
        // TODO: for mobile dvice touch operation
        this._orgSpeed = this.speed;
        this._currentSpeed = this.speed;
        this._maxSpeed = this.speed * 2.5;
        this._scene.onKeyboardObservable.add(function (kInfo) {
            if (kInfo.type == core_1.KeyboardEventTypes.KEYDOWN && kInfo.event.shiftKey) {
                _this.speed = _this._maxSpeed;
            }
            else if (kInfo.type == core_1.KeyboardEventTypes.KEYUP && kInfo.event.shiftKey) {
                _this.speed = _this._orgSpeed;
            }
        });
        // --
    };
    /**
     * Called each frame.
     */
    PlayerCamera.prototype.onUpdate = function () {
        // ...
    };
    /**
     * Called on the object has been disposed.
     * Object can be disposed manually or when the editor stops running the scene.
     */
    PlayerCamera.prototype.onStop = function () {
        // ...
    };
    PlayerCamera.prototype.initPosition = function () {
        this.position = this._initPos.clone();
    };
    PlayerCamera.prototype.pullPosition = function () {
        this.setTarget(new core_1.Vector3(0, 1, 0));
        this.position.addInPlace(this.getForwardRay(3).direction);
    };
    __decorate([
        (0, decorators_1.fromScene)('exit')
    ], PlayerCamera.prototype, "_exit", void 0);
    return PlayerCamera;
}(core_1.FreeCamera));
exports.default = PlayerCamera;
//# sourceMappingURL=player.js.map