"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccordionContext = exports.initialOpenSections = void 0;
const react_1 = require("react");
exports.initialOpenSections = [];
exports.AccordionContext = (0, react_1.createContext)({
    openSections: exports.initialOpenSections,
    setOpenSections: () => { },
    linked: false,
});
//# sourceMappingURL=Accordion.context.js.map