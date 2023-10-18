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
exports.Chainweb = void 0;
const React = __importStar(require("react"));
const Chainweb = (props) => (React.createElement("svg", { width: 40, height: 40, viewBox: "0 0 40 40", xmlns: "http://www.w3.org/2000/svg", ...props },
    React.createElement("g", { clipPath: "url(#clip0_1407_2150)" },
        React.createElement("path", { d: "M34.1747 18.62C35.1351 18.62 35.9137 17.8414 35.9137 16.8811C35.9137 15.9207 35.1351 15.1421 34.1747 15.1421C33.2143 15.1421 32.4358 15.9207 32.4358 16.8811C32.4358 17.8414 33.2143 18.62 34.1747 18.62Z", fill: "white" }),
        React.createElement("path", { d: "M28.9585 35.1276C29.9065 34.9737 30.5502 34.0805 30.3963 33.1325C30.2425 32.1845 29.3492 31.5407 28.4012 31.6946C27.4533 31.8485 26.8095 32.7417 26.9634 33.6897C27.1173 34.6377 28.0105 35.2815 28.9585 35.1276Z", fill: "white" }),
        React.createElement("path", { d: "M11.7015 35.1285C12.6494 34.9747 13.2932 34.0814 13.1393 33.1334C12.9854 32.1854 12.0922 31.5417 11.1442 31.6956C10.1962 31.8495 9.55248 32.7427 9.70636 33.6907C9.86024 34.6387 10.7535 35.2824 11.7015 35.1285Z", fill: "white" }),
        React.createElement("path", { d: "M6.04949 18.62C7.00989 18.62 7.78844 17.8414 7.78844 16.8811C7.78844 15.9207 7.00989 15.1421 6.04949 15.1421C5.0891 15.1421 4.31055 15.9207 4.31055 16.8811C4.31055 17.8414 5.0891 18.62 6.04949 18.62Z", fill: "white" }),
        React.createElement("path", { d: "M20.1116 8.40316C21.072 8.40316 21.8505 7.6246 21.8505 6.66421C21.8505 5.70382 21.072 4.92526 20.1116 4.92526C19.1512 4.92526 18.3726 5.70382 18.3726 6.66421C18.3726 7.6246 19.1512 8.40316 20.1116 8.40316Z", fill: "white" }),
        React.createElement("path", { d: "M24.9474 22.7368L28.4737 20.1747C29.8295 19.1905 29.1326 17.0474 27.4579 17.0474H23.1031L21.7558 12.9021C21.2389 11.3084 18.9852 11.3084 18.4674 12.9021L17.121 17.0526H12.7621C11.0863 17.0526 10.3905 19.1958 11.7452 20.18L15.2716 22.7368L13.9252 26.8821C13.4074 28.4758 15.2305 29.8 16.5852 28.8158L19.0958 26.9916C19.3912 26.777 19.747 26.6615 20.1121 26.6615C20.4772 26.6615 20.833 26.777 21.1284 26.9916L23.6379 28.8158C24.9937 29.8 26.8168 28.4758 26.2989 26.8821L24.9474 22.7368Z", fill: "white" }),
        React.createElement("path", { d: "M34.1747 18.62C35.1351 18.62 35.9137 17.8414 35.9137 16.8811C35.9137 15.9207 35.1351 15.1421 34.1747 15.1421C33.2143 15.1421 32.4358 15.9207 32.4358 16.8811C32.4358 17.8414 33.2143 18.62 34.1747 18.62Z", fill: "#FFCC00" }),
        React.createElement("path", { d: "M28.679 35.1516C29.6393 35.1516 30.4179 34.373 30.4179 33.4126C30.4179 32.4522 29.6393 31.6737 28.679 31.6737C27.7186 31.6737 26.94 32.4522 26.94 33.4126C26.94 34.373 27.7186 35.1516 28.679 35.1516Z", fill: "#FFCC00" }),
        React.createElement("path", { d: "M11.4211 35.1516C12.3815 35.1516 13.16 34.373 13.16 33.4126C13.16 32.4522 12.3815 31.6737 11.4211 31.6737C10.4607 31.6737 9.68213 32.4522 9.68213 33.4126C9.68213 34.373 10.4607 35.1516 11.4211 35.1516Z", fill: "#FFCC00" }),
        React.createElement("path", { d: "M6.04949 18.62C7.00989 18.62 7.78844 17.8414 7.78844 16.8811C7.78844 15.9207 7.00989 15.1421 6.04949 15.1421C5.0891 15.1421 4.31055 15.9207 4.31055 16.8811C4.31055 17.8414 5.0891 18.62 6.04949 18.62Z", fill: "#FFCC00" }),
        React.createElement("path", { d: "M20.1116 8.40316C21.072 8.40316 21.8505 7.6246 21.8505 6.66421C21.8505 5.70382 21.072 4.92526 20.1116 4.92526C19.1512 4.92526 18.3726 5.70382 18.3726 6.66421C18.3726 7.6246 19.1512 8.40316 20.1116 8.40316Z", fill: "#FFCC00" }),
        React.createElement("g", { style: { mixBlendMode: 'multiply' } },
            React.createElement("path", { d: "M21.1284 25.5158L28.4779 20.1758C29.8337 19.1916 29.1368 17.0484 27.4621 17.0484H12.7621C11.0863 17.0484 10.3905 19.1916 11.7452 20.1758L19.0958 25.5158C19.391 25.7308 19.7468 25.8467 20.1121 25.8467C20.4773 25.8467 20.8332 25.7308 21.1284 25.5158Z", fill: "#ED098F" })),
        React.createElement("g", { style: { mixBlendMode: 'multiply' } },
            React.createElement("path", { d: "M18.4674 12.9032L13.9253 26.8832C13.4074 28.4768 15.2305 29.8011 16.5853 28.8168L19.0958 26.9926C19.3912 26.7781 19.747 26.6625 20.1121 26.6625C20.4772 26.6625 20.833 26.7781 21.1284 26.9926L23.6379 28.8168C24.9937 29.8011 26.8168 28.4768 26.2989 26.8832L21.7558 12.9032C21.2389 11.3095 18.9853 11.3095 18.4674 12.9032Z", fill: "#27B7E6" }))),
    React.createElement("defs", null,
        React.createElement("clipPath", { id: "clip0_1407_2150" },
            React.createElement("rect", { width: "40", height: "40", fill: "white" })))));
exports.Chainweb = Chainweb;
//# sourceMappingURL=Chainweb.js.map