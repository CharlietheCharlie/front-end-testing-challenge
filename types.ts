import React from 'react';

export enum TestFramework {
  RTL = 'RTL',
  JEST = 'Jest',
  PLAYWRIGHT = 'Playwright'
}

export type Language = 'en' | 'zh';

export interface LocalizedContent {
  en: string;
  zh: string;
}

export interface ForbiddenPattern {
  pattern: RegExp;
  message: LocalizedContent;
}

export interface VerificationRule {
  description: LocalizedContent; // What we are checking for (e.g., "Find the Email input")
  mustMatch: RegExp[]; // ALL of these regexes must pass for this rule
  mustNotMatch?: ForbiddenPattern[]; // If ANY of these pass, the rule fails
}

export interface Lesson {
  id: string;
  section: string;
  title: LocalizedContent;
  description: LocalizedContent;
  framework: TestFramework;
  difficulty: 'Beginner' | 'Intermediate' | 'Tricky' | 'Advanced';
  requirements: LocalizedContent[];
  initialCode: string;
  targetComponent: React.FC; 
  targetCodeDisplay: string;
  validationRules: VerificationRule[];
  hint: LocalizedContent;
}

export interface TestResult {
  passed: boolean;
  logs: string[];
  coverage: number;
  error?: string;
}

export interface AIResponse {
  feedback: string;
  suggestion: string;
}