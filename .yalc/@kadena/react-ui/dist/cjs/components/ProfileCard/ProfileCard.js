"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileCard = void 0;
const ProfileCard_css_1 = require("./ProfileCard.css");
const Grid_1 = require("../Grid");
const Link_1 = require("../Link");
const Tag_1 = require("../Tag");
const react_1 = __importDefault(require("react"));
exports.default = {};
const ProfileCard = ({ name, title, imageSrc, tags = undefined, links = undefined, }) => {
    return (react_1.default.createElement("div", { className: ProfileCard_css_1.profileCardClass },
        react_1.default.createElement(Grid_1.Grid.Root, { columns: 12 },
            react_1.default.createElement(Grid_1.Grid.Item, { columnSpan: 2 },
                react_1.default.createElement("div", { className: ProfileCard_css_1.imageContainerClass },
                    react_1.default.createElement("img", { className: ProfileCard_css_1.imageClass, src: imageSrc, alt: name }))),
            react_1.default.createElement(Grid_1.Grid.Item, { columnSpan: 10 },
                react_1.default.createElement("p", { className: ProfileCard_css_1.boldTextClass }, name),
                react_1.default.createElement("p", null, title),
                tags && (react_1.default.createElement("ul", { className: ProfileCard_css_1.tagContainerClass }, tags.map((tag, i) => (react_1.default.createElement("li", { className: ProfileCard_css_1.tagClass, key: i },
                    react_1.default.createElement(Tag_1.Tag, { key: i }, tag)))))),
                links && (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("p", { className: ProfileCard_css_1.boldTextClass }, "Links"),
                    react_1.default.createElement("ul", { className: ProfileCard_css_1.linkContainerClass }, Object.entries(links).map(([text, href]) => (react_1.default.createElement("li", { key: text },
                        react_1.default.createElement(Link_1.Link, { href: href }, text)))))))))));
};
exports.ProfileCard = ProfileCard;
//# sourceMappingURL=ProfileCard.js.map