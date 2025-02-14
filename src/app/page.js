import Image from "next/image";
import Navbar from "@/components/Navbar";
import ProductSearch from "@/components/ProductSearch";
export default function Home() {
  return (
  <section className="flex flex-col gap-6 items-center justify-center min-h-screen w-full">
    <Navbar/>
    <ProductSearch/>
    </section>
  );
}
