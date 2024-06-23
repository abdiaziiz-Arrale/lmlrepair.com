import CategoryTable from '@/components/CategoryTable';
import { getCategoryWithSubCategory } from '@/lib/db/ItemCategoryCrud';

export async function fetchCategories() {
   try {
      const categories = await getCategoryWithSubCategory();
      return { categories, error: null };
   } catch (err) {
      return { categories: [], error: 'Check your internet connection.' };
   }
}

async function Categories() {
   const { categories, error } = await fetchCategories();

   return (
      <div className='flex flex-col gap-0'>
         {error ? (
            <p className='text-red-500 text-center mt-10'>{error}</p>
         ) : (
            <CategoryTable categories={categories} />
         )}
      </div>
   );
}

export default Categories;
