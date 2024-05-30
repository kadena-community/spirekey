"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signWithSpireKey = exports.onSpireKeyEvent = exports.initSpireKey = exports.connectWithSpireKey = void 0;
var iframe = document.createElement('iframe');
var backdrop = document.createElement('div');
var showBackdrop = function () {
    document.body.appendChild(backdrop);
    requestAnimationFrame(function () {
        backdrop.classList.add('spirekey-backdrop-visible');
    });
};
var closeSidebar = function () {
    iframe.classList.remove('spirekey-sidebar-opened');
    backdrop.classList.remove('spirekey-backdrop-visible');
    backdrop.addEventListener('transitionend', function () {
        backdrop.remove();
    });
};
var connectWithSpireKey = function () {
    showBackdrop();
    iframe.classList.add('spirekey-sidebar-opened');
};
exports.connectWithSpireKey = connectWithSpireKey;
var signWithSpireKey = function (transaction) {
    showBackdrop();
    iframe.classList.add('spirekey-sidebar-opened');
    iframe.src = "http://localhost:1337/embedded/sidebar/#transaction=".concat(transaction);
};
exports.signWithSpireKey = signWithSpireKey;
var onSpireKeyEvent = function (callback) {
    window.addEventListener('message', function (event) {
        var _a;
        if (((_a = event.data) === null || _a === void 0 ? void 0 : _a.source) === 'kadena-spirekey') {
            callback(event.data);
        }
    });
};
exports.onSpireKeyEvent = onSpireKeyEvent;
var initSpireKey = function () {
    window.addEventListener('message', function (event) {
        if (event.data.source && event.data.source === 'kadena-spirekey') {
            console.log("Message received from embedded (".concat(event.data.name, "): ").concat(JSON.stringify(event.data.payload, null, 2)));
        }
    });
    var style = document.createElement('style');
    style.textContent = "\n    .spirekey-sidebar {\n      border: 0;\n      width: 500px;\n      height: 100%;\n      position: fixed;\n      right: 0;\n      top: 0;\n      z-index: 999999;\n      transform: translateX(100%);\n      transition: transform 400ms ease-in-out;\n    }\n\n    .spirekey-sidebar-opened {\n      transform: translateX(0%);\n    }\n\n    .spirekey-backdrop {\n      position: fixed;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n      background-color: rgba(0, 0, 0, 0.4);\n      opacity: 0;\n      transition: opacity 400ms ease-in-out;\n    }\n\n    .spirekey-backdrop-visible {\n      z-index: 999998;\n      opacity: 1;\n    }\n  ";
    document.head.appendChild(style);
    iframe.className = 'spirekey-sidebar';
    iframe.src = 'http://localhost:1337/embedded/sidebar';
    document.body.appendChild(iframe);
    backdrop.className = 'spirekey-backdrop';
    backdrop.addEventListener('click', closeSidebar);
};
exports.initSpireKey = initSpireKey;
