"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paginate_1 = require("./paginate");
describe('paginate', () => {
    it(`should return the required pages when 'total' < 'maxPages'`, () => {
        expect((0, paginate_1.paginate)({ page: 1, total: 4, maxPages: 5 })).toEqual([1, 2, 3, 4]);
    });
    it(`should return the max number of pages when 'total' > 'maxPages' and 'page' is '1'`, () => {
        expect((0, paginate_1.paginate)({ page: 1, total: 20, maxPages: 5 })).toEqual([
            1, 2, 3, 4, 5,
        ]);
    });
    it(`should return the max number of pages around the selected 'page'`, () => {
        expect((0, paginate_1.paginate)({ page: 12, total: 20, maxPages: 5 })).toEqual([
            10, 11, 12, 13, 14,
        ]);
    });
    it(`should return the last pages when 'page' is the 'total'`, () => {
        expect((0, paginate_1.paginate)({ page: 20, total: 20, maxPages: 5 })).toEqual([
            16, 17, 18, 19, 20,
        ]);
    });
    it(`should return the correct pages when 'page' is < the middle page`, () => {
        expect((0, paginate_1.paginate)({ page: 3, total: 20, maxPages: 5 })).toEqual([
            1, 2, 3, 4, 5,
        ]);
    });
    it(`should return the correct pages when 'page' is the middle page`, () => {
        expect((0, paginate_1.paginate)({ page: 4, total: 20, maxPages: 5 })).toEqual([
            2, 3, 4, 5, 6,
        ]);
    });
    it(`should return the correct pages when 'page' is > the middle page`, () => {
        expect((0, paginate_1.paginate)({ page: 5, total: 20, maxPages: 5 })).toEqual([
            3, 4, 5, 6, 7,
        ]);
    });
});
//# sourceMappingURL=paginate.test.js.map