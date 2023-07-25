import { forwardRef } from 'react';
import MuiButton, { ButtonProps as MuiButtonProps, ExtendButton } from '@mui/material/Button';
import type { OverrideProps } from '@mui/material/OverridableComponent';
import { useBackground } from '../Box';
import { styled } from '@mui/material';
import { dataAttributes, px } from '../utils';
import { fonts, fontWeights, transitions } from '../tokens';
import { colors, colorsCommon } from '@utilitywarehouse/colour-system';

export type DefaultButtonComponent = 'button';

export interface CustomButtonProps {
  /**
   * Sets the button's visual variant
   * @default primary
   */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /**
   * Sets the button height. Does not apply to `tertiary` buttons.
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
}

export type ButtonTypeMap<P = {}, D extends React.ElementType = DefaultButtonComponent> = {
  props: CustomButtonProps &
    Pick<MuiButtonProps<D, P>, 'sx' | 'classes' | 'fullWidth' | 'children' | 'href'>;
  defaultComponent: D;
};

export type ButtonProps<
  D extends React.ElementType = DefaultButtonComponent,
  P = {}
> = OverrideProps<ButtonTypeMap<P, D>, D>;

const borderWidth = 2;

const StyledButton = styled(MuiButton)({
  transition: `${transitions.duration}ms ${transitions.easingFunction}`,
  transitionProperty: 'background-color, border-color, color, opacity',
  fontFamily: fonts.secondary,
  fontWeight: fontWeights.secondary.semibold,
  fontSize: 18,
  lineHeight: 1,
  letterSpacing: '0.02857em',
  textTransform: 'none',
  opacity: 1,
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: px(32 - borderWidth),
  paddingRight: px(32 - borderWidth),
  borderStyle: 'solid',
  borderRadius: px(32),
  borderWidth,
  color: colorsCommon.brandMidnight,
  '&:disabled': {
    opacity: 0.5,
  },
  [`&[data-${dataAttributes.bgcolorBrand}=true]`]: {
    '&:disabled': {
      opacity: 0.6,
    },
  },
  // TODO: remove when `Background` component removed.
  [`[data-${dataAttributes.inverse}=true] &`]: {
    '&:disabled': {
      opacity: 0.6,
    },
  },
  // size
  [`&[data-${dataAttributes.size}=small]`]: {
    height: px(32),
  },
  [`&[data-${dataAttributes.size}=medium]`]: {
    height: px(40),
  },
  [`&[data-${dataAttributes.size}=large]`]: {
    height: px(48),
  },
  [`&[data-${dataAttributes.variant}=primary]`]: {
    color: colorsCommon.brandMidnight,
    backgroundColor: colors.cyan400,
    border: 'none',
    paddingLeft: px(32),
    paddingRight: px(32),
    '&:hover': {
      backgroundColor: colors.cyan200,
    },
  },
  [`&[data-${dataAttributes.variant}=secondary]`]: {
    color: colorsCommon.brandMidnight,
    backgroundColor: 'transparent',
    borderColor: colors.cyan400,
    '&:hover': {
      borderColor: colorsCommon.brandMidnight,
      borderWidth,
    },
    '&:disabled': {
      opacity: 0.5,
      borderWidth,
    },
    [`&[data-${dataAttributes.bgcolorBrand}=true]`]: {
      color: colorsCommon.brandWhite,
      '&:hover': {
        borderColor: colorsCommon.brandWhite,
      },
    },
    // TODO: remove when `Background` component removed.
    [`[data-${dataAttributes.inverse}=true] &`]: {
      color: colorsCommon.brandWhite,
      '&:hover': {
        borderColor: colorsCommon.brandWhite,
      },
    },
  },
  [`&[data-${dataAttributes.variant}=tertiary]`]: {
    color: colorsCommon.brandMidnight,
    backgroundColor: 'transparent',
    borderColor: colors.cyan400,
    height: 'auto',
    paddingBottom: 2,
    paddingLeft: 0,
    paddingRight: 0,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderRadius: 0,
    lineHeight: 1.333,
    '&:hover': {
      opacity: 0.5,
    },
    [`&[data-${dataAttributes.bgcolorBrand}=true]`]: {
      color: colorsCommon.brandWhite,
    },
    // TODO: remove when `Background` component removed.
    [`[data-${dataAttributes.inverse}=true] &`]: {
      color: colorsCommon.brandWhite,
    },
  },
});

/**
 * A Button should be used for actions.
 */
export const Button = forwardRef(function Button(
  { size = 'medium', variant = 'primary', ...props },
  ref
) {
  const { isBrandBackground } = useBackground();
  const dataAttributeProps = {
    [`data-${dataAttributes.variant}`]: variant,
    [`data-${dataAttributes.size}`]: size,
    [`data-${dataAttributes.bgcolorBrand}`]: isBrandBackground,
  };
  return (
    <StyledButton
      {...(props as Partial<MuiButtonProps>)}
      ref={ref}
      {...dataAttributeProps}
      disableElevation
    />
  );
}) as ExtendButton<ButtonTypeMap>;
