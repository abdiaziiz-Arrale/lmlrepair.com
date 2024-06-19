import Footer from "@/components/website/footer";
import Header from "@/components/website/header";
import { getBrands } from "@/lib/db/brandCrud";
import { Brand } from "@prisma/client";
import Link from "next/link";

export default async function Brands() {
  let brands: Brand[] = [];
  let error = "";

  try {
    brands = await getBrands();
  } catch (err) {
    console.error("Error fetching brands:", err);
    error = "Check your internet connection.";
  }

  return (
    <>
      <Header />
      <main className="p-5 mt-10 md:mt-20 md:mx-4">
        <section className="flex flex-col justify-center items-center p-5">
          <h1 className="text-4xl tracking-widest text-yellow-300">Brands</h1>
          <p className="text-md">
            Select the brand category you are interested in
          </p>
        </section>

        <article className="flex flex-col md:flex-row flex-wrap gap-5 justify-center text-center p-10">
          {error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            brands.map((brand) => (
              <figure
                key={brand.brand_id}
                className="bg-gray-100 rounded-lg flex flex-col justify-center items-center gap-10 py-14 md:py-6 p-5"
              >
                <div>
                  <figcaption>{brand.brand_name}</figcaption>
                </div>
                <div>
                  <Link
                    href={`/services/brands/series?brandid=${brand.brand_id}`}
                  >
                    <img
                      className="rounded-lg w-48 h-52"
                      src={brand.brand_image}
                      alt={brand.brand_name}
                      width={100}
                      height={100}
                    />
                  </Link>
                </div>
              </figure>
            ))
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
