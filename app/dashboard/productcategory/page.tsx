import { getProductCategories } from "@/lib/db/productCategoryCrud";
import ProductCategoryTable from "./ProductCategoryTable";
import CustomContainer from "@/components/CustomContainer";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/lib/config/authOptions";
import { redirect } from "next/navigation";
const ProductCategory = async () => {
  let productCategories: any = [];
  let error = "";
  const staffInSession: Session | null = await getServerSession(authOptions);
  if (!staffInSession) {
    redirect("/");
  }
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
