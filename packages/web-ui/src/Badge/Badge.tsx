import { createBox } from '../Box/createBox';
import { useBackground } from '../Box';
import { dataAttributes, px } from '../utils';
import { colors, colorsCommon } from '@utilitywarehouse/colour-system';
import { styled, theme } from '../theme';
import { Chip } from '@mui/material';
import { fontWeights, fonts } from '../tokens';

const BaseBox = createBox({
  componentClassName: 'Badge',
});

export interface CustomBadgeProps {
  /**
   * Sets the badges's visual variant
   * @default soft
   */
  variant?: 'soft' | 'strong' | 'outline';
  /**
   * Sets the colour scheme.
   * @default cyan
   */
  colorScheme?: 'cyan' | 'green' | 'red' | 'gold' | 'grey';
  /**
   * Sets the lower border radius. Use 'false' when placing the component directly above other components, e.g. a box.
   * @default true
   */
  bottomRadius?: boolean;
  children: string;
  /**
   * Sets whether the padding of the badge text is compressed 
   * @default false
   */
  compressed?: boolean;
}


const StyledBadge = styled(Chip)({
  fontFamily: fonts.secondary,
  fontWeight: fontWeights.secondary.regular,
  fontSize: 13,
  lineHeight: '16px',
  textTransform: 'none',
  opacity: 1,
  borderStyle: 'solid',
  borderRadius: px(4),
  // padding: children.compressed ? 0 : theme.spacing(32),

  [`&[data-${dataAttributes.variant}=soft]`]: {
    [`&[data-colorscheme=cyan]`]: {
      '--button-foreground-color': colors.cyan1000,
      '--button-border-color': colors.cyan400,
    },
  },

  [`&[data-${dataAttributes.colorScheme}=cyan`]: {
    color: colorsCommon.brandMidnight,
    border: 'none',
    backgroundColor: colors.cyan200,
  },
  [`&[data-${dataAttributes.variant}=strong]`]: {
    color: colorsCommon.brandMidnight,
    backgroundColor: 'transparent',
    borderColor: colors.cyan400,
  },
  [`&[data-${dataAttributes.variant}=outline]`]: {
    color: colorsCommon.brandMidnight,
    backgroundColor: 'transparent',
    borderColor: colors.cyan400,
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
  [`[data-${dataAttributes.bottomRadius}=false}] &`]: {
    borderBottomLeftRadius: `${theme.spacing(0)}`,
    borderBottomRightRadius: `${theme.spacing(0)}`,
  },
  [`& [data-${dataAttributes.bgcolorBrand} = true]`]: {
    color: colorsCommon.brandWhite,
  },
  [`[data-${dataAttributes.compressed} = true] & `]: {
    padding: theme.spacing(0),
  },
  [`[data-${dataAttributes.compressed} = false] & `]: {
    padding: theme.spacing(8),
  },
}
);

export const Badge = (props: CustomBadgeProps) => {
  const { children } = props
  const { isBrandBackground } = useBackground();
  const dataAttributeProps = {
    [`data-${dataAttributes.variant}`]: props.variant,
    [`data-${dataAttributes.compressed}`]: props.compressed,
    [`data-${dataAttributes.bgcolorBrand}`]: isBrandBackground,
  };
  return (
    <BaseBox sx={{
      alignSelf: 'flex-start',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'auto',
      colorScheme: props.colorScheme,
      borderRadius: '4px',
      padding: theme.spacing(0, 1)
    }}>
      <StyledBadge label={children} {...dataAttributeProps} />
    </BaseBox>)
}