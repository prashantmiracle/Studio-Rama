export interface Product {
  id: string;
  name: string;
  price: number;
  category: "Saree" | "Kurta" | "Blouse" | "Designer Blouse" | "Dupatta" | "Kaftan";
  fabricCraft: string;
  description: string;
  visualTag?: string; // Color palette context or visual hint
  colorHex?: string; // Rich color representor
}

export interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  category: string;
  speakerNotes: string[];
  visualMetric?: {
    value: string;
    label: string;
  };
}

export type ThemeName = "crimsonGold" | "ivoryCharcoal" | "forestSand" | "indigoAmethyst";

export interface BrandTheme {
  name: string;
  bgClass: string;
  cardBg: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  borderClass: string;
  badgeBg: string;
  glowColor: string;
}
