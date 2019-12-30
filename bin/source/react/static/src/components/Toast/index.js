"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var PropsType_1 = require("./PropsType");
var Toast_1 = require("./Toast");
if (typeof window !== 'undefined') {
    var styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerHTML = "\n    .light-toast-mask {\n      position: fixed;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n      display: -webkit-flex;\n      display: flex;\n      -webkit-align-items: center;\n      align-items: center;\n      -webkit-box-pack: center;\n      justify-content: center;\n      background: transparent;\n      z-index: 1999;\n    }\n\n    .light-toast-message {\n      display: inline-block;\n      max-width: 80%;\n      min-width: 95px;\n      line-height: 1.5;\n      padding: 9px 15px;\n      box-sizing: border-box;\n      text-align: center;\n      word-break: break-all;\n      font-size: 14px;\n      color: #fff;\n      background-color: rgba(58, 58, 58, 0.9);\n      border-radius: 3px;\n      opacity: 0;\n    }\n\n    .light-toast-message.icon {\n      padding: 15px;\n      border-radius: 5px;\n    }\n\n    .light-toast-icon-wrapper {\n      margin: 0 auto 10px;\n      width: 36px;\n      height: 36px;\n    }\n\n    .light-toast-loading {\n      display: inline-block;\n      width: 30px;\n      height: 30px;\n      border: 2px solid #ccc;\n      border-left-color: #108ee9;\n      border-radius: 50%;\n      -webkit-animation: loading .45s linear infinite;\n      animation: loading .45s linear infinite;\n    }\n\n    @-webkit-keyframes loading {\n      100% {\n        -webkit-transform: rotate(360deg);\n        transform: rotate(360deg);\n      }\n    }\n  \n    @keyframes loading {\n      100% {\n        -webkit-transform: rotate(360deg);\n        transform: rotate(360deg);\n      }\n    }";
    document.head.appendChild(styleSheet);
}
var toastInstance = null;
function notice(type, _a) {
    var content = _a.content, duration = _a.duration, onClose = _a.onClose;
    if (toastInstance) {
        toastInstance.fade(PropsType_1.Animation.Out, function () {
            toastInstance.props.onClose();
            render(onClose);
        });
    }
    else {
        render(onClose);
    }
    function render(callback) {
        var container = document.createElement('div');
        document.body.appendChild(container);
        var component = (React.createElement(Toast_1.default, { type: type, content: content, duration: duration, onClose: function () {
                ReactDOM.unmountComponentAtNode(container);
                document.body.removeChild(container);
                if (callback) {
                    callback();
                }
            }, ref: function (ref) {
                toastInstance = ref;
            } }));
        ReactDOM.render(component, container);
    }
}
exports.default = {
    info: function (content, duration, onClose) {
        notice(PropsType_1.Type.Info, { content: content, duration: duration, onClose: onClose });
    },
    success: function (content, duration, onClose) {
        notice(PropsType_1.Type.Success, { content: content, duration: duration, onClose: onClose });
    },
    fail: function (content, duration, onClose) {
        notice(PropsType_1.Type.Fail, { content: content, duration: duration, onClose: onClose });
    },
    loading: function (content, onClose) {
        notice(PropsType_1.Type.Loading, { content: content, onClose: onClose });
    },
    hide: function () {
        if (toastInstance) {
          setTimeout(_=>{
            toastInstance.fade(PropsType_1.Animation.Out, toastInstance.props.onClose);
            toastInstance = null;
          },500)
        }
    }
};
