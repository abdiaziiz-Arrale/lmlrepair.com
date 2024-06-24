import { getCategoryWithSubCategory } from '@/lib/db/ItemCategoryCrud';

// Define the category type
export interface Category {
   itemsCategoryId: number;
   name: string;
   image: string;
}

// Define the response type for fetchCategories
export interface FetchCategoriesResponse {
   categories: Category[];
   error: string | null;
}

export async function fetchCategories(): Promise<FetchCategoriesResponse> {
   try {
      const categories = await getCategoryWithSubCategory();
      return { categories, error: null };
   } catch (err) {
      return { categories: [], error: 'Check your internet connection.' };
   }
}
