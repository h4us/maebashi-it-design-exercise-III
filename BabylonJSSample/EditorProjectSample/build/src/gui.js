"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
exports.CMCGui = void 0;
var core_1 = require("@babylonjs/core");
var octions = require("@primer/octicons");
var preact_1 = require("preact");
var hooks_1 = require("preact/hooks");
var htm_1 = require("htm");
var html = htm_1.default.bind(preact_1.h);
function TextButton(props) {
    var handleClick = function (e, command) {
        var r = props.scene.getMeshByName('__root__');
        if (r) {
            if (command == 'confirm') {
                r.confirm();
            }
            else if (command == 'cancel') {
                r.cancel();
            }
        }
        e.preventDefault();
    };
    (0, hooks_1.useEffect)(function () {
    }, []);
    return html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<a class=\"text-orange-800 bg-white/90 rounded-md px-6 py-2\" href=\"#\" onClick=", ">", "</a>"], ["<a class=\"text-orange-800 bg-white/90 rounded-md px-6 py-2\" href=\"#\" onClick=", ">", "</a>"])), function (e) { return handleClick(e, props.command); }, props.btnText);
}
function HelpButton(props) {
    var _a = (0, hooks_1.useState)(props.showHelp), t = _a[0], setT = _a[1];
    var onRef = (0, hooks_1.useRef)(null);
    var offRef = (0, hooks_1.useRef)(null);
    var hRef = (0, hooks_1.useRef)(document.querySelector('#help'));
    var setTProxy = function () {
        setT(function (v) { return !v; });
    };
    (0, hooks_1.useEffect)(function () {
        if (hRef.current) {
            if (t) {
                hRef.current.classList.add('hidden');
            }
            else {
                hRef.current.classList.remove('hidden');
            }
        }
    }, [t]);
    (0, hooks_1.useEffect)(function () {
        if (onRef.current) {
            onRef.current.innerHTML = octions['question'].toSVG({
                class: 'inline-block',
                width: 42,
                'aria-label': 'show help'
            });
        }
        if (offRef.current) {
            offRef.current.innerHTML = octions['x-circle'].toSVG({
                class: 'inline-block',
                width: 42,
                'aria-label': 'close help'
            });
        }
        if (hRef.current) {
            hRef.current.addEventListener('click', setTProxy);
        }
        return function () {
            hRef.current.removeEventListener('click', setTProxy);
        };
    }, []);
    return html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<a class=\"text-white fill-white bg-zinc-700/75 rounded-md p-2 mb-2\" href=\"#\" onClick=", ">\n<span class=", " ref=", "></span>\n<span class=", " ref=", "></span>\n</a>"], ["<a class=\"text-white fill-white bg-zinc-700/75 rounded-md p-2 mb-2\" href=\"#\" onClick=", ">\n<span class=", " ref=", "></span>\n<span class=", " ref=", "></span>\n</a>"])), function (e) { setT(function (v) { return !v; }); e.preventDefault(); }, t ? 'hidden' : 'inline-block', offRef, t ? 'inline-block' : 'hidden', onRef);
}
function ViewButton(props) {
    var _a = (0, hooks_1.useState)(true), t = _a[0], setT = _a[1];
    var onRef = (0, hooks_1.useRef)(null);
    var offRef = (0, hooks_1.useRef)(null);
    (0, hooks_1.useEffect)(function () {
        var r = props.scene.getMeshByName('__root__');
        r.switchCamera(t);
    }, [t]);
    (0, hooks_1.useEffect)(function () {
        if (onRef.current) {
            onRef.current.innerHTML = octions['device-camera-video'].toSVG({
                class: 'inline-block',
                width: 42,
                'aria-label': 'switch view mode'
            });
        }
        if (offRef.current) {
            offRef.current.innerHTML = octions['eye'].toSVG({
                class: 'inline-block',
                width: 42,
                'aria-label': 'switch view mode'
            });
        }
    }, []);
    return html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<a class=\"text-white fill-white fill-white bg-zinc-700/75 rounded-md p-2 mb-2\" href=\"#\" onClick=", ">\n<span class=", " ref=", "></span>\n<span class=", " ref=", "></span>\n</a>"], ["<a class=\"text-white fill-white fill-white bg-zinc-700/75 rounded-md p-2 mb-2\" href=\"#\" onClick=", ">\n<span class=", " ref=", "></span>\n<span class=", " ref=", "></span>\n</a>"])), function (e) { setT(function (v) { return !v; }); e.preventDefault(); }, t ? 'hidden' : 'inline-block', offRef, t ? 'inline-block' : 'hidden', onRef);
}
var CMCGui = /** @class */ (function (_super) {
    __extends(CMCGui, _super);
    function CMCGui() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CMCGui.prototype.blank = function () {
        (0, preact_1.render)(html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n<section>\n</section>"], ["\n<section>\n</section>"]))), document.getElementById('gui'));
    };
    CMCGui.prototype.build = function (withHelp) {
        if (withHelp === void 0) { withHelp = false; }
        if (document.querySelector('#babylonjsLoadingDiv')) {
            document.querySelector('#babylonjsLoadingDiv').remove();
        }
        (0, preact_1.render)(html(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n<section class=\"flex w-0 flex-wrap justify-items-center p-4\">\n<", " scene=", " showHelp=", "/>\n<", " scene=", " />\n</section>"], ["\n<section class=\"flex w-0 flex-wrap justify-items-center p-4\">\n<", " scene=", " showHelp=", "/>\n<", " scene=", " />\n</section>"])), HelpButton, this._scene, withHelp, ViewButton, this._scene), document.getElementById('gui'));
    };
    CMCGui.prototype.outro = function () {
        (0, preact_1.render)(html(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n<section class=\"h-screen w-full bg-zinc-700/75 flex flex-col justify-center items-center p-4\">\n<h2 class=\"text-white text-xl mb-4 font-bold\">Exit?</h2>\n<div class=\"flex justify-around w-[12rem]\">\n<", " scene=", " btnText=\"Yes\" command=\"confirm\" />\n<", " scene=", " btnText=\"No\" command=\"cancel\" />\n</div>\n</section>"], ["\n<section class=\"h-screen w-full bg-zinc-700/75 flex flex-col justify-center items-center p-4\">\n<h2 class=\"text-white text-xl mb-4 font-bold\">Exit?</h2>\n<div class=\"flex justify-around w-[12rem]\">\n<", " scene=", " btnText=\"Yes\" command=\"confirm\" />\n<", " scene=", " btnText=\"No\" command=\"cancel\" />\n</div>\n</section>"])), TextButton, this._scene, TextButton, this._scene), document.getElementById('gui'));
    };
    CMCGui.prototype.intro = function () {
        (0, preact_1.render)(html(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n<section class=\"h-screen w-full bg-zinc-700/30 flex flex-col justify-center items-center p-4\">\n<h2 class=\"text-white text-xl mb-4 font-bold\">Click / Tap to Start</h2>\n</section>"], ["\n<section class=\"h-screen w-full bg-zinc-700/30 flex flex-col justify-center items-center p-4\">\n<h2 class=\"text-white text-xl mb-4 font-bold\">Click / Tap to Start</h2>\n</section>"]))), document.getElementById('gui'));
    };
    return CMCGui;
}(core_1.TransformNode));
exports.CMCGui = CMCGui;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=gui.js.map