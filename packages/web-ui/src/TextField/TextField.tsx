import * as React from 'react';
import FilledInput, { FilledInputProps } from '@mui/material/FilledInput';
import { TickMediumContainedIcon, WarningMediumContainedIcon } from '@utilitywarehouse/react-icons';
import FormControl from '@mui/material/FormControl';
import { Box } from '../Box';
import type { ReactNode, AllHTMLAttributes } from 'react';
import { styled } from '@mui/material';
import { Label } from '../Label';
import { HelperText } from '../HelperText';
import { colors, colorsCommon } from '@utilitywarehouse/colour-system';
import { fonts, fontWeights, transitions } from '../tokens';
import { dataAttributes, pxToRem, spacing } from '../utils';

const isSuccessStatus = (status?: string): boolean => status === 'success';
const isErrorStatus = (status?: string): boolean => status === 'error';

const { success, multiline } = dataAttributes;
const StyledInput = styled(FilledInput)({
  fontFamily: fonts.secondary,
  fontSize: pxToRem(18),
  fontWeight: fontWeights.secondary.regular,
  height: 58,
  borderRadius: 0,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  borderStyle: 'solid',
  paddingLeft: spacing(2),
  paddingRight: spacing(2),
  borderBottom: 0,
  color: colorsCommon.brandMidnight,
  backgroundColor: colorsCommon.brandWhite,
  borderColor: colors.grey100,
  borderBottomColor: colorsCommon.brandPrimaryPurple,
  borderWidth: 2,
  transition: `border ${transitions.duration}ms ${transitions.easingFunction}`,
  ':hover': {
    backgroundColor: colorsCommon.brandWhite,
    borderBottomColor: colors.cyan600,
    '&:not(.Mui-disabled):not(.Mui-error),': {
      '&:before': {
        borderWidth: 2,
        transition: `border ${transitions.duration}ms ${transitions.easingFunction}`,
        borderBottomColor: colors.cyan600,
      },
    },
  },
  '&:before': {
    borderColor: colorsCommon.brandPrimaryPurple,
    borderWidth: 2,
    transition: `border ${transitions.duration}ms ${transitions.easingFunction}`,
  },
  '&:after': {
    borderColor: colors.cyan600,
    borderWidth: 2,
    transition: `border ${transitions.duration}ms ${transitions.easingFunction}`,
  },
  '&.Mui-focused': {
    backgroundColor: colorsCommon.brandWhite,
    borderColor: colors.cyan600,
  },
  '&.Mui-disabled': {
    color: colorsCommon.brandMidnight,
    backgroundColor: colors.grey50,
    borderColor: colors.grey100,
    borderBottomColor: colors.grey600,
    transition: `all ${transitions.duration}ms ${transitions.easingFunction}`,
    '&:before': {
      borderColor: colors.grey600,
      borderBottomStyle: 'solid',
    },
    '&:after': {
      borderColor: colors.grey600,
    },
  },
  '&.Mui-error': {
    ':before': {
      borderBottomColor: colors.red600,
    },
    '&.Mui-focused': {
      borderColor: colors.red600,
    },
    '&:not(.Mui-disabled)': {
      '&:after': {
        borderColor: colors.red600,
      },
    },
  },
  [`&[data-${success}=true]`]: {
    ':before': {
      borderBottomColor: colors.green600,
    },
    '&:after': {
      borderBottomColor: colors.green600,
    },
    ':hover': {
      '&:not(.Mui-disabled)': {
        '&:before': {
          borderColor: colors.green600,
        },
      },
    },
    '&.Mui-focused': {
      borderColor: colors.green600,
    },
    '&:not(.Mui-disabled)': {
      borderBottomColor: colors.green600,
    },
  },
  [`&[data-${multiline}=true]`]: {
    // padding values differ slightly from non-multiline since a `textarea` is rendered rather than an `input`.
    paddingTop: 15,
    paddingBottom: 14,
    // height is overridden to allow the input to expand with any number of lines
    height: 'auto',
    minHeight: 58,
  },
  input: {
    padding: 0,
  },
});

type FormElementProps = AllHTMLAttributes<HTMLFormElement>;

export interface TextFieldProps
  extends Omit<
    FilledInputProps,
    | 'color'
    | 'components'
    | 'componentsProps'
    | 'disableUnderline'
    | 'error'
    | 'fullWidth'
    | 'hiddenLabel'
    | 'id'
    | 'inputComponent'
    | 'inputProps'
    | 'inputRef'
    | 'margin'
    | 'ref'
    | 'slotProps'
    | 'slots'
  > {
  /**
   * The unique id used to properly label the `input` element.
   * @required
   */
  id: NonNullable<FormElementProps['id']>;
  'aria-label'?: NonNullable<FormElementProps['aria-label']>;
  'aria-labelledby'?: NonNullable<FormElementProps['aria-labelledby']>;
  /**
   * Sets the visual status of the Textfield.
   * @default 'neutral'
   */
  status?: 'neutral' | 'success' | 'error';
  /**
   * Sets the label for the TextField. If not used, please ensure you set
   * either `aria-label`, or `aria-labelledby` and `labelId`.
   */
  label?: ReactNode;
  /** The id passed to the label element. You should set this if using `aria-lebelledby`. */
  labelId?: string;
  /** Sets descriptive helper text. */
  helperText?: ReactNode;
  /** If true, a TextareaAutosize element is rendered. */
  multiline?: boolean;
}

const IconContainer = styled(Box)({ display: 'flex', marginLeft: spacing(0.5) });

const Input = React.forwardRef<HTMLInputElement, TextFieldProps>(function TextfieldInput(
  {
    status = 'neutral',
    endAdornment,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    ...props
  },
  ref
) {
  const showIcon = !props.disabled;
  const inputProps = {
    'aria-labelledby': ariaLabelledBy,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
  };
  const dataAttributeProps = {
    [`data-${dataAttributes.success}`]: !props.disabled && isSuccessStatus(status),
    [`data-${dataAttributes.multiline}`]: !!props.multiline,
  };

  return (
    <StyledInput
      inputRef={ref}
      hiddenLabel
      endAdornment={
        <>
          {showIcon ? (
            <IconContainer>
              {isErrorStatus(status) ? (
                <WarningMediumContainedIcon color={colors.red600} />
              ) : isSuccessStatus(status) ? (
                <TickMediumContainedIcon color={colors.green600} />
              ) : null}
            </IconContainer>
          ) : null}
          {endAdornment ? <IconContainer>{endAdornment}</IconContainer> : null}
        </>
      }
      inputProps={inputProps}
      {...props}
      {...dataAttributeProps}
    />
  );
});

/**
 * TextField enables users to enter text into a UI. They typically appear in forms and dialogs.
 *
 * > This component should be wrapped in a ThemeProvider
 */
export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(function Textfield(
  { label, labelId, helperText, 'aria-label': ariaLabel, ...props },
  ref
) {
  const { status = 'neutral', disabled } = props;
  const hasErrorStatus = !disabled && isErrorStatus(status);
  const formControlProps = { error: hasErrorStatus, disabled };
  const ariaDescribedBy = !!helperText
    ? props['aria-describedby'] || `${props.id}-helper-text`
    : undefined;
  const ariaLabelledBy = !!label ? labelId : props['aria-labelledby'];

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {!!label ? (
        <Label id={labelId} htmlFor={props.id} disabled={disabled}>
          {label}
        </Label>
      ) : null}

      <FormControl fullWidth={true} {...formControlProps}>
        <Input
          ref={ref}
          {...props}
          aria-describedby={ariaDescribedBy}
          aria-labelledby={ariaLabelledBy}
          aria-label={ariaLabel}
        />
      </FormControl>

      <HelperText id={ariaDescribedBy} disabled={disabled} error={isErrorStatus(status)}>
        {helperText || '\u00A0'}
      </HelperText>
    </Box>
  );
});
