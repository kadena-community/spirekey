"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withVerticallyCenteredStory = exports.withHorizontallyCenteredStory = exports.withCenteredStory = exports.withNotCenteredStory = void 0;
const react_1 = __importDefault(require("react"));
const CenteredStory = ({ horizontal, vertical, children, }) => {
    return (react_1.default.createElement("div", { style: {
            minHeight: '100%',
            width: '100%',
            display: 'flex',
            alignItems: vertical ? 'center' : 'flex-start',
            justifyContent: horizontal ? 'center' : 'flex-start',
            overflow: 'none',
        } }, children));
};
const withNotCenteredStory = (story) => (react_1.default.createElement(CenteredStory, null, story()));
exports.withNotCenteredStory = withNotCenteredStory;
const withCenteredStory = (story) => (react_1.default.createElement(CenteredStory, { horizontal: true, vertical: true }, story()));
exports.withCenteredStory = withCenteredStory;
const withHorizontallyCenteredStory = (story) => (react_1.default.createElement(CenteredStory, { horizontal: true }, story()));
exports.withHorizontallyCenteredStory = withHorizontallyCenteredStory;
const withVerticallyCenteredStory = (story) => (react_1.default.createElement(CenteredStory, { vertical: true }, story()));
exports.withVerticallyCenteredStory = withVerticallyCenteredStory;
//# sourceMappingURL=withCenteredStory.js.map