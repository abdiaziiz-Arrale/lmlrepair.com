import CustomContainer from "@/components/CustomContainer";
import ProductsTable from "@/components/ProductsTable";
import { getProducts } from "@/lib/db/productCrud";

async function Products() {
  let products: any = [];
  let error = "";

  try {
    products = await getProducts();
  } catch (err) {
    console.error("Error fetching products:", err);
    error = "Check your internet connection.";
  }
  return (
    <CustomContainer>
      <div className="flex flex-col justify-center gap-8">
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <ProductsTable products={products} />
        )}
      </div>
    </CustomContainer>
  );
}

export default Products;
