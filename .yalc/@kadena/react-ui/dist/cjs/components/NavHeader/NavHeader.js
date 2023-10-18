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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavHeaderContainer = void 0;
const BrandLogo_1 = __importStar(require("../BrandLogo"));
const Link_1 = require("../Link");
const react_1 = __importDefault(require("react"));
const NavHeader_css_1 = require("./NavHeader.css");
const NavHeaderContainer = ({ brand = BrandLogo_1.logoVariants[0], children, }) => {
    return (react_1.default.createElement("header", { className: NavHeader_css_1.containerClass },
        BrandLogo_1.logoVariants.includes(brand) && (react_1.default.createElement("div", { className: NavHeader_css_1.logoClass },
            react_1.default.createElement(Link_1.Link, { href: "/", target: "_self" },
                react_1.default.createElement(BrandLogo_1.default, { variant: brand })))),
        children));
};
exports.NavHeaderContainer = NavHeaderContainer;
//# sourceMappingURL=NavHeader.js.map