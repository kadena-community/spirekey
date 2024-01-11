"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const user_event_1 = __importDefault(require("@testing-library/user-event"));
const react_2 = __importStar(require("react"));
const NewButton_1 = require("./NewButton");
const vitest_1 = require("vitest");
(0, vitest_1.describe)('Button', () => {
    const onPressSpy = vitest_1.vi.fn();
    const onPressStartSpy = vitest_1.vi.fn();
    const onPressEndSpy = vitest_1.vi.fn();
    const onPressUpSpy = vitest_1.vi.fn();
    const onPressChangeSpy = vitest_1.vi.fn();
    (0, vitest_1.afterEach)(() => {
        onPressSpy.mockClear();
    });
    (0, vitest_1.it)('should handle defaults', async () => {
        const user = user_event_1.default.setup({ pointerEventsCheck: 0 });
        const { getByRole, getByText } = (0, react_1.render)(react_2.default.createElement(NewButton_1.Button, { onPress: onPressSpy }, "Click Me"));
        const button = getByRole('button');
        await user.click(button);
        (0, vitest_1.expect)(onPressSpy).toHaveBeenCalledTimes(1);
        const text = getByText('Click Me');
        (0, vitest_1.expect)(text).not.toBeNull();
    });
    (0, vitest_1.it)('Should support press events', async () => {
        const user = user_event_1.default.setup({ pointerEventsCheck: 0 });
        const { getByRole, getByText } = (0, react_1.render)(react_2.default.createElement(NewButton_1.Button, { onPress: onPressSpy, onPressStart: onPressStartSpy, onPressEnd: onPressEndSpy, onPressUp: onPressUpSpy, onPressChange: onPressChangeSpy }, "Click Me"));
        const button = getByRole('button');
        await user.click(button);
        (0, vitest_1.expect)(onPressStartSpy).toHaveBeenCalledTimes(1);
        (0, vitest_1.expect)(onPressSpy).toHaveBeenCalledTimes(1);
        (0, vitest_1.expect)(onPressEndSpy).toHaveBeenCalledTimes(1);
        (0, vitest_1.expect)(onPressUpSpy).toHaveBeenCalledTimes(1);
        (0, vitest_1.expect)(onPressChangeSpy).toHaveBeenCalledTimes(2);
        const text = getByText('Click Me');
        (0, vitest_1.expect)(text).not.toBeNull();
    });
    (0, vitest_1.it)('Should allow custom props to be passed through to the button', () => {
        const { getByRole } = (0, react_1.render)(react_2.default.createElement(NewButton_1.Button, { "data-foo": "bar" }, "Click Me"));
        const button = getByRole('button');
        (0, vitest_1.expect)(button).toHaveAttribute('data-foo', 'bar');
    });
    (0, vitest_1.it)('Should support aria-label', () => {
        const { getByRole } = (0, react_1.render)(react_2.default.createElement(NewButton_1.Button, { "aria-label": "Test" }));
        const button = getByRole('button');
        (0, vitest_1.expect)(button).toHaveAttribute('aria-label', 'Test');
    });
    (0, vitest_1.it)('Should support aria-labelledby', () => {
        const { getByRole } = (0, react_1.render)(react_2.default.createElement(react_2.default.Fragment, null,
            react_2.default.createElement("span", { id: "test" }, "Test"),
            react_2.default.createElement(NewButton_1.Button, { "aria-labelledby": "test" })));
        const button = getByRole('button');
        (0, vitest_1.expect)(button).toHaveAttribute('aria-labelledby', 'test');
    });
    (0, vitest_1.it)('Should support aria-describedby', () => {
        const { getByRole } = (0, react_1.render)(react_2.default.createElement(react_2.default.Fragment, null,
            react_2.default.createElement("span", { id: "test" }, "Test"),
            react_2.default.createElement(NewButton_1.Button, { "aria-describedby": "test" }, "Hi")));
        const button = getByRole('button');
        (0, vitest_1.expect)(button).toHaveAttribute('aria-describedby', 'test');
    });
    (0, vitest_1.it)('Should allow a custom className on the button', () => {
        const { getByRole } = (0, react_1.render)(react_2.default.createElement(NewButton_1.Button, { className: "x-men-first-class" }, "Click Me"));
        const button = getByRole('button');
        (0, vitest_1.expect)(button.getAttribute('class')).toEqual(vitest_1.expect.stringContaining('x-men-first-class'));
    });
    (0, vitest_1.it)('Should handle deprecated onClick', async () => {
        const user = user_event_1.default.setup({ pointerEventsCheck: 0 });
        const spyWarn = vitest_1.vi.spyOn(console, 'warn').mockImplementation(() => { });
        const { getByRole } = (0, react_1.render)(react_2.default.createElement(NewButton_1.Button, { onClick: onPressSpy }, "Click Me"));
        const button = getByRole('button');
        await user.click(button);
        (0, vitest_1.expect)(onPressSpy).toHaveBeenCalledTimes(1);
        (0, vitest_1.expect)(spyWarn).toHaveBeenCalledWith('onClick is deprecated, please use onPress');
    });
    (0, vitest_1.it)('Should not respond when disabled', async () => {
        const user = user_event_1.default.setup({ pointerEventsCheck: 0 });
        const { getByRole } = (0, react_1.render)(react_2.default.createElement(NewButton_1.Button, { onPress: onPressSpy, isDisabled: true }, "Click Me"));
        const button = getByRole('button');
        await user.click(button);
        (0, vitest_1.expect)(button).toBeDisabled();
        (0, vitest_1.expect)(onPressSpy).not.toHaveBeenCalled();
    });
    (0, vitest_1.it)('Should support autoFocus', () => {
        const { getByRole } = (0, react_1.render)(react_2.default.createElement(NewButton_1.Button, { autoFocus: true }, "Click Me"));
        const button = getByRole('button');
        (0, vitest_1.expect)(document.activeElement).toBe(button);
    });
    (0, vitest_1.it)('Should display a spinner when isLoading prop is true', async () => {
        const user = user_event_1.default.setup({ pointerEventsCheck: 0 });
        const onPressSpy = vitest_1.vi.fn();
        const TestComponent = () => {
            const [pending, setPending] = (0, react_2.useState)(false);
            return (react_2.default.createElement(NewButton_1.Button, { onPress: (e) => {
                    setPending(true);
                    onPressSpy();
                }, isLoading: pending }, "Click me"));
        };
        const { getByRole, queryByRole } = (0, react_1.render)(react_2.default.createElement(TestComponent, null));
        const button = getByRole('button');
        (0, vitest_1.expect)(button).not.toHaveAttribute('aria-disabled');
        await user.click(button);
        (0, vitest_1.expect)(button).toHaveAttribute('aria-disabled', 'true');
        const spinner = queryByRole('progressbar');
        (0, vitest_1.expect)(spinner).toBeVisible();
        await user.click(button);
        (0, vitest_1.expect)(onPressSpy).toHaveBeenCalledTimes(1);
    });
});
//# sourceMappingURL=NewButton.spec.js.map