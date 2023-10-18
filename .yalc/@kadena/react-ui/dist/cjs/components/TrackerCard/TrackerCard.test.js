"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
const TrackerCard_1 = require("./TrackerCard");
describe('TrackerCard', () => {
    let labelValue;
    beforeEach(() => {
        labelValue = [
            {
                label: 'Account',
                value: 'k:1234567890abcdef',
                isAccount: true,
            },
            {
                label: 'Balance',
                value: '1000',
            },
        ];
    });
    test('renders correctly', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(TrackerCard_1.TrackerCard, { labelValues: labelValue, variant: "vertical", helperText: "helper text", helperTextType: "mild", icon: "QuickStart" }));
        const trackerCard = getByTestId('kda-tracker-card');
        const icon = getByTestId('kda-icon');
        const dataContainer = getByTestId('kda-data-container');
        const firstLabelValueContainer = getByTestId('kda-label-value-container-0');
        const firstLabel = getByTestId('kda-label-0');
        const maskedValue = getByTestId('kda-masked-value');
        const secondLabelValueContainer = getByTestId('kda-label-value-container-1');
        const secondLabel = getByTestId('kda-label-1');
        const value = getByTestId('kda-value-1');
        const helperText = getByTestId('kda-helper-text');
        expect(trackerCard).toBeInTheDocument();
        expect(icon).toBeInTheDocument();
        expect(dataContainer).toBeInTheDocument();
        expect(firstLabelValueContainer).toBeInTheDocument();
        expect(firstLabel).toBeInTheDocument();
        expect(maskedValue).toBeInTheDocument();
        expect(secondLabelValueContainer).toBeInTheDocument();
        expect(secondLabel).toBeInTheDocument();
        expect(value).toBeInTheDocument();
        expect(helperText).toBeInTheDocument();
    });
    test('displays correct content', () => {
        (0, react_1.render)(react_2.default.createElement(TrackerCard_1.TrackerCard, { labelValues: labelValue, variant: "vertical", helperText: "helper text", helperTextType: "mild", icon: "QuickStart" }));
        expect(react_1.screen.getByText('Account')).toBeInTheDocument();
        expect(react_1.screen.getByText('k:1234****cdef')).toBeInTheDocument();
        expect(react_1.screen.getByText('Balance')).toBeInTheDocument();
        expect(react_1.screen.getByText('1000')).toBeInTheDocument();
        expect(react_1.screen.getByText('helper text')).toBeInTheDocument();
    });
    test('icons and value not in document', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(TrackerCard_1.TrackerCard, { labelValues: labelValue.splice(0, 1), variant: "vertical", helperText: "helper text", helperTextType: "mild", icon: undefined }));
        const labelValueContainer = getByTestId('kda-label-value-container-0');
        const maskedValue = getByTestId('kda-masked-value');
        const label = getByTestId('kda-label-0');
        expect(labelValueContainer).toBeInTheDocument();
        expect(maskedValue).toBeInTheDocument();
        expect(react_1.screen.getByText('k:1234****cdef')).toBeInTheDocument();
        expect(label).toBeInTheDocument();
        expect(react_1.screen.getByText('Account')).toBeInTheDocument();
        expect(react_1.screen.queryByTestId('kda-icon')).not.toBeInTheDocument();
        expect(react_1.screen.queryByTestId('kda-value-0')).not.toBeInTheDocument();
    });
    test('masked value not in document', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(TrackerCard_1.TrackerCard, { labelValues: labelValue.splice(-1), variant: "vertical", helperText: "helper text", helperTextType: "mild", icon: "QuickStart" }));
        const labelValueContainer = getByTestId('kda-label-value-container-0');
        const label = getByTestId('kda-label-0');
        const value = getByTestId('kda-value-0');
        expect(labelValueContainer).toBeInTheDocument();
        expect(label).toBeInTheDocument();
        expect(react_1.screen.getByText('Balance')).toBeInTheDocument();
        expect(value).toBeInTheDocument();
        expect(react_1.screen.getByText('1000')).toBeInTheDocument();
        expect(react_1.screen.queryByTestId('kda-masked-value')).not.toBeInTheDocument();
    });
    test('empty labelValue prop and helper text results in no label-value containers and no helper text', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(TrackerCard_1.TrackerCard, { labelValues: [], variant: "vertical", icon: "QuickStart" }));
        const trackerCard = getByTestId('kda-tracker-card');
        const icon = getByTestId('kda-icon');
        const dataContainer = getByTestId('kda-data-container');
        expect(trackerCard).toBeInTheDocument();
        expect(icon).toBeInTheDocument();
        expect(dataContainer).toBeInTheDocument();
        expect(react_1.screen.queryByTestId('kda-label-value-container-0')).not.toBeInTheDocument();
        expect(react_1.screen.queryByTestId('kda-masked-value')).not.toBeInTheDocument();
        expect(react_1.screen.queryByTestId('kda-label-0')).not.toBeInTheDocument();
        expect(react_1.screen.queryByTestId('kda-value-0')).not.toBeInTheDocument();
        expect(react_1.screen.queryByTestId('kda-helper-text')).not.toBeInTheDocument();
    });
    test('no more label-value containers than necessary', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(TrackerCard_1.TrackerCard, { labelValues: labelValue, variant: "horizontal", helperText: "helper text", helperTextType: "mild", icon: "QuickStart" }));
        const firstLabelValueContainer = getByTestId('kda-label-value-container-0');
        const secondLabelValueContainer = getByTestId('kda-label-value-container-1');
        expect(firstLabelValueContainer).toBeInTheDocument();
        expect(secondLabelValueContainer).toBeInTheDocument();
        expect(react_1.screen.queryByTestId('kda-label-value-container-2')).not.toBeInTheDocument();
    });
    test('masked value should not be masked when default visible is true', () => {
        const { getByTestId } = (0, react_1.render)(react_2.default.createElement(TrackerCard_1.TrackerCard, { labelValues: [
                {
                    label: 'Account',
                    value: 'k:1234567890abcdef',
                    isAccount: true,
                    defaultVisible: true,
                },
            ], variant: "horizontal", icon: "QuickStart" }));
        const maskedValue = getByTestId('kda-masked-value');
        expect(maskedValue).toBeInTheDocument();
        expect(react_1.screen.getByText('k:1234567890abcdef')).toBeInTheDocument();
    });
});
//# sourceMappingURL=TrackerCard.test.js.map