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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@babylonjs/core");
// import { visibleInInspector } from "./decorators";
var VideoWalls = /** @class */ (function (_super) {
    __extends(VideoWalls, _super);
    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    function VideoWalls() {
        var _this = this;
        return _this;
    }
    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    VideoWalls.prototype.onInitialize = function () {
        // ...
    };
    /**
     * Called on the scene starts.
     */
    VideoWalls.prototype.onStart = function () {
        var _this = this;
        this._children.forEach(function (el) {
            var VideoMat = new core_1.StandardMaterial("v_mat_".concat(el.name), _this._scene);
            var VideoSource = "_streamingAssets/".concat(el.name.replace('s_', ''), ".mp4");
            var VideoTex = new core_1.VideoTexture("v_tex_".concat(el.name), VideoSource, _this._scene);
            VideoTex.wAng = 90 * (Math.PI / 180);
            VideoMat.diffuseTexture = VideoTex;
            VideoMat.roughness = 1;
            VideoMat.emissiveColor = core_1.Color3.White();
            VideoMat.backFaceCulling = false;
            el.overrideMaterialSideOrientation = core_1.Mesh.DOUBLESIDE;
            el.material = VideoMat;
            el.checkCollisions = true;
            el.ellipsoid = new core_1.Vector3(0.5, 1.0, 0.5);
            el.ellipsoidOffset = new core_1.Vector3(0, 0, 0);
            VideoTex.video.play();
        });
    };
    /**
     * Called each frame.
     */
    VideoWalls.prototype.onUpdate = function () {
        // ...
    };
    /**
     * Called on the object has been disposed.
     * Object can be disposed manually or when the editor stops running the scene.
     */
    VideoWalls.prototype.onStop = function () {
        // ...
    };
    return VideoWalls;
}(core_1.Mesh));
exports.default = VideoWalls;
//# sourceMappingURL=videowalls.js.map