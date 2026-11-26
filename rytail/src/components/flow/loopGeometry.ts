export const LOOP_CONSTANTS = {
  BAND_PAD: 32,
  BAND_BOTTOM_PAD: 56,
  STAGE_W: 260,
  STAGE_H: 88,
  STAGE_GAP: 44,
  LINE_INSET: 32,
  CORNER_R: 28,
  MODULE_CLEARANCE_TOP: 36,
  MODULE_H_DESKTOP: 300,
  MODULE_H_TABLET: 210,
  MODULE_GAP: 20,
  AVATAR_SIZE: 56,
  AVATAR_CLEARANCE_TOP: 64,
  PILL_SIDE_RATIO: 0.62,
  PILL_BOTTOM_LEFT_RATIO: 0.14,
  PILL_BOTTOM_RIGHT_RATIO: 0.86,
  ARROW_SIDE_RATIO: 0.3,
  ARROW_BOTTOM_LEFT_RATIO: 0.32,
  ARROW_BOTTOM_RIGHT_RATIO: 0.68,
} as const;

export type LoopVariant = "desktop" | "tablet";

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ArrowAnchor {
  id: string;
  segment: "top" | "right" | "bottom" | "left";
  x: number;
  y: number;
  angle: number;
  /** Normalized progress along its segment (0..1) when the arrow pops in */
  triggerAt: number;
}

export interface PillAnchor {
  id: string;
  x: number;
  y: number;
  rotate: number;
  segment: "right" | "bottom" | "left";
}

export interface LoopGeometryResult {
  width: number;
  heightFull: number;
  heightCollapsed: number;
  topLineY: number;
  bottomLineY: number;
  lineLeft: number;
  lineRight: number;
  cornerR: number;
  paths: {
    top: string;
    right: string;
    bottom: string;
    left: string;
  };
  stages: Rect[];
  modules: Rect[];
  arrows: ArrowAnchor[];
  pills: PillAnchor[];
  avatarsCenter: { x: number; y: number };
}

export function loopGeometry(
  bandWidth: number,
  variant: LoopVariant = "desktop"
): LoopGeometryResult {
  const C = LOOP_CONSTANTS;
  const width = Math.max(bandWidth, 720);

  const T = C.BAND_PAD + C.STAGE_H / 2; // 76
  const heightCollapsed = T + C.STAGE_H / 2 + C.BAND_PAD; // 152

  const moduleTop = T + C.STAGE_H / 2 + C.MODULE_CLEARANCE_TOP; // 156
  const moduleBlockHeight =
    variant === "desktop"
      ? C.MODULE_H_DESKTOP
      : C.MODULE_H_TABLET * 2 + C.MODULE_GAP;

  const B = moduleTop + moduleBlockHeight + C.AVATAR_CLEARANCE_TOP; // 520 on desktop
  const heightFull = B + C.BAND_BOTTOM_PAD; // 576 on desktop

  const L = C.LINE_INSET;
  const R = width - C.LINE_INSET;
  const r = C.CORNER_R;

  // Stage cards: 3 cards centered horizontally as a group, centered vertically on y = T
  const stageW =
    variant === "desktop"
      ? C.STAGE_W
      : Math.min(C.STAGE_W, Math.floor((width - L * 2 - 80 - C.STAGE_GAP * 2) / 3));
  const stageGap = variant === "desktop" ? C.STAGE_GAP : 28;
  const totalStagesW = stageW * 3 + stageGap * 2;
  const stagesStartX = (width - totalStagesW) / 2;
  const stageY = T - C.STAGE_H / 2;

  const stages: Rect[] = [0, 1, 2].map((i) => ({
    x: stagesStartX + i * (stageW + stageGap),
    y: stageY,
    width: stageW,
    height: C.STAGE_H,
  }));

  // Module cards inside the loop
  const innerPadX = L + 48;
  const innerAvailW = width - innerPadX * 2;
  const modules: Rect[] =
    variant === "desktop"
      ? (() => {
          const modW = Math.max(200, (innerAvailW - C.MODULE_GAP * 3) / 4);
          const totalModW = modW * 4 + C.MODULE_GAP * 3;
          const startX = (width - totalModW) / 2;
          return [0, 1, 2, 3].map((i) => ({
            x: startX + i * (modW + C.MODULE_GAP),
            y: moduleTop,
            width: modW,
            height: C.MODULE_H_DESKTOP,
          }));
        })()
      : (() => {
          const modW = (innerAvailW - C.MODULE_GAP) / 2;
          const startX = innerPadX;
          return [0, 1, 2, 3].map((i) => {
            const col = i % 2;
            const row = Math.floor(i / 2);
            return {
              x: startX + col * (modW + C.MODULE_GAP),
              y: moduleTop + row * (C.MODULE_H_TABLET + C.MODULE_GAP),
              width: modW,
              height: C.MODULE_H_TABLET,
            };
          });
        })();

  // 4 clockwise SVG segment paths (each corner arc belongs to the segment that follows it)
  const paths = {
    top: `M ${L + r} ${T} H ${R - r}`,
    right: `M ${R - r} ${T} A ${r} ${r} 0 0 1 ${R} ${T + r} V ${B - r}`,
    bottom: `M ${R} ${B - r} A ${r} ${r} 0 0 1 ${R - r} ${B} H ${L + r}`,
    left: `M ${L + r} ${B} A ${r} ${r} 0 0 1 ${L} ${B - r} V ${T + r} A ${r} ${r} 0 0 1 ${L + r} ${T}`,
  };

  // Arrowheads placed strictly on each segment path
  const topLen = R - r - (L + r);
  const gap1CenterX = stages[0].x + stages[0].width + stageGap / 2;
  const gap2CenterX = stages[1].x + stages[1].width + stageGap / 2;
  const verticalSpan = B - r - (T + r);

  const arrows: ArrowAnchor[] = [
    {
      id: "top-1",
      segment: "top",
      x: gap1CenterX,
      y: T,
      angle: 0,
      triggerAt: Math.max(0.05, Math.min(0.95, (gap1CenterX - (L + r)) / topLen)),
    },
    {
      id: "top-2",
      segment: "top",
      x: gap2CenterX,
      y: T,
      angle: 0,
      triggerAt: Math.max(0.05, Math.min(0.95, (gap2CenterX - (L + r)) / topLen)),
    },
    {
      id: "right-1",
      segment: "right",
      x: R,
      y: T + r + C.ARROW_SIDE_RATIO * verticalSpan,
      angle: 90,
      triggerAt: 0.35,
    },
    {
      id: "bottom-right",
      segment: "bottom",
      x: width * C.ARROW_BOTTOM_RIGHT_RATIO,
      y: B,
      angle: 180,
      triggerAt: 0.35,
    },
    {
      id: "bottom-left",
      segment: "bottom",
      x: width * C.ARROW_BOTTOM_LEFT_RATIO,
      y: B,
      angle: 180,
      triggerAt: 0.7,
    },
    {
      id: "left-1",
      segment: "left",
      x: L,
      y: B - r - C.ARROW_SIDE_RATIO * verticalSpan,
      angle: -90,
      triggerAt: 0.35,
    },
  ];

  // Intelligence pills on the line (min 40px from arrowheads)
  const pills: PillAnchor[] = [
    {
      id: "pill-right",
      x: R,
      y: T + r + C.PILL_SIDE_RATIO * verticalSpan,
      rotate: 90,
      segment: "right",
    },
    {
      id: "pill-bottom-right",
      x: width * C.PILL_BOTTOM_RIGHT_RATIO,
      y: B,
      rotate: 0,
      segment: "bottom",
    },
    {
      id: "pill-bottom-left",
      x: width * C.PILL_BOTTOM_LEFT_RATIO,
      y: B,
      rotate: 0,
      segment: "bottom",
    },
    {
      id: "pill-left",
      x: L,
      y: T + r + C.PILL_SIDE_RATIO * verticalSpan,
      rotate: -90,
      segment: "left",
    },
  ];

  return {
    width,
    heightFull,
    heightCollapsed,
    topLineY: T,
    bottomLineY: B,
    lineLeft: L,
    lineRight: R,
    cornerR: r,
    paths,
    stages,
    modules,
    arrows,
    pills,
    avatarsCenter: { x: width / 2, y: B },
  };
}
