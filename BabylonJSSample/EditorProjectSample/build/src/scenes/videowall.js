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
var VideoWall = /** @class */ (function (_super) {
    __extends(VideoWall, _super);
    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    function VideoWall() {
        var _this = this;
        return _this;
    }
    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    VideoWall.prototype.onInitialize = function () {
        // ...
    };
    /**
     * Called on the scene starts.
     */
    VideoWall.prototype.onStart = function () {
        // const planeOpts = {
        //     height: 5.4762,
        //     width: 7.3967,
        //     sideOrientation: Mesh.DOUBLESIDE
        // };
        // const vPlane: Mesh = MeshBuilder.CreatePlane("plane", planeOpts, this._scene);
        // vPlane.parent = this.parent;
        // vPlane.position = this.position;
        // TWEAKS|TODO: GLTF-imported double sided planes do not work well..
        // const fp: Mesh = this.clone(`${this.name}_flip`);
        // fp.translate(new Vector3(this._zOffset ? 0 : 1, 0, this._zOffset ? 1 : 0), this._amount);
        // fp.rotate(new Vector3(0, 1, 0), 180 * (Math.PI / 180));
        var VideoMat = new core_1.StandardMaterial("m", this._scene);
        var VideoSource = this._vurl ? this._vurl : '_streamingAssets/003.mp4';
        // if (
        //     /ipod|ipad|iphone|macintosh/.test(navigator.userAgent.toLowerCase()) &&
        //         'ontouchend' in document) {
        //     VideoSource = VideoSource.replace(/(.*)\.webm$/, '$1.mp4');
        // }
        // if (!MediaSource.isTypeSupported('video/webm; codecs="vp9, vorbis"')) {
        //     VideoSource = VideoSource.replace(/(.*)\.webm$/, '$1.mp4');
        // }
        // TODO: force to use mp4
        VideoSource = VideoSource.replace(/(.*)\.webm$/, '$1.mp4');
        var VideoTex = new core_1.VideoTexture("".concat(this.name, "_videotex"), VideoSource, this._scene);
        VideoTex.wAng = 90 * (Math.PI / 180);
        VideoMat.diffuseTexture = VideoTex;
        VideoMat.roughness = 1;
        VideoMat.emissiveColor = core_1.Color3.White();
        VideoMat.backFaceCulling = false;
        this.overrideMaterialSideOrientation = core_1.Mesh.DOUBLESIDE;
        this.material = VideoMat;
        // TWEAKS|TODO: GLTF-imported double sided planes do not work well..
        // if (this._doubleSide) {
        //     fp.overrideMaterialSideOrientation = Mesh.FRONTSIDE;
        //     fp.material = VideoMat;
        // }
        VideoTex.video.play();
    };
    /**
     * Called each frame.
     */
    VideoWall.prototype.onUpdate = function () {
        // ...
    };
    /**
     * Called on the object has been disposed.
     * Object can be disposed manually or when the editor stops running the scene.
     */
    VideoWall.prototype.onStop = function () {
        // ...
    };
    /**
     * Called on a message has been received and sent from a graph.
     * @param message defines the name of the message sent from the graph.
     * @param data defines the data sent in the message.
     * @param sender defines the reference to the graph class that sent the message.
     */
    VideoWall.prototype.onMessage = function (name, data, sender) {
        switch (name) {
            case "myMessage":
                // Do something...
                break;
        }
    };
    __decorate([
        (0, decorators_1.visibleInInspector)("string", "Video URL", '')
    ], VideoWall.prototype, "_vurl", void 0);
    __decorate([
        (0, decorators_1.visibleInInspector)("boolean", "Double Side", true)
    ], VideoWall.prototype, "_doubleSide", void 0);
    __decorate([
        (0, decorators_1.visibleInInspector)("boolean", "Use Z Offset", false)
    ], VideoWall.prototype, "_zOffset", void 0);
    __decorate([
        (0, decorators_1.visibleInInspector)("number", "Offset Amount", 0.1)
    ], VideoWall.prototype, "_amount", void 0);
    return VideoWall;
}(core_1.Mesh));
exports.default = VideoWall;
//# sourceMappingURL=videowall.js.map