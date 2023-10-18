"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationButton = void 0;
const Icon_1 = require("../Icon");
const react_1 = __importDefault(require("react"));
const Notification_css_1 = require("./Notification.css");
const NotificationButton = ({ icon, color, onClick, children, }) => {
    const Icon = icon && Icon_1.SystemIcon[icon];
    return (react_1.default.createElement("button", { onClick: onClick, className: Notification_css_1.actionButtonColorVariants[color] },
        children,
        react_1.default.createElement(Icon, { size: "md" })));
};
exports.NotificationButton = NotificationButton;
//# sourceMappingURL=NotificationButton.js.map