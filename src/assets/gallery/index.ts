import { chineseSchoolImages } from "../chinese-schools";
import heroImage from "../hero.png";

/** Bundled gallery photos (replaces missing /hero.png in public). */
export const galleryPhotos = [
  chineseSchoolImages[0],
  chineseSchoolImages[1],
  chineseSchoolImages[2],
  chineseSchoolImages[3],
  heroImage,
] as const;
