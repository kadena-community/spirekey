"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const Card_css_1 = require("./Card.css");
const Card = ({ children, fullWidth, stack, disabled, }) => {
    const classList = (0, classnames_1.default)(Card_css_1.container, {
        [Card_css_1.stackClass]: stack,
        [Card_css_1.fullWidthClass]: fullWidth,
        [Card_css_1.disabledClass]: disabled,
    });
    if (disabled) {
        return (react_1.default.createElement("div", { className: classList, "data-testid": "kda-card" }, react_1.default.Children.map(children, (child) => {
            if (react_1.default.isValidElement(child)) {
                const filteredChild = { ...child, props: child.props };
                return react_1.default.cloneElement(filteredChild, { disabled: true });
            }
            return child;
        })));
    }
    return (react_1.default.createElement("div", { className: classList, "data-testid": "kda-card" }, children));
};
exports.Card = Card;
//# sourceMappingURL=Card.js.map