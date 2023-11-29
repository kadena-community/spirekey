import { createContext } from 'react';
export const DialogContext = createContext({
    titleProps: {},
    state: {
        isOpen: false,
        setOpen: (isOpen) => { },
        open: () => { },
        close: () => { },
        toggle: () => { },
    },
});
//# sourceMappingURL=Dialog.context.js.map