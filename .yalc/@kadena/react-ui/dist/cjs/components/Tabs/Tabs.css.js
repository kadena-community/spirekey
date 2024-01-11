"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tabContentClass = exports.selectorLine = exports.tabItemClass = exports.tabListClass = exports.tabListWrapperClass = exports.tabsContainerClass = void 0;
const atoms_css_1 = require("../../styles/atoms.css");
const contract_css_1 = require("../../styles/tokens/contract.css");
const css_1 = require("@vanilla-extract/css");
exports.tabsContainerClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    }),
]);
exports.tabListWrapperClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        overflowX: 'auto',
    }),
    {
        maxWidth: '100%',
        paddingLeft: '2px',
        paddingTop: '2px',
    },
]);
exports.tabListClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        display: 'inline-flex',
        flexDirection: 'row',
        position: 'relative',
    }),
    {
        minWidth: '100%',
        selectors: {
            '&::before': {
                position: 'absolute',
                display: 'block',
                content: '',
                bottom: '0',
                left: '0',
                right: '0',
                height: contract_css_1.tokens.kda.foundation.border.width.normal,
                backgroundColor: contract_css_1.tokens.kda.foundation.color.border.base.default,
            },
        },
    },
]);
exports.tabItemClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        border: 'none',
        cursor: 'pointer',
        paddingBlock: 'xs',
        paddingInline: 'sm',
        fontSize: 'md',
        fontWeight: 'bodyFont.bold',
        backgroundColor: 'transparent',
        color: 'text.base.default',
        outline: 'none',
        zIndex: 1,
    }),
    {
        opacity: '.6',
        whiteSpace: 'nowrap',
        selectors: {
            '&[data-selected="true"]': {
                opacity: '1',
                color: contract_css_1.tokens.kda.foundation.color.text.brand.primary.default,
            },
            '.focusVisible &:focus-visible': {
                borderTopLeftRadius: contract_css_1.tokens.kda.foundation.radius.sm,
                borderTopRightRadius: contract_css_1.tokens.kda.foundation.radius.sm,
                outline: `2px solid ${contract_css_1.tokens.kda.foundation.color.accent.brand.primary}`,
            },
        },
    },
]);
exports.selectorLine = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        position: 'absolute',
        display: 'block',
        height: '100%',
        bottom: 0,
        borderStyle: 'solid',
    }),
    {
        width: 0,
        borderWidth: 0,
        borderBottomWidth: contract_css_1.tokens.kda.foundation.border.width.normal,
        borderColor: contract_css_1.tokens.kda.foundation.color.accent.brand.primary,
        transition: 'transform .4s ease, width .4s ease',
        transform: `translateX(0)`,
    },
]);
exports.tabContentClass = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        marginBlock: 'md',
        fontSize: 'base',
        color: 'text.base.default',
        flex: 1,
        overflowY: 'auto',
    }),
]);
//# sourceMappingURL=Tabs.css.js.map