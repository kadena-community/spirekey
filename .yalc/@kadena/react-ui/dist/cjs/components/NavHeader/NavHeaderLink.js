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
exports.NavHeaderLink = void 0;
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importStar(require("react"));
const NavHeader_css_1 = require("./NavHeader.css");
const NavHeaderNavigation_context_1 = require("./NavHeaderNavigation.context");
function hasPath(path, basePath) {
    return path.indexOf(basePath) === 0;
}
const NavHeaderLink = ({ children, onClick, asChild = false, href, ...restProps }) => {
    const ref = (0, react_1.useRef)(null);
    const { setGlowPosition, setActiveHref, activeHref } = (0, react_1.useContext)(NavHeaderNavigation_context_1.NavHeaderNavigationContext);
    const className = (0, classnames_1.default)(NavHeader_css_1.linkClass, {
        [NavHeader_css_1.activeLinkClass]: activeHref ? hasPath(activeHref, href) : false,
    });
    (0, react_1.useEffect)(() => {
        if (activeHref && hasPath(activeHref, href) && ref.current) {
            setGlowPosition(ref.current.getBoundingClientRect());
        }
    }, [activeHref, href, setGlowPosition]);
    const _onClick = (e) => {
        setGlowPosition(e.currentTarget.getBoundingClientRect());
        setActiveHref(href);
        if (onClick)
            onClick(e);
    };
    if (asChild && react_1.default.isValidElement(children)) {
        return react_1.default.cloneElement(children, {
            ...restProps,
            href,
            ...children.props,
            children: children.props.children,
            className: className,
            onClick: _onClick,
            ref,
        });
    }
    return (react_1.default.createElement("li", null,
        react_1.default.createElement("a", { ref: ref, className: className, onClick: _onClick, href: href, ...restProps }, children)));
};
exports.NavHeaderLink = NavHeaderLink;
//# sourceMappingURL=NavHeaderLink.js.map