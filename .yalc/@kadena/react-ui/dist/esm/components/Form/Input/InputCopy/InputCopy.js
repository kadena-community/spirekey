import { CopyButton, Input } from '../../../Form';
import React, { useState } from 'react';
export const InputCopy = (props) => {
    const [value, setValue] = useState('');
    return (React.createElement(Input, { ...props, value: value, onChange: ({ target }) => setValue(target.value) },
        React.createElement(CopyButton, { value: value })));
};
//# sourceMappingURL=InputCopy.js.map