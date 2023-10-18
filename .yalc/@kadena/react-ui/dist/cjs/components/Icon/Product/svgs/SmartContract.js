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
exports.SmartContract = void 0;
const React = __importStar(require("react"));
const SmartContract = (props) => (React.createElement("svg", { width: 40, height: 40, viewBox: "0 0 40 40", xmlns: "http://www.w3.org/2000/svg", ...props },
    React.createElement("g", { clipPath: "url(#clip0_1080_2286)" },
        React.createElement("path", { d: "M324,133.09a16,16,0,0,0,16-16V95.31a16,16,0,0,0-16-16H251.34A149.24,149.24,0,0,0,150.2,40H56A16,16,0,0,0,40,56V323.63a16,16,0,0,0,16,16h94.17a149.25,149.25,0,0,0,100.76-38.94H324a16,16,0,0,0,16-16V262.91a16,16,0,0,0-16-16H288.72a148.77,148.77,0,0,0,9-30.69H324a16,16,0,0,0,16-16V178.44a16,16,0,0,0-16-16H297.5a148.38,148.38,0,0,0-8.62-29.35Zm-58.7,29.35H206a16,16,0,0,0-16,16v21.78a16,16,0,0,0,16,16h59.76a80,80,0,0,1-19.37,30.69H206a16,16,0,0,0-16,16V270h-1.78A80,80,0,0,1,190,110v7.08a16,16,0,0,0,16,16h40.39A79.82,79.82,0,0,1,265.3,162.44Z", fill: "white" }),
        React.createElement("g", { style: { mixBlendMode: 'multiply' } },
            React.createElement("path", { d: "M15.8105 4.21053H5.89472C5.44804 4.21053 5.01965 4.38797 4.7038 4.70382C4.38795 5.01967 4.21051 5.44806 4.21051 5.89474V34.0663C4.21051 34.513 4.38795 34.9414 4.7038 35.2572C5.01965 35.5731 5.44804 35.7505 5.89472 35.7505H15.8074C19.9902 35.7505 24.0018 34.0889 26.9595 31.1311C29.9173 28.1734 31.5789 24.1618 31.5789 19.9789C31.5789 17.9082 31.1711 15.8577 30.3786 13.9446C29.5862 12.0315 28.4247 10.2932 26.9605 8.82899C25.4962 7.36476 23.7579 6.20326 21.8448 5.41083C19.9317 4.61839 17.8812 4.21053 15.8105 4.21053ZM19.8105 28.4211C18.1546 28.3796 16.5476 27.8508 15.1908 26.9006C13.8339 25.9505 12.7874 24.6213 12.1822 23.0794C11.577 21.5375 11.44 19.8513 11.7883 18.2319C12.1366 16.6125 12.9548 15.1317 14.1404 13.975C15.3261 12.8183 16.8265 12.0369 18.4541 11.7287C20.0816 11.4204 21.7639 11.599 23.2904 12.2421C24.8169 12.8852 26.1199 13.9642 27.0362 15.3441C27.9525 16.724 28.4416 18.3435 28.4421 20C28.4381 21.1224 28.2107 22.2328 27.773 23.2663C27.3354 24.2999 26.6962 25.2359 25.8929 26.0198C25.0896 26.8037 24.1382 27.4198 23.0943 27.832C22.0504 28.2443 20.9348 28.4445 19.8126 28.4211H19.8105Z", fill: "#ED098F" })),
        React.createElement("g", { style: { mixBlendMode: 'multiply' } },
            React.createElement("path", { d: "M34.1053 25.9905H21.6842C20.754 25.9905 20 26.7446 20 27.6747V29.9674C20 30.8975 20.754 31.6516 21.6842 31.6516H34.1053C35.0354 31.6516 35.7895 30.8975 35.7895 29.9674V27.6747C35.7895 26.7446 35.0354 25.9905 34.1053 25.9905Z", fill: "#27B7E6" })),
        React.createElement("g", { style: { mixBlendMode: 'multiply' } },
            React.createElement("path", { d: "M34.1053 17.0989H21.6842C20.754 17.0989 20 17.853 20 18.7832V21.0758C20 22.006 20.754 22.76 21.6842 22.76H34.1053C35.0354 22.76 35.7895 22.006 35.7895 21.0758V18.7832C35.7895 17.853 35.0354 17.0989 34.1053 17.0989Z", fill: "#27B7E6" })),
        React.createElement("g", { style: { mixBlendMode: 'multiply' } },
            React.createElement("path", { d: "M34.1053 8.34842H21.6842C20.754 8.34842 20 9.10247 20 10.0326V12.3253C20 13.2554 20.754 14.0095 21.6842 14.0095H34.1053C35.0354 14.0095 35.7895 13.2554 35.7895 12.3253V10.0326C35.7895 9.10247 35.0354 8.34842 34.1053 8.34842Z", fill: "#27B7E6" }))),
    React.createElement("defs", null,
        React.createElement("clipPath", { id: "clip0_1080_2286" },
            React.createElement("rect", { width: "40", height: "40", fill: "white" })))));
exports.SmartContract = SmartContract;
//# sourceMappingURL=SmartContract.js.map