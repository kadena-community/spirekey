interface IUseGlowReturn {
    animationDuration: number;
    glowRef: React.RefObject<HTMLDivElement>;
    navRef: React.RefObject<HTMLDivElement>;
    glowX: number;
    setGlowPosition: (targetBounds: DOMRect) => void;
}
declare const useGlow: () => IUseGlowReturn;
export default useGlow;
//# sourceMappingURL=useGlow.d.ts.map