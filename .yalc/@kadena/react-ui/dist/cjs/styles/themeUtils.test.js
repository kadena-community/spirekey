"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const themeUtils_1 = require("./themeUtils");
(0, vitest_1.describe)('responsiveStyle function', () => {
    (0, vitest_1.test)('creates style properties correctly', () => {
        const styleInput = {
            xs: { color: 'red' },
            sm: { color: 'purple' },
            md: { color: 'blue' },
            lg: { fontSize: '20px' },
        };
        const styleOutput = {
            color: 'red',
            '@media': {
                'screen and (min-width: 40rem)': {
                    color: 'purple',
                },
                'screen and (min-width: 48rem)': {
                    color: 'blue',
                },
                'screen and (min-width: 64rem)': {
                    fontSize: '20px',
                },
            },
        };
        (0, vitest_1.expect)((0, themeUtils_1.responsiveStyle)(styleInput)).toEqual(styleOutput);
    });
});
(0, vitest_1.describe)('mapToProperty function', () => {
    (0, vitest_1.test)('creates style properties correctly', () => {
        (0, vitest_1.expect)((0, themeUtils_1.mapToProperty)('gridRow')('span 1')).toEqual({ gridRow: 'span 1' });
        (0, vitest_1.expect)((0, themeUtils_1.mapToProperty)('gridRow', 'md')('span 2')).toEqual({
            '@media': {
                'screen and (min-width: 48rem)': {
                    gridRow: 'span 2',
                },
            },
        });
    });
});
//# sourceMappingURL=themeUtils.test.js.map