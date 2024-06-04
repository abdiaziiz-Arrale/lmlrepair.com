import EditItem from '@/components/EditItem';
import { getCategory, getSubCategory } from '@/lib/db/ItemCategoryCrud';
import { getLocations } from '@/lib/db/ItemLocationCrud';

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

//Todo: Fetch locations from the database
export async function fetchLocations() {
   try {
      const locations = await getLocations();
      return { locations, error: null };
   } catch (err) {
      return { locations: [], error: 'Check your internet connection.' };
   }
}

export default async function EditItemPage() {
   //Todo: Fetch categories, subcategories and locations
   const { categories, error } = await fetchCategories();
   const { subCategories, error: subError } = await fetchSubCategories();
   const { locations, error: locationError } = await fetchLocations();

   return (
      <>
         {error || subError || locationError ? (
            <p className='text-red-500 text-center mt-10'>
               {error || subError || locationError}
            </p>
         ) : (
            <EditItem
               categories={categories}
               subCategories={subCategories}
               locations={locations}
            />
         )}
      </>
   );
}
