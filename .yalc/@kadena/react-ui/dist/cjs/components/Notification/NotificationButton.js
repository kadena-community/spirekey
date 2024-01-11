"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationButton = void 0;
const react_1 = __importDefault(require("react"));
const Notification_css_1 = require("./Notification.css");
const NotificationButton = ({ intent, onClick, children, icon, }) => {
    return (react_1.default.createElement("button", { onClick: onClick, className: Notification_css_1.actionButtonIntentVariants[intent] },
        children,
        react_1.default.createElement("span", { className: Notification_css_1.actionButtonIconClass }, icon)));
};
exports.NotificationButton = NotificationButton;
//# sourceMappingURL=NotificationButton.js.map