"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogChain = void 0;
const React = __importStar(require("react"));
const BlogChain = (props) => (React.createElement("svg", { width: 40, height: 40, viewBox: "0 0 40 40", xmlns: "http://www.w3.org/2000/svg", ...props },
    React.createElement("g", { clipPath: "url(#clip0_1415_2118)" },
        React.createElement("path", { d: "M30.9274 13.8263C29.3245 12.3264 27.2574 11.4188 25.0684 11.2537C25.0462 10.477 24.8462 9.71579 24.4839 9.02847C24.1215 8.34115 23.6065 7.74605 22.9782 7.28888C22.35 6.83172 21.6253 6.52466 20.8598 6.3913C20.0944 6.25794 19.3085 6.30183 18.5627 6.51959C17.8168 6.73736 17.1308 7.1232 16.5574 7.64748C15.984 8.17176 15.5384 8.82052 15.2548 9.54391C14.9712 10.2673 14.8573 11.0461 14.9217 11.8204C14.9861 12.5947 15.2271 13.3439 15.6263 14.0105C10.4758 14.0568 6.3158 17.9442 6.3158 22.7368V32C6.3158 32.4467 6.49324 32.8751 6.80909 33.1909C7.12494 33.5068 7.55333 33.6842 8.00001 33.6842H15.6653C16.112 33.6842 16.5403 33.5068 16.8562 33.1909C17.172 32.8751 17.3495 32.4467 17.3495 32V25.9189C17.3495 24.4453 18.5074 23.2063 19.9811 23.1821C20.3377 23.1743 20.6922 23.2377 21.024 23.3688C21.3557 23.4998 21.6579 23.6958 21.9128 23.9453C22.1678 24.1947 22.3703 24.4926 22.5086 24.8214C22.6468 25.1502 22.718 25.5033 22.7179 25.86V32C22.7179 32.4467 22.8953 32.8751 23.2112 33.1909C23.527 33.5068 23.9554 33.6842 24.4021 33.6842H32C32.4467 33.6842 32.8751 33.5068 33.1909 33.1909C33.5068 32.8751 33.6842 32.4467 33.6842 32V20.0379C33.6842 17.6337 32.6316 15.4295 30.9274 13.8263Z", fill: "white" }),
        React.createElement("g", { style: { mixBlendMode: 'multiply' } },
            React.createElement("path", { d: "M25.12 22.7368V33.6842H24.3937C23.947 33.6842 23.5186 33.5068 23.2028 33.1909C22.8869 32.8751 22.7095 32.4467 22.7095 32V25.8568C22.7096 25.5002 22.6384 25.1471 22.5001 24.8183C22.3619 24.4895 22.1594 24.1916 21.9044 23.9421C21.6495 23.6927 21.3473 23.4967 21.0155 23.3656C20.6838 23.2346 20.3292 23.1711 19.9726 23.1789C18.499 23.2063 17.3411 24.4484 17.3411 25.9158V32C17.3411 32.4467 17.1636 32.8751 16.8478 33.1909C16.5319 33.5068 16.1035 33.6842 15.6568 33.6842H8.00001C7.55333 33.6842 7.12494 33.5068 6.80909 33.1909C6.49324 32.8751 6.3158 32.4467 6.3158 32V22.7368C6.3158 17.9179 10.5263 14.0116 15.7179 14.0116C18.177 13.9947 20.5517 14.9076 22.3663 16.5674C24.0674 18.1442 25.12 20.3253 25.12 22.7368Z", fill: "#27B7E6" })),
        React.createElement("g", { style: { mixBlendMode: 'multiply' } },
            React.createElement("path", { d: "M33.6842 20.0379V32C33.6842 32.4467 33.5068 32.8751 33.1909 33.1909C32.8751 33.5068 32.4467 33.6842 32 33.6842H24.3937C23.947 33.6842 23.5186 33.5068 23.2028 33.1909C22.8869 32.8751 22.7095 32.4467 22.7095 32V25.8568C22.7096 25.5002 22.6384 25.1471 22.5002 24.8183C22.3619 24.4895 22.1594 24.1916 21.9044 23.9421C21.6495 23.6927 21.3473 23.4967 21.0155 23.3656C20.6838 23.2346 20.3292 23.1711 19.9726 23.1789C18.499 23.2063 17.3411 24.4484 17.3411 25.9158V32C17.3411 32.4467 17.1636 32.8751 16.8478 33.1909C16.5319 33.5068 16.1035 33.6842 15.6569 33.6842H14.8705V20.0379C14.8705 15.2295 19.0811 11.22 24.2716 11.22C26.7387 11.2091 29.1167 12.1415 30.919 13.8263C32.6316 15.4295 33.6842 17.6337 33.6842 20.0379Z", fill: "#66CC33" })),
        React.createElement("g", { style: { mixBlendMode: 'multiply' } },
            React.createElement("path", { d: "M19.9884 16.4821C22.7958 16.4821 25.0716 14.2063 25.0716 11.3989C25.0716 8.5916 22.7958 6.31579 19.9884 6.31579C17.1811 6.31579 14.9053 8.5916 14.9053 11.3989C14.9053 14.2063 17.1811 16.4821 19.9884 16.4821Z", fill: "#FFCC00" }))),
    React.createElement("defs", null,
        React.createElement("clipPath", { id: "clip0_1415_2118" },
            React.createElement("rect", { width: "40", height: "40", fill: "white" })))));
exports.BlogChain = BlogChain;
//# sourceMappingURL=BlogChain.js.map