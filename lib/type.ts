import { ItemReturn } from '@prisma/client';

export type PartialBy<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type Vendor = {
   vendorId: number;
   name: string;
};

export type InventoryItem = {
   name: string;
   rawCost: number;
   taxRate: number;
   shippingCost: number;
   stock: number;
   vendor: Vendor;
};

export type Location = {
   locationId: number;
   name: string;
   description: string;
};

export type Comment = {
   commentId: number;
   stockReturnId: number;
   text: string;
   createdAt: Date;
};

export type ItemReturnExtended = ItemReturn & {
   inventoryItem: InventoryItem;
   location: Location;
   comments: Comment[];
};
