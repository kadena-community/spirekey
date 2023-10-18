"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const themeUtils_1 = require("./themeUtils");
describe('responsiveStyle function', () => {
    test('creates style properties correctly', () => {
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
        expect((0, themeUtils_1.responsiveStyle)(styleInput)).toEqual(styleOutput);
    });
});
describe('mapToProperty function', () => {
    test('creates style properties correctly', () => {
        expect((0, themeUtils_1.mapToProperty)('gridRow')('span 1')).toEqual({ gridRow: 'span 1' });
        expect((0, themeUtils_1.mapToProperty)('gridRow', 'md')('span 2')).toEqual({
            '@media': {
                'screen and (min-width: 48rem)': {
                    gridRow: 'span 2',
                },
            },
        });
    });
});
//# sourceMappingURL=themeUtils.test.js.map