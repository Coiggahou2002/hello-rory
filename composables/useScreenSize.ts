export enum EScreenSizeType {
    PHONE = 'PHONE',       // < 640px
    MINI_PAD = 'MINI_PAD', // 640-767px
    PAD = 'PAD',           // 768-1023px
    LAPTOP = 'LAPTOP',     // 1024-1279px
    DESKTOP = 'DESKTOP',   // 1280-1535px
    GIANT = 'GIANT',       // >= 1536px
}
const useScreenSize = () => {
    const isSmallScreen = useMediaQuery('(min-width: 640px)');
    const isMediumScreen = useMediaQuery('(min-width: 768px)');
    const isLargeScreen = useMediaQuery('(min-width: 1024px)');
    const isExtraLargeScreen = useMediaQuery('(min-width: 1280px)');
    const isDoubleExtraLargeScreen = useMediaQuery('(min-width: 1536px)');
    const screenSize = computed(() => {
        if (!isSmallScreen.value) return EScreenSizeType.PHONE;
        if (!isMediumScreen.value) return EScreenSizeType.MINI_PAD;
        if (!isLargeScreen.value) return EScreenSizeType.PAD;
        if (!isExtraLargeScreen.value) return EScreenSizeType.LAPTOP;
        if (!isDoubleExtraLargeScreen.value) return EScreenSizeType.DESKTOP;
        return EScreenSizeType.GIANT;
    })
    return {
        screenSize
    };
}
export default useScreenSize;