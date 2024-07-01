import Link from "next/link";
import { getProductCategories } from "@/lib/db/productCategoryCrud";
import Header from "@/components/website/header";
import Footer from "@/components/website/footer";
import { ProductCategories } from "@prisma/client";

export default async function ProductCategoriesPage() {
  let productCategories: ProductCategories[] = [];
  let error = "";

  try {
    productCategories = await getProductCategories();
  } catch (err) {
    console.error("Error fetching services:", err);
    error = "Check your internet connection.";
  }

  return (
    <>
      <Header />

      <div className="p-5 bg-white mt-10 md:mt-20 mx-2 md:mx-4">

        <section className="flex flex-col justify-center items-center p-5 bg-white">
          <h1 className="text-4xl tracking-widest text-yellow-300">Products</h1>
          <p className="text-md ">
            Select the product category you are interested in
          </p>
          <article className="flex flex-col md:flex-row flex-wrap gap-5 justify-center text-center p-10">
            {error ? (
              <p className="text-red-500 text-center">{error}</p>
            ) : (
              productCategories.map((category) => (
                <figure
                  key={category.product_category_id}
                  className="bg-gray-100 rounded-lg p-5 flex flex-col justify-between gap-10"
                >
                  <div className="w-52 h-44">
                    <Link
                      href={`/productcategories/productsubcategories?productcategoryid=${category.product_category_id}`}
                    >
                      <img
                        src={category.product_category_image}
                        alt={category.product_category_name}
                        width={200}
                        height={200}
                        className="w-48 h-52"
                      />
                    </Link>
                  </div>
                  <div>
                    <figcaption>{category.product_category_name}</figcaption>
                  </div>
                </figure>
              ))
            )}
          </article>
        </section>
      </div>
      <Footer />
    </>
  );
}
