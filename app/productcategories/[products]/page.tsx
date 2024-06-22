import Image from "next/image";
import { getProducts } from "@/lib/db/productCrud";
import { Products } from "@prisma/client";
import Header from "@/components/website/header";
import Footer from "@/components/website/footer";
interface ProductsSearchParams {
  searchParams?: { productcategoryid?: string };
}

async function ProductsWebsite({ searchParams }: ProductsSearchParams) {
  let products: Products[] = [];
  let error = "";

  const productCategory = searchParams?.productcategoryid
    ? parseInt(searchParams.productcategoryid)
    : null;

  if (!productCategory) {
    error = "No product category specified.";
    return;
  }

  try {
    products = await getProducts(productCategory);
  } catch (err) {
    console.error("Error fetching products:", err);
    error = "Check your internet connection.";
  }
  return (
    <>
      <Header />
      <div className="p-5 bg-white mt-10 md:mt-20 mx-2 md:mx-4">
        <section className="flex flex-col justify-center items-center p-5 bg-white">
          <h1 className="text-4xl tracking-widest text-yellow-300">Products</h1>
          <p className="text-md ">Select the product you are interested in</p>

          <article className="flex flex-col md:flex-row flex-wrap gap-5 justify-center text-center p-10">
            {products.map((product) => (
              <figure
                key={product.product_id}
                className="bg-gray-100 rounded-lg p-5 flex flex-col justify-between gap-10"
              >
                <div className="w-52 h-44">
                  <Image
                    src={product.product_image}
                    alt={product.product_name}
                    width={200}
                    height={200}
                    className="w-48 h-52"
                  />
                </div>
                <div>
                  <figcaption>{product.product_name}</figcaption>
                  <p className="text-md text-gray-500 text-xl">
                    {" "}
                    $
                    {Math.round(
                      product.raw +
                        product.raw * (product.tax / 100) +
                        product.shipping +
                        (product.raw +
                          product.raw * (product.tax / 100) +
                          product.shipping) *
                          (product.markup / 100)
                    )}
                  </p>
                </div>
              </figure>
            ))}
          </article>
        </section>
      </div>
      <Footer />
    </>
  );
}
export default ProductsWebsite;
