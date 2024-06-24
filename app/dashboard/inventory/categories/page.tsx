import CategoryTable from '@/components/CategoryTable';
import { fetchCategories } from '@/lib/FetchCategories';

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
