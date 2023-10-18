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
exports.KadenaLogo = void 0;
const React = __importStar(require("react"));
const KadenaLogo = () => (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "40", height: "40", viewBox: "0 0 40 40", fill: "none" },
    React.createElement("g", { clipPath: "url(#clip0_3_15)" },
        React.createElement("path", { d: "M31.5523 6.62952H23.7098L14.4796 16.3155V24.3859L31.5523 6.62952Z", fill: "url(#paint0_linear_3_15)" }),
        React.createElement("path", { d: "M14.4796 33.3705H7.8501V6.62952H14.4796V33.3705Z", fill: "white" }),
        React.createElement("path", { d: "M32.1499 33.3705L21.256 17.3386L16.8195 21.9499L24.4518 33.3705H32.1499Z", fill: "url(#paint1_linear_3_15)" })),
    React.createElement("defs", null,
        React.createElement("linearGradient", { id: "paint0_linear_3_15", x1: "14.4796", y1: "15.5077", x2: "31.5523", y2: "15.5077", gradientUnits: "userSpaceOnUse" },
            React.createElement("stop", null),
            React.createElement("stop", { offset: "0.6", stopColor: "white" })),
        React.createElement("linearGradient", { id: "paint1_linear_3_15", x1: "15.5989", y1: "20.6432", x2: "29.3973", y2: "29.6024", gradientUnits: "userSpaceOnUse" },
            React.createElement("stop", null),
            React.createElement("stop", { offset: "0.6", stopColor: "white" })),
        React.createElement("clipPath", { id: "clip0_3_15" },
            React.createElement("rect", { width: "40", height: "40", fill: "white" })))));
exports.KadenaLogo = KadenaLogo;
//# sourceMappingURL=Kadena.js.map