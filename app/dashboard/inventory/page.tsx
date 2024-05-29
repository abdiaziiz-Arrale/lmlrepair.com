import InventoryHeader from '@/components/InventoryHeader';
import InventoryOverviewBody from '@/components/InventoryOverviewBody';

function Inventory() {
   return (
      <div className='flex flex-col gap-10'>
         <InventoryHeader />
         <InventoryOverviewBody />
      </div>
   );
}

export default Inventory;
