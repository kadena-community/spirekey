import { visibleClass } from './Tooltip.css';
export const tooltipHandler = (event, ref) => {
    const target = event.target;
    const rect = target.getBoundingClientRect();
    const node = ref.current;
    if (!node) {
        throw new Error('Tooltip node is not defined');
    }
    node.classList.toggle(visibleClass);
    const placement = node.getAttribute('data-placement');
    switch (placement) {
        case 'top':
            node.style.top = `${rect.top - node.offsetHeight}px`;
            node.style.left = `${rect.left + rect.width / 2 - node.offsetWidth / 2}px`;
            break;
        case 'bottom':
            node.style.top = `${rect.top + rect.height}px`;
            node.style.left = `${rect.left + rect.width / 2 - node.offsetWidth / 2}px`;
            break;
        case 'left':
            node.style.top = `${rect.top + rect.height / 2 - node.offsetHeight / 2}px`;
            node.style.left = `${rect.left - node.offsetWidth}px`;
            break;
        case 'right':
            node.style.top = `${rect.top + rect.height / 2 - node.offsetHeight / 2}px`;
            node.style.left = `${rect.left + rect.width}px`;
            break;
    }
};
//# sourceMappingURL=tooltipHandler.js.map