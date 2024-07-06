import { ItemReturn } from '@prisma/client';

export type PartialBy<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type Vendor = {
   vendorId: number;
   name: string;
};

export type Variations = {
   variationId: number;
   name: string;
   price: number;
   quantity: number;
   image: string | null;
   sku: string;
};
export type InventoryItem = {
   name: string;
   brand: string;
   description: string;
   image: string;
   vendor: Vendor;
   variations: Variations[];
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
   Comment: Comment[];
};
export type Announcement = {
  content  :      String
  tag       :     String
  Active     :    Boolean  
  createdAt    :  Date
};
export type Post = {
  id      :        number      
  title    :       String
  content     :    String
  authorId    :    number
  blogCategoryId:  number
  tag        :     String
  published  :     Boolean 
  createdAt     :  Date  
  updatedAt  :     Date
  metaTitle?    :   String
  metaDescription? :String
  publishedAt?    : Date

};

