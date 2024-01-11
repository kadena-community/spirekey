"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useGlow = () => {
    const glowRef = (0, react_1.useRef)(null);
    const navRef = (0, react_1.useRef)(null);
    const initialGlowPosition = -40;
    const [glowX, setGlowX] = (0, react_1.useState)(initialGlowPosition);
    const prevGlowX = (0, react_1.useRef)(glowX);
    const setGlowPosition = (targetBounds) => {
        var _a, _b, _c;
        prevGlowX.current = glowX;
        const glowBounds = (_a = glowRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        const headerBounds = (_c = (_b = navRef.current) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.getBoundingClientRect();
        if (glowBounds && headerBounds) {
            const glowX = targetBounds.x + initialGlowPosition * 2.25;
            setGlowX(glowX);
        }
    };
    return {
        animationDuration: glowX === 0 ? 0 : Math.abs(glowX - prevGlowX.current) * 2,
        glowRef,
        glowX,
        setGlowPosition,
        navRef,
    };
};
exports.default = useGlow;
//# sourceMappingURL=useGlow.js.map