import EditCategories from '@/components/EditCategoryComponent';
import { getCategory, getSubCategory } from '@/lib/db/ItemCategoryCrud';

//Todo: Fetch categories from the database
export async function fetchCategories() {
   try {
      const categories = await getCategory();
      return { categories, error: null };
   } catch (err) {
      return { categories: [], error: 'Check your internet connection.' };
   }
}

//Todo: Fetch subcategories from the database
export async function fetchSubCategories() {
   try {
      const subCategories = await getSubCategory();
      return { subCategories, error: null };
   } catch (err) {
      return { subCategories: [], error: 'Check your internet connection.' };
   }
}

async function EditCategoryPage() {
   const { categories, error } = await fetchCategories();
   const { subCategories, error: subError } = await fetchSubCategories();

   return (
      <>
         {error || subError ? (
            <p className='text-red-500 text-center mt-10'>
               {error || subError}
            </p>
         ) : (
            <EditCategories
               categories={categories}
               itemSubCategories={subCategories}
            />
         )}
      </>
   );
}

export default EditCategoryPage;
