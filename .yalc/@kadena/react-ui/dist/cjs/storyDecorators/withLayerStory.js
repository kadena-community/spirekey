"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onLayer3 = exports.onLayer2 = exports.onLayer1 = exports.onBase = void 0;
const Typography_1 = require("../components/Typography");
const atoms_css_1 = require("../styles/atoms.css");
const react_1 = __importDefault(require("react"));
const WithLayerStory = ({ children, layer }) => {
    return (react_1.default.createElement("div", { className: (0, atoms_css_1.atoms)({
            position: 'relative',
            backgroundColor: `${layer}.default`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            padding: 'xxxl',
        }), style: { minHeight: '20rem' } },
        react_1.default.createElement(Typography_1.Text, { variant: "base", bold: true, className: (0, atoms_css_1.atoms)({
                position: 'absolute',
                top: 0,
                left: 0,
                margin: 'md',
                marginBlock: 'sm',
            }) }, layer),
        children));
};
const onBase = (story) => (react_1.default.createElement(WithLayerStory, { layer: "base" }, story()));
exports.onBase = onBase;
const onLayer1 = (story) => (react_1.default.createElement(WithLayerStory, { layer: "layer-1" }, story()));
exports.onLayer1 = onLayer1;
const onLayer2 = (story) => (react_1.default.createElement(WithLayerStory, { layer: "layer-2" }, story()));
exports.onLayer2 = onLayer2;
const onLayer3 = (story) => (react_1.default.createElement(WithLayerStory, { layer: "layer-3" }, story()));
exports.onLayer3 = onLayer3;
//# sourceMappingURL=withLayerStory.js.map