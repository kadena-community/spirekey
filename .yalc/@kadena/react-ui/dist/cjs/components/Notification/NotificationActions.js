"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationActions = void 0;
const react_1 = __importDefault(require("react"));
const Notification_css_1 = require("./Notification.css");
const NotificationActions = ({ children, }) => react_1.default.createElement("div", { className: Notification_css_1.actionsContainerClass }, children);
exports.NotificationActions = NotificationActions;
//# sourceMappingURL=NotificationActions.js.map