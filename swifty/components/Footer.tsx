import Link from "next/link";
export default function Footer() {
  return (
    <footer className="overflow-hidden bg-encre px-4 pt-12 text-lin sm:px-5 sm:pt-16 md:px-10">
      <div className="mb-10 flex flex-wrap gap-x-5 gap-y-3 text-xs text-lin/70 sm:gap-x-10 sm:text-sm">
        <Link href="/#accueil" className="hover:text-terra">Accueil</Link>
        <Link href="/catalogue#catalogue" className="hover:text-terra">Catalogue</Link>
        <Link href="/#boutiques" className="hover:text-terra">Boutiques</Link>
        <span className="md:ml-auto">Mentions légales · CGV · Confidentialité</span>
      </div>
      <p className="select-none whitespace-nowrap text-center font-display text-[22vw] font-semibold leading-[0.8] tracking-tight sm:text-[27vw]">SWIFTY</p>
      <p className="py-4 text-center text-[10px] text-lin/50">© {new Date().getFullYear()} SWIFTY. Tous droits réservés.</p>
    </footer>
  );
}
