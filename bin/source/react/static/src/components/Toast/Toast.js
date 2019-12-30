"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var raf = require("raf");
var React = require("react");
var Icon_1 = require("./Icon");
var PropsType_1 = require("./PropsType");
var Toast = (function (_super) {
    __extends(Toast, _super);
    function Toast() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Toast.prototype.componentDidMount = function () {
        var _this = this;
        this.fade(PropsType_1.Animation.In, function () {
            if (_this.props.type !== PropsType_1.Type.Loading) {
                _this.startTimer();
            }
        });
    };
    Toast.prototype.fade = function (type, callback) {
        var _this = this;
        var last = Date.now();
        var tick = function () {
            var opacity = Number(_this.ele.style.opacity);
            _this.ele.style.opacity =
                type === PropsType_1.Animation.In
                    ? (opacity + (Date.now() - last) / 400).toString()
                    : (opacity - (Date.now() - last) / 400).toString();
            last = Date.now();
            if ((type === PropsType_1.Animation.In && +_this.ele.style.opacity < 1) ||
                (type === PropsType_1.Animation.Out && +_this.ele.style.opacity > 0)) {
                raf(tick);
            }
            else {
                callback();
            }
        };
        raf(tick);
    };
    Toast.prototype.render = function () {
        var _this = this;
        var _a = this.props, type = _a.type, content = _a.content;
        return (React.createElement("div", { className: "light-toast-mask" },
            React.createElement("span", { className: "light-toast-message" + (type === PropsType_1.Type.Info ? '' : ' icon'), ref: function (ref) {
                    _this.ele = ref;
                } },
                type !== PropsType_1.Type.Info && (React.createElement("div", { className: "light-toast-icon-wrapper" },
                    React.createElement(Icon_1.default, { type: type }))),
                content)));
    };
    Toast.prototype.startTimer = function () {
        var _this = this;
        var _a = this.props, duration = _a.duration, onClose = _a.onClose;
        setTimeout(function () {
            _this.fade(PropsType_1.Animation.Out, onClose);
        }, duration);
    };
    Toast.defaultProps = {
        duration: 3000
    };
    return Toast;
}(React.PureComponent));
exports.default = Toast;
