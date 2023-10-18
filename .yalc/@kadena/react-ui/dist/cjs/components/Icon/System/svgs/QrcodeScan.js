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
exports.QrcodeScan = void 0;
const React = __importStar(require("react"));
const QrcodeScan = (props) => (React.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", ...props },
    React.createElement("g", { clipPath: "url(#clip0_841_2285)" },
        React.createElement("path", { fill: "currentColor", d: "M4 4H10V10H4V4ZM20 4V10H14V4H20ZM14 15H16V13H14V11H16V13H18V11H20V13H18V15H20V18H18V20H16V18H13V20H11V16H14V15ZM16 15V18H18V15H16ZM4 20V14H10V20H4ZM6 6V8H8V6H6ZM16 6V8H18V6H16ZM6 16V18H8V16H6ZM4 11H6V13H4V11ZM9 11H13V15H11V13H9V11ZM11 6H13V10H11V6ZM2 2V6H0V2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0L6 0V2H2ZM22 0C22.5304 0 23.0391 0.210714 23.4142 0.585786C23.7893 0.960859 24 1.46957 24 2V6H22V2H18V0H22ZM2 18V22H6V24H2C1.46957 24 0.960859 23.7893 0.585786 23.4142C0.210714 23.0391 0 22.5304 0 22V18H2ZM22 22V18H24V22C24 22.5304 23.7893 23.0391 23.4142 23.4142C23.0391 23.7893 22.5304 24 22 24H18V22H22Z" })),
    React.createElement("defs", null,
        React.createElement("clipPath", null,
            React.createElement("rect", { width: 24, height: 24 })))));
exports.QrcodeScan = QrcodeScan;
//# sourceMappingURL=QrcodeScan.js.map