import { Lesson } from '../types';
import { SECTION1 } from './lessons/section1';
import { SECTION2 } from './lessons/section2';
import { SECTION3 } from './lessons/section3';
import { SECTION4 } from './lessons/section4';
import { SECTION5 } from './lessons/section5';
import { SECTION6 } from './lessons/section6';

export const LESSONS: Lesson[] = [
  ...SECTION1,
  ...SECTION2,
  ...SECTION3,
  ...SECTION4,
  ...SECTION5,
  ...SECTION6,
];