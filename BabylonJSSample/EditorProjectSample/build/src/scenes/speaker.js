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
var Sepaker = /** @class */ (function (_super) {
    __extends(Sepaker, _super);
    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    function Sepaker() {
        var _this = this;
        _this._snd_fragments = {};
        return _this;
    }
    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    Sepaker.prototype.onInitialize = function () {
        // ...
    };
    /**
     * Called on the scene starts.
     */
    Sepaker.prototype.onStart = function () {
        this._playerMesh = this._scene.getMeshByName('tracker');
        this._birdCamera = this._scene.getCameraByName('birdCamera');
        this._snd_fragments["room_sound"] = new core_1.Sound("".concat(this.name, "_audio_room"), this._aurl ? this._aurl : '_streamingAssets/sampleA.mp3', this._scene, null, {
            loop: true,
            autoplay: false,
            spatialSound: false,
            // distanceModel: 'exponential',
            // rolloffFactor: 2
        });
        this._snd_fragments["room_sound"].setPosition(this.position);
        this._snd_fragments["transition_sound"] = new core_1.Sound("".concat(this.name, "_audio_transition"), this._aurl ? this._aurl : '_streamingAssets/sampleG.mp3', this._scene, null, {
            loop: false,
            autoplay: false,
            spatialSound: false,
        });
        // TODO:
        var segments = [
            this._segment_b,
            this._segment_c,
            this._segment_d,
            this._segment_e,
            this._segment_f,
        ];
        for (var _i = 0, segments_1 = segments; _i < segments_1.length; _i++) {
            var el = segments_1[_i];
            var mp3_name = el.name.split('_').map(function (s, i, a) { return i == a.length - 1 ? s.toUpperCase() : 'sample'; }).join('');
            this._snd_fragments[el.name] = new core_1.Sound("".concat(this.name, "_audio_").concat(el.name), "_streamingAssets/".concat(mp3_name, ".mp3"), this._scene, null, {
                loop: true,
                autoplay: false,
                spatialSound: false,
                volume: 0
                // useCustomAttenuation: true
            });
            // this._snd_fragments[el.name].attachToMesh(el);
        }
    };
    /**
     * Called each frame.
     */
    Sepaker.prototype.onUpdate = function () {
        var _this = this;
        // ...
        // TODO:
        [
            this._segment_b,
            this._segment_c,
            this._segment_d,
            this._segment_e,
            this._segment_f,
        ].forEach(function (seg) {
            if (_this._scene.activeCamera != _this._birdCamera && _this._playerMesh && seg.intersectsMesh(_this._playerMesh)) {
                _this._snd_fragments[seg.name].setVolume(0.7);
            }
            else {
                _this._snd_fragments[seg.name].setVolume(0);
            }
        });
    };
    /**
     * Called on the object has been disposed.
     * Object can be disposed manually or when the editor stops running the scene.
     */
    Sepaker.prototype.onStop = function () {
        // ...
    };
    Sepaker.prototype.unlockAndPlayAll = function () {
        // Object.keys(this._snd_fragments).forEach((k: string) => {
        //     console.log(k, this._snd_fragments[k].isPlaying);
        // });
        var _this = this;
        core_1.Engine.audioEngine.unlock();
        Object.values(this._snd_fragments).forEach(function (s) {
            if (!s.isPlaying) {
                s.autoplay = true;
                s.play();
            }
        });
        console.info('unlocked audio');
        Object.keys(this._snd_fragments).forEach(function (k) {
            console.log(k, _this._snd_fragments[k].isPlaying);
        });
    };
    __decorate([
        (0, decorators_1.visibleInInspector)("string", "Audio File URL", '')
    ], Sepaker.prototype, "_aurl", void 0);
    __decorate([
        (0, decorators_1.fromScene)('segment_b')
    ], Sepaker.prototype, "_segment_b", void 0);
    __decorate([
        (0, decorators_1.fromScene)('segment_c')
    ], Sepaker.prototype, "_segment_c", void 0);
    __decorate([
        (0, decorators_1.fromScene)('segment_d')
    ], Sepaker.prototype, "_segment_d", void 0);
    __decorate([
        (0, decorators_1.fromScene)('segment_e')
    ], Sepaker.prototype, "_segment_e", void 0);
    __decorate([
        (0, decorators_1.fromScene)('segment_f')
    ], Sepaker.prototype, "_segment_f", void 0);
    return Sepaker;
}(core_1.TransformNode));
exports.default = Sepaker;
//# sourceMappingURL=speaker.js.map