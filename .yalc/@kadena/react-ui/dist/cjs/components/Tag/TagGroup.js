"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagGroup = void 0;
const Label_1 = require("../Typography/Label/Label");
const react_1 = __importDefault(require("react"));
const react_aria_1 = require("react-aria");
const react_stately_1 = require("react-stately");
const InternalTagItem_1 = require("./InternalTagItem");
const Tag_css_1 = require("./Tag.css");
const TagGroup = ({ tagAsChild, className, ...restProps }) => {
    const { label } = restProps;
    const ref = react_1.default.useRef(null);
    const state = (0, react_stately_1.useListState)(restProps);
    const { gridProps, labelProps } = (0, react_aria_1.useTagGroup)(restProps, state, ref);
    return (react_1.default.createElement("div", { className: className },
        label && (react_1.default.createElement("div", { ...labelProps }, typeof label === 'string' ? (react_1.default.createElement(Label_1.Label, { className: Tag_css_1.tagGroupLabelClass }, label)) : (label))),
        react_1.default.createElement("div", { ...gridProps, ref: ref, className: Tag_css_1.tagListClass }, [...state.collection].map((item) => (react_1.default.createElement(InternalTagItem_1.InternalTagItem, { key: item.key, item: item, state: state, asChild: tagAsChild }, item.rendered))))));
};
exports.TagGroup = TagGroup;
//# sourceMappingURL=TagGroup.js.map