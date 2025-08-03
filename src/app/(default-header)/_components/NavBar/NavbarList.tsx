import { useActiveLink } from '@/hooks/use-active-link';
import Collapse from '@mui/material/Collapse';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { NavbarListItem } from './NavbarListItem';
import { NavListProps, NavSubListProps } from './types';

export default function NavList({ data, depth }: NavListProps) {
  const pathname = usePathname();
  const active = useActiveLink(data.path, !!data.children);
  const [openMenu, setOpenMenu] = useState(active);

  useEffect(() => {
    if (!active) {
      handleCloseMenu();
    }
  }, [pathname]);

  const handleToggleMenu = useCallback(() => {
    if (data.children) {
      setOpenMenu((prev) => !prev);
    }
  }, [data.children]);

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(false);
  }, []);

  return (
    <>
      <NavbarListItem
        open={openMenu}
        id={data.id}
        onClick={handleToggleMenu}
        title={data.title}
        path={data.path}
        icon={data.icon}
        info={data.info}
        roles={data.roles}
        caption={data.caption}
        disabled={data.disabled}
        depth={depth}
        hasChild={!!data.children}
        externalLink={data.path.includes('http')}
        active={active}
        className={active ? 'active' : ''}
      />

      {!!data.children && (
        <Collapse in={openMenu} unmountOnExit>
          <NavSubList data={data.children} depth={depth} />
        </Collapse>
      )}
    </>
  );
}

const NavSubList = ({ data, depth }: NavSubListProps) => {
  return (
    <>
      {data.map((list) => (
        <NavList key={list.title} data={list} depth={depth + 1} />
      ))}
    </>
  );
};
