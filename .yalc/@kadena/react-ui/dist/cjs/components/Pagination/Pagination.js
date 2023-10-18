"use strict";
'use client';
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
exports.Pagination = void 0;
const react_1 = __importStar(require("react"));
const PageNav_1 = require("./PageNav");
const PageNum_1 = require("./PageNum");
const Pagination_css_1 = require("./Pagination.css");
const paginate_1 = require("./paginate");
const Pagination = ({ totalPages, currentPage, label, visiblePageLimit = 3, initialSelectedPage, onPageChange, }) => {
    const validInitialSelectedPage = initialSelectedPage &&
        initialSelectedPage <= totalPages &&
        initialSelectedPage > 0;
    const [_page, setPage] = (0, react_1.useState)(validInitialSelectedPage ? initialSelectedPage : 1);
    const page = currentPage || _page;
    const pages = (0, paginate_1.paginate)({
        page,
        total: totalPages,
        maxPages: visiblePageLimit,
    });
    const enablePrevious = page > 1;
    const enableNext = page < totalPages;
    const onClick = (page) => {
        setPage(page);
        onPageChange(page);
    };
    return (react_1.default.createElement("nav", { "aria-label": label },
        react_1.default.createElement("ul", { className: Pagination_css_1.listClass },
            react_1.default.createElement("li", null,
                react_1.default.createElement(PageNav_1.PageNav, { label: "Previous", direction: "prev", disabled: !enablePrevious, onClick: () => onClick(page - 1) })),
            pages.map((pageNum) => (react_1.default.createElement("li", { key: pageNum },
                react_1.default.createElement(PageNum_1.PageNum, { key: pageNum, number: pageNum, current: pageNum === page, onClick: () => onClick(pageNum) })))),
            react_1.default.createElement("li", null,
                react_1.default.createElement(PageNav_1.PageNav, { label: "Next", direction: "next", disabled: !enableNext, onClick: () => onClick(page + 1) })))));
};
exports.Pagination = Pagination;
//# sourceMappingURL=Pagination.js.map