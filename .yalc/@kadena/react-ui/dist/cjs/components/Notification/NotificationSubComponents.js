"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationFooter = exports.NotificationHeading = void 0;
const react_1 = __importDefault(require("react"));
const Notification_css_1 = require("./Notification.css");
const NotificationHeading = ({ children, ...restProps }) => (react_1.default.createElement("h5", { className: Notification_css_1.titleClass, ...restProps }, children));
exports.NotificationHeading = NotificationHeading;
const NotificationFooter = ({ children, }) => react_1.default.createElement("div", { className: Notification_css_1.actionsContainerClass }, children);
exports.NotificationFooter = NotificationFooter;
//# sourceMappingURL=NotificationSubComponents.js.map