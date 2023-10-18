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
exports.History = void 0;
const React = __importStar(require("react"));
const History = (props) => (React.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", ...props },
    React.createElement("path", { fill: "currentColor", d: "M13.5 8H12V13L16.28 15.54L17 14.33L13.5 12.25V8ZM13 3C10.6131 3 8.32387 3.94821 6.63604 5.63604C4.94821 7.32387 4 9.61305 4 12H1L4.96 16.03L9 12H6C6 10.1435 6.7375 8.36301 8.05025 7.05025C9.36301 5.7375 11.1435 5 13 5C14.8565 5 16.637 5.7375 17.9497 7.05025C19.2625 8.36301 20 10.1435 20 12C20 13.8565 19.2625 15.637 17.9497 16.9497C16.637 18.2625 14.8565 19 13 19C11.07 19 9.32 18.21 8.06 16.94L6.64 18.36C8.27 20 10.5 21 13 21C15.3869 21 17.6761 20.0518 19.364 18.364C21.0518 16.6761 22 14.3869 22 12C22 9.61305 21.0518 7.32387 19.364 5.63604C17.6761 3.94821 15.3869 3 13 3" })));
exports.History = History;
//# sourceMappingURL=History.js.map