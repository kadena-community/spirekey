"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Select_1 = require("../Select");
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
describe('Select', () => {
    it('renders without errors', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(Select_1.Select, { id: "select-without-errors", value: "1", onChange: () => { }, ariaLabel: "select" },
            react_2.default.createElement("option", { value: "1" }, "Option 1"),
            react_2.default.createElement("option", { value: "2" }, "Option 2")));
        const selectContainer = getByTestId('kda-select');
        expect(selectContainer).toBeInTheDocument();
    });
    it('renders the provided children options', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(Select_1.Select, { id: "renders-child-options", value: "1", onChange: () => { }, ariaLabel: "select" },
            react_2.default.createElement("option", { value: "1" }, "Option 1"),
            react_2.default.createElement("option", { value: "2" }, "Option 2")));
        const selectContainer = getByTestId('kda-select');
        const selectElement = selectContainer.querySelector('select');
        const option1 = selectContainer.querySelector('option[value="1"]');
        const option2 = selectContainer.querySelector('option[value="2"]');
        expect(selectElement).toBeInTheDocument();
        expect(option1).toBeInTheDocument();
        expect(option2).toBeInTheDocument();
    });
    it('invokes the onChange event handler when an option is selected', () => {
        const handleChange = jest.fn();
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(Select_1.Select, { id: "on-change-select", value: "1", onChange: handleChange, ariaLabel: "select" },
            react_2.default.createElement("option", { value: "1" }, "Option 1"),
            react_2.default.createElement("option", { value: "2" }, "Option 2")));
        const selectContainer = getByTestId('kda-select');
        const selectElement = selectContainer.querySelector('select');
        react_1.fireEvent.change(selectElement, { target: { value: '2' } });
        expect(handleChange).toHaveBeenCalledTimes(1);
    });
    it('disables the select element when disabled prop is true', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(Select_1.Select, { id: "disabled-select", value: "1", onChange: () => { }, disabled: true, ariaLabel: "select" },
            react_2.default.createElement("option", { value: "1" }, "Option 1"),
            react_2.default.createElement("option", { value: "2" }, "Option 2")));
        const selectContainer = getByTestId('kda-select');
        const selectElement = selectContainer.querySelector('select');
        expect(selectElement.disabled).toBe(true);
    });
});
//# sourceMappingURL=Select.test.js.map