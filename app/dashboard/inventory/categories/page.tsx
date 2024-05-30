import CategoryHeader from '@/components/CategoryHeader';
import CategoryTable from '@/components/CategoryTable';

function Inventory() {
   return (
      <div className='flex flex-col gap-0'>
         <CategoryHeader />
         <CategoryTable />
      </div>
   );
}

export default Inventory;
