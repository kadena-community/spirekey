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
exports.Notification = void 0;
const SystemIcon_1 = require("../Icon/System/SystemIcon");
const react_1 = __importStar(require("react"));
const Notification_css_1 = require("./Notification.css");
const Notification = ({ children, isDismissable = false, intent, displayStyle, onDismiss, icon, role, }) => {
    const [isDismissed, setIsDismissed] = (0, react_1.useState)(false);
    if (isDismissed)
        return null;
    return (react_1.default.createElement("div", { className: (0, Notification_css_1.notificationRecipe)({
            intent,
            displayStyle,
        }), role: role },
        react_1.default.createElement("span", { className: Notification_css_1.iconClass }, icon ? icon : react_1.default.createElement(SystemIcon_1.Information, { size: "md" })),
        react_1.default.createElement("div", { className: Notification_css_1.contentClass }, children),
        isDismissable && (react_1.default.createElement("button", { className: Notification_css_1.closeButtonClass, onClick: () => {
                setIsDismissed(true);
                onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss();
            }, "aria-label": "Close Notification" },
            react_1.default.createElement(SystemIcon_1.Close, { size: "md" })))));
};
exports.Notification = Notification;
//# sourceMappingURL=Notification.js.map