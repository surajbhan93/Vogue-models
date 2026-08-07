export interface CityItem {
  name: string;
  country: string;
  code: string;
  tagline: string;
}

export const ELITE_CITIES: CityItem[] = [
  { name: 'NEW YORK', country: 'UNITED STATES', code: 'NYC', tagline: 'FASHION CAPITAL' },
  { name: 'LOS ANGELES', country: 'UNITED STATES', code: 'LAX', tagline: 'WEST COAST LUXURY' },
  { name: 'PARIS', country: 'FRANCE', code: 'CDG', tagline: 'HAUTE COUTURE' },
  { name: 'MILAN', country: 'ITALY', code: 'MXP', tagline: 'GLOBAL HERITAGE' },
  { name: 'LONDON', country: 'UNITED KINGDOM', code: 'LHR', tagline: 'CONTEMPORARY AVANT-GARDE' },
  { name: 'TOKYO', country: 'JAPAN', code: 'HND', tagline: 'HIGH STREET & BEAUTY' },
  { name: 'DUBAI', country: 'UNITED ARAB EMIRATES', code: 'DXB', tagline: 'LUXURY REDEFINED' },
];

export const INTRO_TIMINGS = {
  blackScreenEnd: 0.5,
  videoFadeInEnd: 1.2,
  logoFadeInEnd: 2.0,
  citiesStart: 2.0,
  cityDisplayDuration: 400, // ms per city stay
  cityFadeDuration: 250,    // ms per city transition
  citiesFinish: 5.5,
  logoZoomStart: 6.0,
  fadeStart: 6.5,
  homePageAppear: 6.8,
} as const;
