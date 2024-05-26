import CustomContainer from '@/components/CustomContainer';
import ModelTable from '@/components/ModelTable';
import { getModel } from '@/lib/db/modelCrud';

interface paramsType {
   params: { id: string; seriesId: string };
}

async function ModelList({ params }: paramsType) {
   let models: any = [];
   let error = '';

   try {
      models = await getModel(parseInt(params.seriesId));
   } catch (err) {
      console.error('Error fetching models:', err);
      error = 'Check your internet connection.';
   }
   return (
      <CustomContainer>
         <div className='flex flex-col justify-center gap-8'>
            {error ? (
               <p className='text-red-500 text-center'>{error}</p>
            ) : (
               <ModelTable
                  seriesId={parseInt(params.seriesId)}
                  models={models}
                  brandId={parseInt(params.id)}
               />
            )}
         </div>
      </CustomContainer>
   );
}

export default ModelList;
