import { createContext, forwardRef, type ReactNode } from 'react';
import { Box, BoxProps } from '../Box';
import { type RadioGroupProps as RadixRadioGroupProps, Root } from '@radix-ui/react-radio-group';
import { Fieldset } from '../Fieldset';
import { FieldsetLegend } from '../FieldsetLegend';
import { FormHelperText } from '../FormHelperText';
import { FormErrorMessage } from '../FormErrorMessage';
import { useIds } from '../hooks';
import { SxProps } from '../types';
import { mergeIds } from '../utils';

export type RadioGroupContextValue = { hasGroupHelperText: boolean; 'aria-describedby'?: string };
export const RadioGroupContext = createContext<RadioGroupContextValue>({
  hasGroupHelperText: false,
} as RadioGroupContextValue);

export interface BaseRadioGroupProps extends Omit<RadixRadioGroupProps, 'dir'>, SxProps {
  children: ReactNode;
  /**
   * The label for the radio group. This should contain the question being
   * answered by the radio group.
   *
   * If you don't include a label you need to ensure you use the `aria-label`
   * or `aria-labelledby` prop to properly associate a label with the radio
   * group.
   */
  label?: ReactNode;
  /**
   * Helper text for the radio group. Provides a hint such as specific
   * requirements for what to choose. When displayed, child `Radio` or
   * `RadioTile` components will not display `helperText`.
   */
  helperText?: ReactNode;
  /**
   * Position of the helper text.
   * @default 'top'
   */
  helperTextPosition?: 'top' | 'bottom';
  /** Controls whether the error message is displayed. */
  error?: boolean;
  /** The error message to be displayed. */
  errorMessage?: ReactNode;
}

export const RadioGroupFormControl = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      id: providedId,
      children,
      label,
      helperText,
      helperTextPosition = 'top',
      error,
      errorMessage,
      sx,
      disabled,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
      'aria-errormessage': ariaErrorMessage,
      ...props
    },
    ref
  ) => {
    const { id, labelId, helperTextId, errorMessageId } = useIds({
      providedId,
      componentPrefix: 'radiogroup',
    });
    const showErrorMessage = Boolean(error && errorMessage);
    return (
      <Root
        ref={ref}
        asChild
        {...props}
        disabled={disabled}
        id={id}
        aria-errormessage={ariaErrorMessage || showErrorMessage ? errorMessageId : undefined}
        aria-labelledby={ariaLabelledby || !!label ? labelId : undefined}
        aria-invalid={showErrorMessage}
      >
        <Fieldset sx={sx}>
          {label ? <FieldsetLegend id={labelId}>{label}</FieldsetLegend> : null}
          <Box
            display="flex"
            gap={2}
            flexDirection={helperTextPosition === 'top' ? 'column' : 'column-reverse'}
          >
            {helperText ? <FormHelperText id={helperTextId}>{helperText}</FormHelperText> : null}
            <RadioGroupContext.Provider
              value={{
                hasGroupHelperText: !!helperText,
                'aria-describedby': mergeIds(
                  ariaDescribedby || !!helperText ? helperTextId : undefined,
                  ariaErrorMessage || showErrorMessage ? errorMessageId : undefined
                ),
              }}
            >
              {children}
            </RadioGroupContext.Provider>
          </Box>
          {showErrorMessage ? (
            <FormErrorMessage id={errorMessageId}>{errorMessage}</FormErrorMessage>
          ) : null}
        </Fieldset>
      </Root>
    );
  }
);

export interface RadioGroupProps extends BaseRadioGroupProps {
  /** The direction of the radios, will also set the aria-orientation value. */
  direction?: 'column' | 'row';
  /**
   * Set the width of the RadioGroup children, separate to the width of the
   * entire RadioGroup.
   */
  contentWidth?: BoxProps['width'];
}

/**
 * The `RadioGroup` provides an accessible way to group and control a set of
 * `Radio` or `RadioTile` components, allowing the user to select one option from a set.
 *
 * The `RadioGroup` is responsible for handling the value, helper text, error
 * state, error message, and disabled state, as well as determining the presentation and
 * selection of the items in the list.
 *
 * Follows the [WAI-ARIA Radio Group Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) for radio groups not contained in a toolbar.
 */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      children,
      contentWidth = 'fit-content',
      direction = 'column',
      orientation = 'vertical',
      ...props
    },
    ref
  ) => {
    return (
      <RadioGroupFormControl
        ref={ref}
        {...props}
        orientation={orientation || direction === 'column' ? 'vertical' : 'horizontal'}
      >
        <Box
          display="flex"
          gap={2}
          flexDirection={direction}
          minWidth="fit-content"
          width={contentWidth}
        >
          {children}
        </Box>
      </RadioGroupFormControl>
    );
  }
);
