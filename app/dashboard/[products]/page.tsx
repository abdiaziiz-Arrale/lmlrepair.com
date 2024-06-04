import CustomContainer from "@/components/CustomContainer";
import ProductsTable from "@/components/ProductsTable";
import { getProducts } from "@/lib/db/productCrud";
import Link from "next/link";

interface ProductsSearchParams {
  searchParams?: { productcategoryid?: string };
}

async function Products({ searchParams }: ProductsSearchParams) {
  let products: any = [];
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
    <CustomContainer>
      <div className="flex flex-col justify-center gap-8">
        {error ? (
          <div className="flex flex-col items-center gap-2">
            <p className="text-red-500">{error}</p>
            <Link
              className="text-blue-500 underline text-xl"
              href="/dashboard/productcategory"
            >
              Go here
            </Link>
          </div>
        ) : (
          <ProductsTable
            productCategoryId={productCategory}
            products={products}
          />
        )}
      </div>
    </CustomContainer>
  );
}

export default Products;
