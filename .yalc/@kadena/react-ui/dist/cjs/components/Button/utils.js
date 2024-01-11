"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disableLoadingProps = void 0;
function disableLoadingProps(props) {
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
exports.disableLoadingProps = disableLoadingProps;
//# sourceMappingURL=utils.js.map