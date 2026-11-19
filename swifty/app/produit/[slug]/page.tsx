import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductView from "@/components/ProductView";

export function generateStaticParams() { return products.map((p) => ({ slug: p.slug })); }

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) notFound();
  return <ProductView product={product} />;
}
