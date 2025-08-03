import ListSubheader from '@mui/material/ListSubheader';
import Stack from '@mui/material/Stack';
import NavList from './NavbarList';
import { NavItemBaseProps } from './types';

type Props = {
  navData: {
    subheader: string;
    items: NavItemBaseProps[];
  }[];
};

export const NavSection = ({ navData }: Props) => {
  return (
    <Stack component='nav' id='nav-section-vertical'>
      {navData.map((group, index) => (
        <Stack sx={{ px: 2 }} key={index}>
          {group.subheader && (
            <ListSubheader
              disableGutters
              disableSticky
              sx={{
                fontSize: 11,
                typography: 'overline',
                display: 'inline-flex',
                mb: '4px',
                p: (theme) => theme.spacing(2, 1, 1, 1.5),
                transition: (theme) =>
                  theme.transitions.create(['color'], {
                    duration: theme.transitions.duration.shortest,
                  }),
                color: 'white',
              }}
            >
              {group.subheader}
            </ListSubheader>
          )}

          {group.items.map((list) => (
            <NavList key={list.title} data={list} depth={1} />
          ))}
        </Stack>
      ))}
    </Stack>
  );
};
