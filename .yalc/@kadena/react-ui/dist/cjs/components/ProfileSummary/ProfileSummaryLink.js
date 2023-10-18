"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileSummaryLink = void 0;
const Link_1 = require("../Link");
const react_1 = __importDefault(require("react"));
const ProfileSummaryLink = ({ children, ...restLinkProps }) => {
    return (react_1.default.createElement("li", null,
        react_1.default.createElement(Link_1.Link, { ...restLinkProps }, children)));
};
exports.ProfileSummaryLink = ProfileSummaryLink;
//# sourceMappingURL=ProfileSummaryLink.js.map