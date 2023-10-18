"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationContainer = void 0;
const Icon_1 = require("../Icon");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const Notification_css_1 = require("./Notification.css");
const NotificationContainer = ({ icon, title, children, hasCloseButton = false, color = 'info', expanded = false, onClose, variant = 'standard', inline = false, }) => {
    const Icon = icon ? Icon_1.SystemIcon[icon] : Icon_1.SystemIcon.HelpCircle;
    const inlineVariantsClass = Notification_css_1.inlineVariants[inline ? 'true' : 'false'];
    const classList = (0, classnames_1.default)(Notification_css_1.containerClass, Notification_css_1.cardColorVariants[color], Notification_css_1.displayVariants[variant], Notification_css_1.expandVariants[expanded ? 'true' : 'false'], inlineVariantsClass);
    const contentClassList = (0, classnames_1.default)(Notification_css_1.contentClass, inlineVariantsClass);
    const descriptionClassList = (0, classnames_1.default)(Notification_css_1.descriptionClass, inlineVariantsClass);
    return (react_1.default.createElement("div", { className: classList },
        react_1.default.createElement("div", { className: Notification_css_1.containerWrapperClass },
            react_1.default.createElement(Icon, { size: "md" }),
            react_1.default.createElement("div", { className: contentClassList },
                title && react_1.default.createElement("span", { className: Notification_css_1.titleClass }, title),
                react_1.default.createElement("div", { className: descriptionClassList }, children)),
            hasCloseButton && (react_1.default.createElement("button", { className: Notification_css_1.closeButtonClass, onClick: onClose, "aria-label": "Close Notification" },
                react_1.default.createElement(Icon_1.SystemIcon.Close, { size: "md" }))))));
};
exports.NotificationContainer = NotificationContainer;
//# sourceMappingURL=NotificationContainer.js.map