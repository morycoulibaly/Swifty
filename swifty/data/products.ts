export type Category = "T-shirts" | "Pantalons" | "Pulls";
export interface Product {
  slug: string; name: string; category: Category; price: number;
  description: string; material: string; sizes: string[]; images: string[]; isNew: boolean;
}

// Photos Unsplash optimisées (w=1200&q=80). Chaque produit : vue principale, dos/profil, détails matière.
const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;
const pool: Record<Category, string[]> = {
  "T-shirts": ["1521572163474-6864f9cf17ab", "1583743814966-8936f5b7be1a", "1576566588028-4147f3842f27", "1503341455253-b2e723bb3dbb", "1562157873-818bc0726f68", "1618354691373-d851c5c3a990", "1529374255404-311a2a4f1fd9", "1581655353564-df123a1eb820"],
  Pantalons: ["1624378439575-d8705ad7ae80", "1473966968600-fa801b869a1a", "1541099649105-f69ad21f3246", "1584865288642-42078afe6942", "1594938298603-c8148c4dae35", "1506629082955-511b1aa562c8", "1552902865-b72c031ac5ea", "1604176354204-9268737828e4"],
  Pulls: ["1620799140408-edc6dcb6d633", "1576871337632-b9aef4c17ab9", "1434389677669-e08b4cac3105", "1556905055-8f358a7a47b2", "1608234807905-4466023792f5", "1591047139829-d91aecb6caea", "1574180566232-aaad1b5b8450", "1610652492500-ded49ceeb378"],
};
const pick = (c: Category, start: number) => Array.from({ length: 4 }, (_, i) => u(pool[c][(start + i) % 8]));
const S = ["XS", "S", "M", "L", "XL"];

export const products: Product[] = [
  { slug: "tee-lin-essentiel", name: "Tee Lin Essentiel", category: "T-shirts", price: 65, isNew: true, sizes: S, images: pick("T-shirts", 0),
    description: "Une coupe droite, légèrement oversize, pensée comme une seconde peau. Le lin lavé offre un tombé souple et une texture vivante qui s'embellit avec le temps.", material: "70% lin, 30% coton biologique" },
  { slug: "tee-coton-pima-ample", name: "Tee Coton Pima Ample", category: "T-shirts", price: 58, isNew: false, sizes: S, images: pick("T-shirts", 2),
    description: "Un coton pima dense et doux, des épaules tombantes et un col rond net. L'essentiel du vestiaire, sans compromis sur la matière.", material: "100% coton pima" },
  { slug: "tee-col-rond-terre", name: "Tee Col Rond Terre", category: "T-shirts", price: 62, isNew: true, sizes: S, images: pick("T-shirts", 4),
    description: "Teinté en pièce dans une nuance terre cuite, ce tee s'affirme par sa couleur profonde et sa main fluide.", material: "100% coton biologique teint en pièce" },
  { slug: "pantalon-lin-taille-haute", name: "Pantalon Lin Taille Haute", category: "Pantalons", price: 145, isNew: true, sizes: ["34", "36", "38", "40", "42"], images: pick("Pantalons", 0),
    description: "Taille haute, jambe large et plis creux : un pantalon de lin qui allonge la silhouette et traverse les saisons chaudes avec élégance.", material: "100% lin européen" },
  { slug: "pantalon-tailleur-fluide", name: "Pantalon Tailleur Fluide", category: "Pantalons", price: 165, isNew: false, sizes: ["34", "36", "38", "40", "42"], images: pick("Pantalons", 2),
    description: "La rigueur du tailleur, la fluidité du quotidien. Une coupe droite à pinces, finie à la main, au tombé impeccable.", material: "60% laine vierge, 40% viscose" },
  { slug: "pantalon-ample-sable", name: "Pantalon Ample Sable", category: "Pantalons", price: 130, isNew: false, sizes: ["34", "36", "38", "40", "42"], images: pick("Pantalons", 4),
    description: "Décontracté et ample, dans un beige sable lumineux. Ceinture élastiquée cachée pour un confort total.", material: "80% coton, 20% lin" },
  { slug: "pull-maille-torsadee", name: "Pull Maille Torsadée", category: "Pulls", price: 185, isNew: true, sizes: S, images: pick("Pulls", 0),
    description: "Une grosse maille torsadée au relief sculptural, dans un écru chaleureux. Un pull-refuge, généreux et enveloppant.", material: "100% laine mérinos" },
  { slug: "pull-cachemire-terracotta", name: "Pull Cachemire Terracotta", category: "Pulls", price: 245, isNew: true, sizes: S, images: pick("Pulls", 2),
    description: "Le cachemire dans sa version la plus douce, teinté d'un terracotta profond. Fines côtes, col rond, tombé parfait.", material: "100% cachemire" },
  { slug: "pull-col-roule-boucle", name: "Pull Col Roulé Bouclé", category: "Pulls", price: 175, isNew: false, sizes: S, images: pick("Pulls", 4),
    description: "Un col roulé en maille bouclée, texturée et aérienne, aux tons de terre chauds. La douceur d'un plaid, portée près du corps.", material: "55% alpaga, 35% laine, 10% polyamide" },
];

export const categories: { name: Category; title: string; desc: string }[] = [
  { name: "T-shirts", title: "Le T-shirt, repensé", desc: "Des cotons denses et des lins lavés, coupés ample pour une allure naturelle. Chaque pièce est teinte et finie à la main." },
  { name: "Pantalons", title: "Le tombé, avant tout", desc: "Tailles hautes, jambes larges, plis creux. Des pantalons de lin et de laine qui allongent la silhouette sans la contraindre." },
  { name: "Pulls", title: "Mailles à vivre", desc: "Grosses mailles, cachemire et mérinos dans des teintes chaudes. Des pièces-refuges pensées pour durer des années." },
];

export const heroImage = u("1434389677669-e08b4cac3105");
export const byCategory = (c: Category) => products.filter((p) => p.category === c);
export const fmt = (n: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
