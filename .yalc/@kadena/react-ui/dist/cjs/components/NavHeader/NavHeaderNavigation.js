"use strict";
'use client';
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
exports.NavHeaderNavigation = void 0;
const react_1 = __importStar(require("react"));
const NavHeader_css_1 = require("./NavHeader.css");
const NavHeaderNavigation_context_1 = require("./NavHeaderNavigation.context");
const glow_1 = require("./svg/glow");
const useGlow_1 = __importDefault(require("./useGlow"));
const NavHeaderNavigation = ({ children, activeHref, }) => {
    const [_activeHref, setActiveHref] = (0, react_1.useState)(activeHref);
    const { glowX, animationDuration, glowRef, navRef, setGlowPosition } = (0, useGlow_1.default)();
    (0, react_1.useEffect)(() => {
        if (activeHref !== _activeHref) {
            setActiveHref(activeHref);
        }
    }, [activeHref]);
    return (react_1.default.createElement(NavHeaderNavigation_context_1.NavHeaderNavigationContext.Provider, { value: { setGlowPosition, activeHref: _activeHref, setActiveHref } },
        react_1.default.createElement("nav", { className: NavHeader_css_1.navWrapperClass, ref: navRef, "aria-label": "main", dir: "ltr" },
            react_1.default.createElement("div", { role: "none", className: NavHeader_css_1.glowClass, ref: glowRef, style: {
                    opacity: 1,
                    transform: `translateX(${glowX}px)`,
                    transitionDuration: `${animationDuration}ms`,
                } },
                react_1.default.createElement(glow_1.NavGlow, null)),
            react_1.default.createElement("ul", { className: NavHeader_css_1.navListClass }, children))));
};
exports.NavHeaderNavigation = NavHeaderNavigation;
//# sourceMappingURL=NavHeaderNavigation.js.map