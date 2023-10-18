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
exports.Transition = void 0;
const React = __importStar(require("react"));
const Transition = (props) => (React.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", ...props },
    React.createElement("g", null,
        React.createElement("path", { d: "M15 2C16.8565 2 18.637 2.7375 19.9497 4.05025C21.2625 5.36301 22 7.14348 22 9C22 11.71 20.46 14.05 18.22 15.22C17.55 16.5 16.5 17.55 15.22 18.22C14.05 20.46 11.71 22 9 22C7.14348 22 5.36301 21.2625 4.05025 19.9497C2.7375 18.637 2 16.8565 2 15C2 12.29 3.54 9.95 5.78 8.78C6.45 7.5 7.5 6.45 8.78 5.78C9.95 3.54 12.29 2 15 2ZM12 19C10.1435 19 8.36301 18.2625 7.05025 16.9497C5.7375 15.637 5 13.8565 5 12C4.37 12.84 4 13.87 4 15C4 16.3261 4.52678 17.5979 5.46447 18.5355C6.40215 19.4732 7.67392 20 9 20C10.13 20 11.16 19.63 12 19ZM15 16C13.1435 16 11.363 15.2625 10.0503 13.9497C8.7375 12.637 8 10.8565 8 9C7.37 9.84 7 10.87 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.13 17 14.16 16.63 15 16ZM15 4C13.87 4 12.84 4.37 12 5C13.8565 5 15.637 5.7375 16.9497 7.05025C18.2625 8.36301 19 10.1435 19 12C19.63 11.16 20 10.13 20 9C20 7.67392 19.4732 6.40215 18.5355 5.46447C17.5979 4.52678 16.3261 4 15 4ZM10 9C10 10.3261 10.5268 11.5979 11.4645 12.5355C12.4021 13.4732 13.6739 14 15 14C15.6 14 16.17 13.9 16.7 13.7C16.9 13.17 17 12.6 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7C11.4 7 10.83 7.1 10.3 7.3C10.1 7.83 10 8.4 10 9Z" }))));
exports.Transition = Transition;
//# sourceMappingURL=Transition.js.map