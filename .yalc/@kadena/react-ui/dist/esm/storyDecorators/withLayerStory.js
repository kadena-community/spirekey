import { Text } from '../components/Typography';
import { atoms } from '../styles/atoms.css';
import React from 'react';
const WithLayerStory = ({ children, layer }) => {
    return (React.createElement("div", { className: atoms({
            position: 'relative',
            backgroundColor: `${layer}.default`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            padding: 'xxxl',
        }), style: { minHeight: '20rem' } },
        React.createElement(Text, { variant: "base", bold: true, className: atoms({
                position: 'absolute',
                top: 0,
                left: 0,
                margin: 'md',
                marginBlock: 'sm',
            }) }, layer),
        children));
};
export const onBase = (story) => (React.createElement(WithLayerStory, { layer: "base" }, story()));
export const onLayer1 = (story) => (React.createElement(WithLayerStory, { layer: "layer-1" }, story()));
export const onLayer2 = (story) => (React.createElement(WithLayerStory, { layer: "layer-2" }, story()));
export const onLayer3 = (story) => (React.createElement(WithLayerStory, { layer: "layer-3" }, story()));
//# sourceMappingURL=withLayerStory.js.map