"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.treeBranchWrapperVariant = exports.treeToggleVariant = exports.treeToggleClass = exports.treeTitleVariant = exports.treeTitleClass = exports.treeTitleClassWrapper = exports.treeWrapperClass = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const css_1 = require("@vanilla-extract/css");
exports.treeWrapperClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        color: '$foreground',
    }),
]);
exports.treeTitleClassWrapper = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'flex',
    }),
]);
exports.treeTitleClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        marginLeft: '$1',
    }),
]);
exports.treeTitleVariant = (0, css_1.styleVariants)({
    isParent: [
        (0, sprinkles_css_1.sprinkles)({
            fontSize: '$base',
        }),
    ],
    isChild: [
        (0, sprinkles_css_1.sprinkles)({
            fontSize: '$sm',
        }),
    ],
});
exports.treeToggleClass = (0, css_1.style)([
    {
        border: 'none',
        background: 'none',
        outline: 'none',
    },
]);
exports.treeToggleVariant = (0, css_1.styleVariants)({
    opened: [{ transform: 'rotate(0deg)' }],
    closed: [{ transform: 'rotate(-90deg)' }],
});
exports.treeBranchWrapperVariant = (0, css_1.styleVariants)({
    isParent: [
        (0, sprinkles_css_1.sprinkles)({
            marginLeft: 0,
        }),
    ],
    isChild: [
        (0, sprinkles_css_1.sprinkles)({
            marginLeft: '$4',
        }),
    ],
});
//# sourceMappingURL=Tree.css.js.map