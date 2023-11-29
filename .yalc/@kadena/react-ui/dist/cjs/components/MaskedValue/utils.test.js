"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const utils_1 = require("./utils");
(0, vitest_1.describe)('maskValue', () => {
    (0, vitest_1.it)('should mask value', () => {
        (0, vitest_1.expect)((0, utils_1.maskValue)('abcdefghijklmnopqrstuvwxyz')).toEqual('abcdef****wxyz');
        (0, vitest_1.expect)((0, utils_1.maskValue)('k:4f0befc9ae690e3b2966d9e9a119269334e87892af2505ec4160016561bfbc18')).toEqual('k:4f0b****bc18');
        (0, vitest_1.expect)((0, utils_1.maskValue)('K:003f****0769')).toEqual('K:003f****0769');
        (0, vitest_1.expect)((0, utils_1.maskValue)('K:8dea****bae6')).toEqual('K:8dea****bae6');
        (0, vitest_1.expect)((0, utils_1.maskValue)('K:f054****2f43')).toEqual('K:f054****2f43');
        (0, vitest_1.expect)((0, utils_1.maskValue)('a')).toEqual('a');
        (0, vitest_1.expect)((0, utils_1.maskValue)('123456')).toEqual('123456');
    });
    (0, vitest_1.it)('should mask value with custom options', () => {
        (0, vitest_1.expect)((0, utils_1.maskValue)('abcdefghijklmnopqrstuvwxyz', { maskLength: 2 })).toEqual('abcdef**wxyz');
        (0, vitest_1.expect)((0, utils_1.maskValue)('abcdefghijklmnopqrstuvwxyz', { character: '#' })).toEqual('abcdef####wxyz');
        (0, vitest_1.expect)((0, utils_1.maskValue)('abcdefghijklmnopqrstuvwxyz', { headLength: 3 })).toEqual('abc****wxyz');
        (0, vitest_1.expect)((0, utils_1.maskValue)('abcdefghijklmnopqrstuvwxyz', { tailLength: 3 })).toEqual('abcdef****xyz');
        (0, vitest_1.expect)((0, utils_1.maskValue)('abcdefghijklmnopqrstuvwxyz', {
            maskLength: 1,
            character: '2',
            headLength: 1,
            tailLength: 1,
        })).toEqual('a2z');
        (0, vitest_1.expect)((0, utils_1.maskValue)('abcdefghijklmnopqrstuvwxyz', { maskLength: 0 })).toEqual('abcdefwxyz');
        (0, vitest_1.expect)((0, utils_1.maskValue)('abcdefghijklmnopqrstuvwxyz', { maskLength: -10 })).toEqual('abcdefwxyz');
        (0, vitest_1.expect)((0, utils_1.maskValue)('abcdefghijklmnopqrstuvwxyz', {
            maskLength: 'abcdefghijklmnopqrstuvwxyz'.length,
        })).toEqual('**************************');
        (0, vitest_1.expect)((0, utils_1.maskValue)('abcdefghijklmnopqrstuvwxyz', { headLength: 0 })).toEqual('****wxyz');
        (0, vitest_1.expect)((0, utils_1.maskValue)('abcdefghijklmnopqrstuvwxyz', { tailLength: 0 })).toEqual('abcdef****');
        (0, vitest_1.expect)((0, utils_1.maskValue)('abcdefghijklmnopqrstuvwxyz', { headLength: -5 })).toEqual('****wxyz');
        (0, vitest_1.expect)((0, utils_1.maskValue)('abcdefghijklmnopqrstuvwxyz', { tailLength: -8 })).toEqual('abcdef****');
    });
    (0, vitest_1.it)('should throw an error if character is longer than 1', () => {
        (0, vitest_1.expect)(() => (0, utils_1.maskValue)('1234567890', { character: 'toolong' })).toThrow();
    });
});
//# sourceMappingURL=utils.test.js.map