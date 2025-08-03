import { usePathname } from 'next/navigation';

type ReturnType = boolean;

export function useActiveLink(path: string, deep = true): ReturnType {
  const pathname = usePathname();

  if (!pathname) {
    return false;
  }

  const checkPath = path.startsWith('#');

  const normalActive = !checkPath && pathname === path;

  const deepActive = !checkPath && pathname.includes(path);

  return deep ? deepActive : normalActive;
}
