// skuGenerator.ts

export const generateSKU = (variationName: string): string => {
   // Replace spaces with hyphens and convert to uppercase
   const formattedName = variationName.replace(/\s+/g, '-').toUpperCase();

   // Generate a random number to ensure uniqueness
   const randomNumber = Math.floor(Math.random() * 10000);

   // Concatenate formatted name and random number to form the SKU
   const sku = `${formattedName}-${randomNumber}`;

   return sku;
};
