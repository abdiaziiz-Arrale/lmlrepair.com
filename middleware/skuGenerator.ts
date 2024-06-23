//Todo: Function to generate SKU
export const generateSKU = (variationName: string) => {
   //Todo: Get initials from the variation name
   const initials = variationName
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('');

   //Todo: Generate a random 4-digit number
   const randomNum = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');

   //Todo: Combine initials and random number to form the SKU
   return `${initials}-${randomNum}`;
};
