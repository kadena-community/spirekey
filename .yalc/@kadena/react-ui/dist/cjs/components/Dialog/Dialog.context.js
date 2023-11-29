"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogContext = void 0;
const react_1 = require("react");
exports.DialogContext = (0, react_1.createContext)({
    titleProps: {},
    state: {
        isOpen: false,
        setOpen: (isOpen) => { },
        open: () => { },
        close: () => { },
        toggle: () => { },
    },
});
//# sourceMappingURL=Dialog.context.js.map