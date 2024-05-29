import InventoryItemsHeader from '@/components/InventoryItemsHeader';
import ItemsTable from '@/components/ItemsTable';
import React from 'react';

function Items() {
   return (
      <div>
         <InventoryItemsHeader />
         <ItemsTable />
      </div>
   );
}

export default Items;
