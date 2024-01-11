"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tag_1 = require("../Tag");
const react_1 = require("@testing-library/react");
const user_event_1 = __importDefault(require("@testing-library/user-event"));
const react_2 = __importDefault(require("react"));
const vitest_1 = require("vitest");
const tags = [
    { id: '1', name: 'News' },
    { id: '2', name: 'Travel' },
    { id: '3', name: 'Gaming' },
    { id: '4', name: 'Shopping' },
];
(0, vitest_1.describe)('Tag', () => {
    const onDelete = vitest_1.vi.fn();
    const TestComponent = () => {
        return (react_2.default.createElement(Tag_1.TagGroup, { label: "Kadena Resources", onRemove: () => {
                onDelete();
            }, disabledKeys: ['2'] }, tags.map((item) => (react_2.default.createElement(Tag_1.TagItem, { key: item.id }, item.name)))));
    };
    (0, vitest_1.it)('Renders tag group with aria-role and aria-labels', () => {
        const { getByRole } = (0, react_1.render)(react_2.default.createElement(TestComponent, null));
        (0, vitest_1.expect)(getByRole('grid')).toBeInTheDocument();
        (0, vitest_1.expect)(react_1.screen.getByText('News').parentElement).toHaveAttribute('aria-label', 'News');
    });
    (0, vitest_1.it)('Renders tag group with disabled tag', () => {
        (0, react_1.render)(react_2.default.createElement(TestComponent, null));
        (0, vitest_1.expect)(react_1.screen.getByText('Travel').parentElement).toHaveAttribute('aria-disabled', 'true');
    });
    (0, vitest_1.it)('Renders tag group with disabled tag', async () => {
        (0, react_1.render)(react_2.default.createElement(TestComponent, null));
        (0, vitest_1.expect)(react_1.screen.getByText('News').parentElement).toBeInTheDocument();
        await user_event_1.default.tab();
        (0, vitest_1.expect)(react_1.screen.getByText('News').parentElement).toHaveFocus();
        await user_event_1.default.keyboard('{ArrowRight}');
        (0, vitest_1.expect)(react_1.screen.getByText('Gaming').parentElement).toHaveFocus();
        await user_event_1.default.keyboard('{Backspace}');
        (0, vitest_1.expect)(onDelete).toHaveBeenCalledTimes(1);
    });
});
//# sourceMappingURL=Tag.test.js.map