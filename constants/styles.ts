export const baseStyle = {
    inlineRow: "flex flex-row items-center gap-2",
    inlineCol: "flex flex-col gap-2 items-start",
    mainWrapper: "wrapper grow items-start flex-row flex justify-center"
};

// Keyed by aspectRatioOptions id. Full literal class names so Tailwind can scan
// them — an interpolated `aspect-[${x}]` gets dropped at build.
export const aspectStyles: Record<string, string> = {
    "9-16": "aspect-[9/16]",
    "16-9": "aspect-[16/9]",
    "1-1": "aspect-square",
    "4-5": "aspect-[4/5]",
    "21-9": "aspect-[21/9]"
};
