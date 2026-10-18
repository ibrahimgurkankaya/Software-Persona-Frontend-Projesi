export default function Footer() {
  return (
    <footer className="border-t border-stone-200 py-6 text-center text-sm text-stone-500 dark:border-stone-800 dark:text-stone-500">
      <p>
        © {new Date().getFullYear()} Rafım · React, TypeScript ve Tailwind CSS ile geliştirildi
      </p>
      <p className="mt-1 text-xs">Veriler yalnızca bu tarayıcıda (LocalStorage) saklanır.</p>
    </footer>
  );
}
