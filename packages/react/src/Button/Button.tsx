import * as React from 'react';
import MuiButton, { ButtonProps as MuiButtonProps, ExtendButton } from '@mui/material/Button';
import { dataAttributes, isInverseBackgroundColor } from '../utils';
import { OverrideProps } from '@mui/material/OverridableComponent';
import { useBackground } from '../Background';
import { TypographyProps } from '@mui/system';

type DefaultComponent = 'button';

interface CustomProps<D extends React.ElementType = DefaultComponent, P = {}>
  extends Pick<MuiButtonProps<D, P>, 'sx' | 'classes' | 'fullWidth' | 'children' | 'href'> {
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'tertiary';
  textTransform?: TypographyProps['textTransform'];
}

type TypeMap<P = {}, D extends React.ElementType = DefaultComponent> = {
  props: CustomProps<D, P>;
  defaultComponent: D;
};

export type ButtonProps<D extends React.ElementType = DefaultComponent, P = {}> = OverrideProps<
  TypeMap<P, D>,
  D
>;

const Button = React.forwardRef(function Button(
  { size = 'medium', variant = 'primary', textTransform, sx, className, ...props },
  ref
) {
  const { backgroundColor } = useBackground();

  const inverse = isInverseBackgroundColor(backgroundColor);

  const dataAttributeProps = {
    [`data-${dataAttributes.variant}`]: variant,
    [`data-${dataAttributes.size}`]: size,
    [`data-${dataAttributes.inverse}`]: inverse,
  };

  return (
    <MuiButton
      {...(props as Partial<MuiButtonProps>)}
      className={className}
      ref={ref}
      {...dataAttributeProps}
      sx={{
        textTransform,
        ...sx,
      }}
    />
  );
}) as ExtendButton<TypeMap>;

export default Button;
