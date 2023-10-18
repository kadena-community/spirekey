"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileSummaryRoot = void 0;
const Tag_1 = require("../Tag");
const react_1 = __importDefault(require("react"));
const ProfileSummary_css_1 = require("./ProfileSummary.css");
const ProfileSummaryRoot = ({ name, title, imageSrc, tags = undefined, children, }) => {
    return (react_1.default.createElement("div", { className: ProfileSummary_css_1.containerClass },
        react_1.default.createElement("img", { className: ProfileSummary_css_1.imageClass, src: imageSrc, alt: name }),
        react_1.default.createElement("div", null,
            react_1.default.createElement("span", { className: ProfileSummary_css_1.boldTextClass }, name),
            react_1.default.createElement("span", null, title),
            tags && (react_1.default.createElement("ul", { className: ProfileSummary_css_1.tagContainerClass }, tags.map((tag, i) => (react_1.default.createElement("li", { className: ProfileSummary_css_1.tagClass, key: i },
                react_1.default.createElement(Tag_1.Tag, { key: i }, tag)))))),
            children && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("span", { className: ProfileSummary_css_1.boldTextClass }, "Links"),
                react_1.default.createElement("ul", { className: ProfileSummary_css_1.linkContainerClass }, children))))));
};
exports.ProfileSummaryRoot = ProfileSummaryRoot;
//# sourceMappingURL=ProfileSummaryRoot.js.map