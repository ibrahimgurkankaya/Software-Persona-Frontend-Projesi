import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { LogoIcon, MoonIcon, PlusIcon, SunIcon } from './Icons';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'rounded-lg px-2.5 py-2 text-sm font-semibold sm:px-3 text-amber-800 bg-amber-100/70 dark:text-amber-300 dark:bg-amber-500/10'
    : 'rounded-lg px-2.5 py-2 text-sm font-medium sm:px-3 text-stone-600 hover:text-stone-900 hover:bg-stone-100 dark:text-stone-400 dark:hover:text-stone-100 dark:hover:bg-stone-800';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-stone-50/85 backdrop-blur dark:border-stone-800 dark:bg-stone-950/85">
      <nav className="mx-auto flex h-16 max-w-6xl items-center gap-1 px-4 sm:gap-3 sm:px-6">
        <Link to="/" className="mr-auto flex shrink-0 items-center gap-2.5" aria-label="Rafım ana sayfa">
          <span className="flex size-9 items-center justify-center rounded-xl bg-amber-700 text-amber-50 shadow-sm dark:bg-amber-500 dark:text-stone-950">
            <LogoIcon className="size-5" />
          </span>
          <span className="hidden font-display text-xl font-bold tracking-tight text-stone-900 min-[380px]:inline dark:text-stone-50">
            Rafım
          </span>
        </Link>

        <NavLink to="/" end className={navLinkClass}>
          Listem
        </NavLink>
        <NavLink to="/hakkinda" className={navLinkClass}>
          Hakkında
        </NavLink>

        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-lg p-2 text-stone-500 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100"
          aria-label={theme === 'dark' ? 'Açık temaya geç' : 'Koyu temaya geç'}
          title={theme === 'dark' ? 'Açık tema' : 'Koyu tema'}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>

        <Link to="/ekle" className="btn btn-primary px-3 sm:px-4" aria-label="Yeni kayıt ekle">
          <PlusIcon className="size-4" />
          <span className="hidden sm:inline">Yeni Ekle</span>
        </Link>
      </nav>
    </header>
  );
}
