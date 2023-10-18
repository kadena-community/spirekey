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
exports.Circle = void 0;
const React = __importStar(require("react"));
const Circle = (props) => (React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", ...props },
    React.createElement("path", { d: "M8.00002 6.66666C7.6464 6.66666 7.30726 6.80713 7.05721 7.05718C6.80716 7.30723 6.66669 7.64637 6.66669 7.99999C6.66669 8.73999 7.26669 9.33332 8.00002 9.33332C8.74002 9.33332 9.33335 8.73999 9.33335 7.99999C9.33335 7.64637 9.19288 7.30723 8.94283 7.05718C8.69278 6.80713 8.35364 6.66666 8.00002 6.66666Z" })));
exports.Circle = Circle;
//# sourceMappingURL=Circle.js.map