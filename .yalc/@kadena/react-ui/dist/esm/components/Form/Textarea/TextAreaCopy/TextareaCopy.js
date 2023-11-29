import { CopyButton, Textarea } from '../../../Form';
import React, { useState } from 'react';
export const TextareaCopy = (props) => {
    const [value, setValue] = useState('');
    return (React.createElement(Textarea, { ...props, value: value, onChange: ({ target }) => setValue(target.value) },
        React.createElement(CopyButton, { value: value })));
};
//# sourceMappingURL=TextareaCopy.js.map