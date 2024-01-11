import { Label } from '../Typography/Label/Label';
import React from 'react';
import { useTagGroup } from 'react-aria';
import { useListState } from 'react-stately';
import { InternalTagItem } from './InternalTagItem';
import { tagGroupLabelClass, tagListClass } from './Tag.css';
export const TagGroup = ({ tagAsChild, className, ...restProps }) => {
    const { label } = restProps;
    const ref = React.useRef(null);
    const state = useListState(restProps);
    const { gridProps, labelProps } = useTagGroup(restProps, state, ref);
    return (React.createElement("div", { className: className },
        label && (React.createElement("div", { ...labelProps }, typeof label === 'string' ? (React.createElement(Label, { className: tagGroupLabelClass }, label)) : (label))),
        React.createElement("div", { ...gridProps, ref: ref, className: tagListClass }, [...state.collection].map((item) => (React.createElement(InternalTagItem, { key: item.key, item: item, state: state, asChild: tagAsChild }, item.rendered))))));
};
//# sourceMappingURL=TagGroup.js.map