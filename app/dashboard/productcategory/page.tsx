import { getProductCategories } from "@/lib/db/productCategoryCrud";
import ProductCategoryTable from "./ProductCategoryTable";
import CustomContainer from "@/components/CustomContainer";

const ProductCategory = async () => {
  let productCategories: any = [];
  let error = "";

  try {
    productCategories = await getProductCategories();
  } catch (err) {
    console.error("Error fetching product categories:", err);
    error = "Check your internet connection.";
  }
  return (
    <CustomContainer>
      <div className="flex flex-col justify-center gap-8">
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <ProductCategoryTable productCategories={productCategories} />
        )}
      </div>
    </CustomContainer>
  );
};

export default ProductCategory;
