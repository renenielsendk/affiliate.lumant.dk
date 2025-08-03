import { ListItemButtonProps } from '@mui/material/ListItemButton';

export type NavItemStateProps = {
  depth?: number;
  open?: boolean;
  active?: boolean;
  hasChild?: boolean;
  currentRole?: string;
  externalLink?: boolean;
};

export type NavItemBaseProps = {
  title: string;
  id?: string;
  path: string;
  icon?: string;
  info?: React.ReactElement;
  caption?: string;
  disabled?: boolean;
  roles?: string[];
  children?: any;
};

export type NavItemProps = ListItemButtonProps & NavItemStateProps & NavItemBaseProps;

export type NavListProps = {
  data: NavItemBaseProps;
  depth: number;
};

export type NavSubListProps = {
  data: NavItemBaseProps[];
  depth: number;
};

export type NavGroupProps = {
  subheader?: string;
  items: NavItemBaseProps[];
};
