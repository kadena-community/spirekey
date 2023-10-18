"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentHeader = void 0;
const Icon_1 = require("../Icon");
const Typography_1 = require("../Typography");
const react_1 = __importDefault(require("react"));
const ContentHeader_css_1 = require("./ContentHeader.css");
const ContentHeader = ({ icon, heading, description, }) => {
    const Icon = icon && Icon_1.SystemIcon[icon];
    return (react_1.default.createElement("div", { className: ContentHeader_css_1.containerClass },
        react_1.default.createElement(Icon, { size: "md" }),
        react_1.default.createElement(Typography_1.Heading, { as: "h4" }, heading),
        description ? (react_1.default.createElement("div", { className: ContentHeader_css_1.descriptionClass },
            react_1.default.createElement(Typography_1.Text, { as: "p" }, description))) : null));
};
exports.ContentHeader = ContentHeader;
//# sourceMappingURL=ContentHeader.js.map