"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withTestProps = exports.testProps = void 0;
const testProps = (props, postfix = '') => typeof props['data-testid'] === 'string'
    ? {
        'data-testid': `${props['data-testid']}${postfix ? `-${postfix}` : ''}`,
    }
    : {};
exports.testProps = testProps;
const withTestProps = (props) => ({
    ...props,
    ...(0, exports.testProps)(props),
});
exports.withTestProps = withTestProps;
//# sourceMappingURL=testId.js.map