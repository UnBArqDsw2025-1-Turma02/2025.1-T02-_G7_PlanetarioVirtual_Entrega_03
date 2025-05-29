export function Footer() {
  return (
    <footer className="w-full bg-gray-800 border-t border-gray-700 text-gray-400 text-center p-4">
      <p>&copy; {new Date().getFullYear()} Planetário Virtual. Todos os direitos reservados.</p>
      <p className="text-xs mt-1">
        Desenvolvido com Next.js, TypeScript e Tailwind CSS.
      </p>
    </footer>
  );
}