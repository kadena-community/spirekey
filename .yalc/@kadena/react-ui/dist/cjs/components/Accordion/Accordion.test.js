"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Accordion_1 = require("./Accordion");
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
const sections = [
    {
        title: 'Section 1',
        children: 'Section 1 content',
        onOpen: jest.fn(),
        onClose: jest.fn(),
    },
    {
        title: 'Section 2',
        children: 'Section 2 content',
        onOpen: jest.fn(),
        onClose: jest.fn(),
    },
    {
        title: 'Section 3',
        children: 'Section 3 content',
        onOpen: jest.fn(),
        onClose: jest.fn(),
    },
];
beforeEach(() => {
    jest.clearAllMocks();
});
describe('Accordion', () => {
    test('renders the correct number of sections', () => {
        const { getAllByTestId } = (0, react_1.render)(react_2.default.createElement(Accordion_1.Accordion, { sections: sections }));
        const sectionElements = getAllByTestId('kda-accordion-title');
        expect(sectionElements.length).toBe(sections.length);
    });
    test('opens a linked section when clicked and closes others', () => {
        const { getAllByTestId } = (0, react_1.render)(react_2.default.createElement(Accordion_1.Accordion, { sections: sections, linked: true }));
        const sectionTitles = Array.from(getAllByTestId('kda-accordion-title'));
        expect(sections[0].onOpen).toHaveBeenCalledTimes(0);
        react_1.fireEvent.click(sectionTitles[0]);
        expect(sections[0].onOpen).toHaveBeenCalledTimes(1);
        expect(sections[0].onClose).toHaveBeenCalledTimes(0);
        react_1.fireEvent.click(sectionTitles[1]);
        expect(sections[0].onClose).toHaveBeenCalledTimes(1);
        expect(sections[1].onOpen).toHaveBeenCalledTimes(1);
        expect(sectionTitles[0].querySelector('[role="button"]')).not.toHaveClass('isOpen');
        expect(sectionTitles[1].querySelector('[role="button"]')).toHaveClass('isOpen');
        expect(sectionTitles[2].querySelector('[role="button"]')).not.toHaveClass('isOpen');
    });
    test('allows multiple unlinked sections to be open at the same time', () => {
        const { getAllByTestId } = (0, react_1.render)(react_2.default.createElement(Accordion_1.Accordion, { sections: sections, linked: false }));
        const sectionTitles = Array.from(getAllByTestId('kda-accordion-title'));
        expect(sections[0].onOpen).toHaveBeenCalledTimes(0);
        expect(sections[1].onOpen).toHaveBeenCalledTimes(0);
        expect(sections[2].onOpen).toHaveBeenCalledTimes(0);
        react_1.fireEvent.click(sectionTitles[0]);
        react_1.fireEvent.click(sectionTitles[2]);
        expect(sections[0].onOpen).toHaveBeenCalledTimes(1);
        expect(sections[1].onOpen).toHaveBeenCalledTimes(0);
        expect(sections[2].onOpen).toHaveBeenCalledTimes(1);
        expect(sections[0].onClose).toHaveBeenCalledTimes(0);
        expect(sections[1].onClose).toHaveBeenCalledTimes(0);
        expect(sections[2].onClose).toHaveBeenCalledTimes(0);
        expect(sectionTitles[0].querySelector('[role="button"]')).toHaveClass('isOpen');
        expect(sectionTitles[1].querySelector('[role="button"]')).not.toHaveClass('isOpen');
        expect(sectionTitles[2].querySelector('[role="button"]')).toHaveClass('isOpen');
    });
});
//# sourceMappingURL=Accordion.test.js.map