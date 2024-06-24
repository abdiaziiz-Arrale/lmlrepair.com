import { getProductSubCategories } from "@/lib/db/productSubCategoryCrud";
import CustomContainer from "@/components/CustomContainer";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/lib/config/authOptions";
import { redirect } from "next/navigation";
import ProductSubCategoryTable from "./ProductSubCategoryTable";

const ProductSubCategory = async ({
  searchParams,
}: {
  searchParams: { productcategoryid: string };
}) => {
  let productSubCategories: any = [];
  let error = "";
  const staffInSession: Session | null = await getServerSession(authOptions);
  if (!staffInSession) {
    redirect("/");
  }

  const productCategory = searchParams?.productcategoryid
    ? parseInt(searchParams.productcategoryid)
    : null;

  if (!productCategory) {
    error = "No product category specified.";
    return;
  }

  try {
    productSubCategories = await getProductSubCategories(productCategory);
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
          <ProductSubCategoryTable
            productCategoryId={productCategory}
            productSubCategories={productSubCategories}
          />
        )}
      </div>
    </CustomContainer>
  );
};

export default ProductSubCategory;
