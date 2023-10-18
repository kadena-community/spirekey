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
exports.ReceiverInactive = void 0;
const React = __importStar(require("react"));
const ReceiverInactive = (props) => (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 40, height: 40, viewBox: "0 0 40 40", ...props },
    React.createElement("g", { clipPath: "url(#receiver-icon-inactive_svg__a)" },
        React.createElement("path", { fill: "#fff", d: "M6.29 31.815V8.185A1.866 1.866 0 0 1 9.14 6.598L22.6 14.93a6.696 6.696 0 1 1 .016 10.128L9.139 33.402a1.866 1.866 0 0 1-2.848-1.587Z" }),
        React.createElement("path", { fill: "#9EA1A6", d: "M26.988 26.684a6.696 6.696 0 1 0 0-13.391 6.696 6.696 0 0 0 0 13.391Z", style: {
                mixBlendMode: 'multiply',
            } }),
        React.createElement("path", { fill: "#9EA1A6", d: "M6.29 8.185v23.63a1.866 1.866 0 0 0 2.849 1.587l19.085-11.815a1.868 1.868 0 0 0 0-3.174L9.14 6.598A1.866 1.866 0 0 0 6.29 8.185Z", style: {
                mixBlendMode: 'multiply',
            } })),
    React.createElement("defs", null,
        React.createElement("clipPath", { id: "receiver-icon-inactive_svg__a" },
            React.createElement("path", { fill: "#fff", d: "M0 0h40v40H0z" })))));
exports.ReceiverInactive = ReceiverInactive;
//# sourceMappingURL=ReceiverInactive.js.map