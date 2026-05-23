import schoolA from "./gettyimages-1415792630-2048x2048.jpg";
import schoolB from "./gettyimages-1746091585-2048x2048.jpg";
import schoolC from "./gettyimages-1761383213-2048x2048.jpg";
import schoolD from "./gettyimages-2140056328-2048x2048.jpg";

export const chineseSchoolImages = [schoolA, schoolB, schoolC, schoolD] as const;

export type FlyingSchoolPlacement = {
  src: (typeof chineseSchoolImages)[number];
  side: "left" | "right";
  top: string;
  inset: string;
  sizeClass: string;
  rotate: number;
  duration: number;
  delay: number;
  yDrift: number;
  xDrift: number;
};

export const flyingSchoolPlacements: FlyingSchoolPlacement[] = [
  {
    src: chineseSchoolImages[0],
    side: "left",
    top: "8%",
    inset: "2%",
    sizeClass: "w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44",
    rotate: -6,
    duration: 5.5,
    delay: 0,
    yDrift: 14,
    xDrift: 6,
  },
  {
    src: chineseSchoolImages[1],
    side: "left",
    top: "52%",
    inset: "0.5%",
    sizeClass: "w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36",
    rotate: 4,
    duration: 6.2,
    delay: 0.8,
    yDrift: 12,
    xDrift: 5,
  },
  {
    src: chineseSchoolImages[2],
    side: "right",
    top: "14%",
    inset: "2%",
    sizeClass: "w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44",
    rotate: 5,
    duration: 5.8,
    delay: 0.4,
    yDrift: 13,
    xDrift: -6,
  },
  {
    src: chineseSchoolImages[3],
    side: "right",
    top: "58%",
    inset: "0.5%",
    sizeClass: "w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36",
    rotate: -4,
    duration: 6.5,
    delay: 1.1,
    yDrift: 11,
    xDrift: -5,
  },
];
