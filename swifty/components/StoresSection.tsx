const stores = [
  { city: "Abidjan — Cocody", addr: "Boulevard des Martyrs, Cocody Angré", hours: "Lun–Sam · 10h–19h" },
  { city: "Abidjan — Plateau", addr: "Avenue Franchet d'Esperey, Plateau", hours: "Lun–Sam · 9h30–18h30" },
  { city: "Abidjan — Marcory", addr: "Rue du Canal, Zone 4, Marcory", hours: "Lun–Sam · 10h–19h" },
  { city: "Abidjan — Riviera", addr: "Rue des Jardins, Riviera Palmeraie", hours: "Mar–Dim · 11h–19h" },
  { city: "Bingerville", addr: "Route de la Baie, Bingerville", hours: "Mer–Dim · 11h–18h" },
  { city: "Grand-Bassam", addr: "Quartier France, Grand-Bassam", hours: "Jeu–Dim · 10h–18h" },
];
export default function StoresSection() {
  return (
    <section id="boutiques" className="scroll-mt-24 bg-lin2 px-5 py-24 md:px-10">
      <h2 className="mb-10 font-display text-4xl sm:mb-14 sm:text-5xl md:text-7xl">Nos <em>boutiques</em></h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
        {stores.map((s) => (
          <div key={s.city} className="border border-pierre/20 bg-lin p-5 sm:p-7">
            <h3 className="mb-3 font-display text-2xl">{s.city}</h3>
            <p className="text-sm">{s.addr}</p>
            <p className="mb-5 text-sm text-pierre">{s.hours}</p>
            <a href={`https://maps.google.com/?q=${encodeURIComponent("SWIFTY " + s.addr)}`} target="_blank" rel="noreferrer" className="text-sm text-terra underline-offset-4 hover:text-terra2 hover:underline">Voir sur Google Maps →</a>
          </div>
        ))}
      </div>
    </section>
  );
}
