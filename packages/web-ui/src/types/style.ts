import { SystemProps as MuiSystemProps, SxProps as MuiSxProps } from '@mui/system';
import { Theme } from '../theme';

export type SystemProps = keyof MuiSystemProps<Theme>;

export type PropsWithSx<P = unknown> = P & {
  sx?: MuiSxProps<Theme>;
};
