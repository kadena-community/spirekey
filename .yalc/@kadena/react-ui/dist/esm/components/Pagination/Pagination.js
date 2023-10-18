'use client';
import React, { useState } from 'react';
import { PageNav } from './PageNav';
import { PageNum } from './PageNum';
import { listClass } from './Pagination.css';
import { paginate } from './paginate';
export const Pagination = ({ totalPages, currentPage, label, visiblePageLimit = 3, initialSelectedPage, onPageChange, }) => {
    const validInitialSelectedPage = initialSelectedPage &&
        initialSelectedPage <= totalPages &&
        initialSelectedPage > 0;
    const [_page, setPage] = useState(validInitialSelectedPage ? initialSelectedPage : 1);
    const page = currentPage || _page;
    const pages = paginate({
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
    return (React.createElement("nav", { "aria-label": label },
        React.createElement("ul", { className: listClass },
            React.createElement("li", null,
                React.createElement(PageNav, { label: "Previous", direction: "prev", disabled: !enablePrevious, onClick: () => onClick(page - 1) })),
            pages.map((pageNum) => (React.createElement("li", { key: pageNum },
                React.createElement(PageNum, { key: pageNum, number: pageNum, current: pageNum === page, onClick: () => onClick(pageNum) })))),
            React.createElement("li", null,
                React.createElement(PageNav, { label: "Next", direction: "next", disabled: !enableNext, onClick: () => onClick(page + 1) })))));
};
//# sourceMappingURL=Pagination.js.map