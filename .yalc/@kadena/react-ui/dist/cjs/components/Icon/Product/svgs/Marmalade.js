"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Marmalade = void 0;
const React = __importStar(require("react"));
const Marmalade = (props) => (React.createElement("svg", { width: 40, height: 40, viewBox: "0 0 40 40", xmlns: "http://www.w3.org/2000/svg", ...props },
    React.createElement("g", { clipPath: "url(#clip0_1407_2123)" },
        React.createElement("path", { d: "M35.5379 31.0947L27.9126 18.7789C27.7635 18.5383 27.5554 18.3397 27.308 18.2019C27.0606 18.0642 26.7821 17.9919 26.499 17.9919C26.2158 17.9919 25.9374 18.0642 25.69 18.2019C25.4426 18.3397 25.2344 18.5383 25.0853 18.7789L20 26.9895L14.9148 18.7789C14.7656 18.5383 14.5575 18.3397 14.3101 18.2019C14.0627 18.0642 13.7842 17.9919 13.5011 17.9919C13.2179 17.9919 12.9395 18.0642 12.6921 18.2019C12.4447 18.3397 12.2365 18.5383 12.0874 18.7789L4.46212 31.0947C4.30628 31.3465 4.22054 31.6354 4.21375 31.9314C4.20697 32.2274 4.27939 32.5199 4.42353 32.7786C4.56767 33.0372 4.7783 33.2527 5.03362 33.4026C5.28894 33.5526 5.57969 33.6316 5.8758 33.6316H34.1242C34.4203 33.6316 34.7111 33.5526 34.9664 33.4026C35.2217 33.2527 35.4324 33.0372 35.5765 32.7786C35.7206 32.5199 35.7931 32.2274 35.7863 31.9314C35.7795 31.6354 35.6937 31.3465 35.5379 31.0947Z", fill: "white" }),
        React.createElement("path", { d: "M18.8095 4.70346L14.5527 8.96024C13.8949 9.61797 13.8949 10.6844 14.5527 11.3421L18.8095 15.5989C19.4672 16.2566 20.5336 16.2566 21.1913 15.5989L25.4481 11.3421C26.1058 10.6844 26.1058 9.61797 25.4481 8.96024L21.1913 4.70346C20.5336 4.04574 19.4672 4.04574 18.8095 4.70346Z", fill: "white" }),
        React.createElement("g", { style: { mixBlendMode: 'multiply' } },
            React.createElement("path", { d: "M5.8758 33.6316H21.1274C21.4235 33.6316 21.7142 33.5526 21.9696 33.4026C22.2249 33.2527 22.4355 33.0372 22.5796 32.7786C22.7238 32.5199 22.7962 32.2274 22.7894 31.9314C22.7826 31.6354 22.6969 31.3465 22.5411 31.0947L14.9148 18.7789C14.7656 18.5383 14.5575 18.3397 14.3101 18.2019C14.0627 18.0642 13.7842 17.9919 13.5011 17.9919C13.2179 17.9919 12.9395 18.0642 12.6921 18.2019C12.4447 18.3397 12.2365 18.5383 12.0874 18.7789L4.46212 31.0947C4.30628 31.3465 4.22054 31.6354 4.21375 31.9314C4.20697 32.2274 4.27939 32.5199 4.42353 32.7786C4.56767 33.0372 4.7783 33.2527 5.03362 33.4026C5.28894 33.5526 5.57969 33.6316 5.8758 33.6316Z", fill: "#27B7E6" })),
        React.createElement("g", { style: { mixBlendMode: 'multiply' } },
            React.createElement("path", { d: "M18.8726 33.6316H34.1242C34.4203 33.6316 34.7111 33.5526 34.9664 33.4026C35.2217 33.2527 35.4323 33.0372 35.5765 32.7786C35.7206 32.5199 35.793 32.2274 35.7863 31.9314C35.7795 31.6354 35.6937 31.3465 35.5379 31.0947L27.9126 18.7789C27.7635 18.5383 27.5553 18.3397 27.3079 18.2019C27.0606 18.0642 26.7821 17.9919 26.4989 17.9919C26.2158 17.9919 25.9373 18.0642 25.6899 18.2019C25.4426 18.3397 25.2344 18.5383 25.0853 18.7789L17.4589 31.0947C17.3031 31.3465 17.2174 31.6354 17.2106 31.9314C17.2038 32.2274 17.2762 32.5199 17.4204 32.7786C17.5645 33.0372 17.7751 33.2527 18.0304 33.4026C18.2858 33.5526 18.5765 33.6316 18.8726 33.6316Z", fill: "#ED098F" })),
        React.createElement("g", { style: { mixBlendMode: 'multiply' } },
            React.createElement("path", { d: "M18.8095 4.70346L14.5527 8.96024C13.8949 9.61797 13.8949 10.6844 14.5527 11.3421L18.8095 15.5989C19.4672 16.2566 20.5336 16.2566 21.1913 15.5989L25.4481 11.3421C26.1058 10.6844 26.1058 9.61797 25.4481 8.96024L21.1913 4.70346C20.5336 4.04574 19.4672 4.04574 18.8095 4.70346Z", fill: "#66CC33" }))),
    React.createElement("defs", null,
        React.createElement("clipPath", { id: "clip0_1407_2123" },
            React.createElement("rect", { width: "40", height: "40", fill: "white" })))));
exports.Marmalade = Marmalade;
//# sourceMappingURL=Marmalade.js.map