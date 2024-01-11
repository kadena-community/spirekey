export const testProps = (props, postfix = '') => typeof props['data-testid'] === 'string'
    ? {
        'data-testid': `${props['data-testid']}${postfix ? `-${postfix}` : ''}`,
    }
    : {};
export const withTestProps = (props) => ({
    ...props,
    ...testProps(props),
});
//# sourceMappingURL=testId.js.map