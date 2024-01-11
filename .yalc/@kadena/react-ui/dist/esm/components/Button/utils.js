export function disableLoadingProps(props) {
    const newProps = { ...props };
    if (newProps.isLoading) {
        newProps.onPress = undefined;
        newProps.onPressStart = undefined;
        newProps.onPressEnd = undefined;
        newProps.onPressChange = undefined;
        newProps.onPressUp = undefined;
        newProps.onKeyDown = undefined;
        newProps.onKeyUp = undefined;
        newProps.onClick = undefined;
    }
    return newProps;
}
//# sourceMappingURL=utils.js.map