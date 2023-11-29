"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDialog = void 0;
const react_1 = require("react");
const Dialog_context_1 = require("./Dialog.context");
const useDialog = () => (0, react_1.useContext)(Dialog_context_1.DialogContext);
exports.useDialog = useDialog;
//# sourceMappingURL=useDialog.js.map