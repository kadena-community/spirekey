"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoVariants = void 0;
const react_1 = __importDefault(require("react"));
const Kadena_1 = require("./svgs/Kadena");
const KadenaDevTools_1 = require("./svgs/KadenaDevTools");
const KadenaDocs_1 = require("./svgs/KadenaDocs");
exports.logoVariants = ['Kadena', 'DevTools', 'Docs'];
const renderSwitch = (logo = 'Kadena') => {
    switch (logo) {
        case 'Docs':
            return KadenaDocs_1.KadenaDocsLogo;
        case 'DevTools':
            return KadenaDevTools_1.KadenaDevToolsLogo;
        case 'Kadena':
        default:
            return Kadena_1.KadenaLogo;
    }
};
const BrandLogo = ({ variant }) => {
    const LogoComponent = renderSwitch(variant);
    return react_1.default.createElement(LogoComponent, null);
};
exports.default = BrandLogo;
//# sourceMappingURL=index.js.map