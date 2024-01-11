"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Legend = exports.sharedStoryArgTypes = exports.defaultBoxArgs = void 0;
const Typography_1 = require("../Typography");
const contract_css_1 = require("../../styles/tokens/contract.css");
const react_1 = __importDefault(require("react"));
const Box_1 = require("./Box");
const Stack_1 = require("./Stack");
exports.defaultBoxArgs = {
    alignItems: undefined,
    borderRadius: undefined,
    bottom: undefined,
    cursor: undefined,
    display: undefined,
    flex: undefined,
    flexDirection: undefined,
    flexGrow: undefined,
    flexShrink: undefined,
    flexWrap: undefined,
    gap: undefined,
    height: undefined,
    inset: undefined,
    justifyContent: undefined,
    left: undefined,
    margin: undefined,
    marginBlock: undefined,
    marginBlockEnd: undefined,
    marginBlockStart: undefined,
    marginInline: undefined,
    marginInlineEnd: undefined,
    marginInlineStart: undefined,
    maxWidth: undefined,
    minWidth: undefined,
    overflow: undefined,
    padding: undefined,
    paddingBlock: undefined,
    paddingBlockEnd: undefined,
    paddingBlockStart: undefined,
    paddingInline: undefined,
    paddingInlineEnd: undefined,
    paddingInlineStart: undefined,
    position: undefined,
    right: undefined,
    textAlign: undefined,
    top: undefined,
    width: undefined,
    zIndex: undefined,
};
const spaceOptions = [undefined, ...Object.keys(contract_css_1.tokens.kda.foundation.spacing)];
const marginOptions = [...spaceOptions, 'auto'];
exports.sharedStoryArgTypes = {
    overflow: {
        options: ['hidden', 'visible', 'scroll', 'auto'],
        control: {
            type: 'select',
        },
        description: 'Overflow css property.',
    },
    gap: {
        options: spaceOptions,
    },
    width: {
        options: [undefined, '100%'],
        control: {
            type: 'select',
        },
    },
    minWidth: {
        options: [undefined, 'content.minWidth'],
        control: {
            type: 'select',
        },
    },
    maxWidth: {
        options: [undefined, 'content.maxWidth'],
        control: {
            type: 'select',
        },
    },
    height: {
        options: [undefined, '100%'],
        control: {
            type: 'select',
        },
    },
    margin: {
        options: marginOptions,
        control: {
            type: 'select',
        },
    },
    marginInline: {
        options: marginOptions,
        control: {
            type: 'select',
        },
    },
    marginBlock: {
        options: marginOptions,
        control: {
            type: 'select',
        },
    },
    marginBlockStart: {
        options: marginOptions,
        control: {
            type: 'select',
        },
    },
    marginBlockEnd: {
        options: marginOptions,
        control: {
            type: 'select',
        },
    },
    marginInlineStart: {
        options: marginOptions,
        control: {
            type: 'select',
        },
    },
    marginInlineEnd: {
        options: marginOptions,
        control: {
            type: 'select',
        },
    },
    padding: {
        options: spaceOptions,
        control: {
            type: 'select',
        },
    },
    paddingInline: {
        options: spaceOptions,
        control: {
            type: 'select',
        },
    },
    paddingBlock: {
        options: spaceOptions,
        control: {
            type: 'select',
        },
    },
    paddingBlockStart: {
        options: spaceOptions,
        control: {
            type: 'select',
        },
    },
    paddingBlockEnd: {
        options: spaceOptions,
        control: {
            type: 'select',
        },
    },
    paddingInlineStart: {
        options: spaceOptions,
        control: {
            type: 'select',
        },
    },
    paddingInlineEnd: {
        options: spaceOptions,
        control: {
            type: 'select',
        },
    },
};
const Legend = ({ items }) => {
    return (react_1.default.createElement(Stack_1.Stack, { as: "ul", style: { listStyle: 'none', padding: 0 }, gap: "lg", position: "absolute", right: 0, bottom: 0, marginBlock: "sm", marginInline: "md" }, items.map(({ color, label }) => (react_1.default.createElement(Stack_1.Stack, { as: "li", key: label, alignItems: "center", gap: "sm" },
        react_1.default.createElement(Box_1.Box, { style: { width: 15, height: 15 }, backgroundColor: `semantic.${color}.default`, borderColor: "base.bold", borderStyle: "solid", borderWidth: "hairline" }),
        react_1.default.createElement(Typography_1.Text, null, label))))));
};
exports.Legend = Legend;
//# sourceMappingURL=storyComponents.js.map