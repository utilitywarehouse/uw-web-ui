import { type BackgroundColor, inverseBackgroundColors } from '../types';

export const globalClassPrefix = 'uw-web-ui';

export const px = (value: string | number): string => `${value}px`;

export const isInverseBackgroundColor = (backgroundColor: BackgroundColor): boolean => {
  return (inverseBackgroundColors as ReadonlyArray<string>).includes(backgroundColor);
};
