"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const paginate_1 = require("./paginate");
(0, vitest_1.describe)('paginate', () => {
    (0, vitest_1.it)(`should return the required pages when 'total' < 'maxPages'`, () => {
        (0, vitest_1.expect)((0, paginate_1.paginate)({ page: 1, total: 4, maxPages: 5 })).toEqual([1, 2, 3, 4]);
    });
    (0, vitest_1.it)(`should return the max number of pages when 'total' > 'maxPages' and 'page' is '1'`, () => {
        (0, vitest_1.expect)((0, paginate_1.paginate)({ page: 1, total: 20, maxPages: 5 })).toEqual([
            1, 2, 3, 4, 5,
        ]);
    });
    (0, vitest_1.it)(`should return the max number of pages around the selected 'page'`, () => {
        (0, vitest_1.expect)((0, paginate_1.paginate)({ page: 12, total: 20, maxPages: 5 })).toEqual([
            10, 11, 12, 13, 14,
        ]);
    });
    (0, vitest_1.it)(`should return the last pages when 'page' is the 'total'`, () => {
        (0, vitest_1.expect)((0, paginate_1.paginate)({ page: 20, total: 20, maxPages: 5 })).toEqual([
            16, 17, 18, 19, 20,
        ]);
    });
    (0, vitest_1.it)(`should return the correct pages when 'page' is < the middle page`, () => {
        (0, vitest_1.expect)((0, paginate_1.paginate)({ page: 3, total: 20, maxPages: 5 })).toEqual([
            1, 2, 3, 4, 5,
        ]);
    });
    (0, vitest_1.it)(`should return the correct pages when 'page' is the middle page`, () => {
        (0, vitest_1.expect)((0, paginate_1.paginate)({ page: 4, total: 20, maxPages: 5 })).toEqual([
            2, 3, 4, 5, 6,
        ]);
    });
    (0, vitest_1.it)(`should return the correct pages when 'page' is > the middle page`, () => {
        (0, vitest_1.expect)((0, paginate_1.paginate)({ page: 5, total: 20, maxPages: 5 })).toEqual([
            3, 4, 5, 6, 7,
        ]);
    });
});
//# sourceMappingURL=paginate.test.js.map