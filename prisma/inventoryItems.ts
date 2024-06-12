export const ItemsCategory = [
  {
    itemsCategoryId: 1,
    name: "Parts",
  },
  {
    itemsCategoryId: 2,
    name: "Equipments",
  },
  {
    itemsCategoryId: 3,
    name: "Accessories",
  },
  {
    itemsCategoryId: 4,
    name: "Devices",
  },
];

export const ItemsSubCategory = [
  // Parts Subcategories
  { itemsSubCategoryId: 1, name: "Screen", categoryId: 1 },
  { itemsSubCategoryId: 2, name: "Back Glass", categoryId: 1 },
  { itemsSubCategoryId: 3, name: "Battery", categoryId: 1 },
  { itemsSubCategoryId: 4, name: "Charging Port", categoryId: 1 },
  { itemsSubCategoryId: 5, name: "Back Camera", categoryId: 1 },
  { itemsSubCategoryId: 6, name: "Front Camera", categoryId: 1 },
  { itemsSubCategoryId: 7, name: "Back Camera Lens", categoryId: 1 },
  { itemsSubCategoryId: 8, name: "Loudspeaker", categoryId: 1 },
  { itemsSubCategoryId: 9, name: "Earpiece", categoryId: 1 },
  { itemsSubCategoryId: 10, name: "Proximity Sensor", categoryId: 1 },
  { itemsSubCategoryId: 11, name: "Taptic Engine", categoryId: 1 },

  // Equipments Subcategories
  { itemsSubCategoryId: 12, name: "Tools", categoryId: 2 },
  { itemsSubCategoryId: 13, name: "Supplies", categoryId: 2 },

  // Accessories Subcategories
  { itemsSubCategoryId: 14, name: "Cases", categoryId: 3 },
  { itemsSubCategoryId: 15, name: "Chargers", categoryId: 3 },
  { itemsSubCategoryId: 16, name: "Screen Protectors", categoryId: 3 },

  // Devices Subcategories
  { itemsSubCategoryId: 17, name: "Phone", categoryId: 4 },
  { itemsSubCategoryId: 18, name: "Tablet", categoryId: 4 },
  { itemsSubCategoryId: 19, name: "Laptop", categoryId: 4 },
  { itemsSubCategoryId: 20, name: "Watch", categoryId: 4 },
  { itemsSubCategoryId: 21, name: "Computer", categoryId: 4 },
];

export const Vendor = [
  { vendorId: 1, name: "TechParts Co." },
  { vendorId: 2, name: "ScreenGuard Inc." },
  { vendorId: 3, name: "Logitech Official" },
  { vendorId: 4, name: "Apple Store" },
];

export const Location = [
  {
    locationId: 1,
    name: "Warehouse A",
    description: "Main warehouse for storing inventory items.",
  },
  {
    locationId: 2,
    name: "Retail Store 1",
    description: "Retail store located in downtown.",
  },
  {
    locationId: 3,
    name: "Warehouse B",
    description: "Overflow warehouse for additional storage.",
  },
  {
    locationId: 4,
    name: "Retail Store 2",
    description: "Second retail store in the suburbs.",
  },
];

export const InventoryItem = [
  {
    inventoryItemId: 1,
    name: "iPhone 11 LCD Screen Replacement Aftermarket AM",
    description: "Replacement screen for iPhone 11",
    sku: "IPHONE-11-SCREEN-AFTERMARKET-AM",
    itemsCategoryId: 1, // Parts
    stock: 3,
    rawCost: 12.0,
    taxRate: 10.25,
    shippingCost: 10.0,
    vendorId: 1, // TechParts Co.
    itemsSubCategoryId: 1, // Screen
    locationId: 1, // Warehouse A
  },
  {
    inventoryItemId: 2,
    name: "Samsung Galaxy S20 Ultra Screen Protector",
    description: "Tempered glass screen protector for Samsung Galaxy S20 Ultra",
    sku: "SAMSUNG-S20ULTRA-SCREEN-PROTECTOR",
    itemsCategoryId: 3, // Accessories
    stock: 10,
    rawCost: 7.5,
    taxRate: 10.25,
    shippingCost: 10.0,
    vendorId: 2, // ScreenGuard Inc.
    itemsSubCategoryId: 16, // Screen Protectors
    locationId: 2, // Retail Store 1
  },
  {
    inventoryItemId: 3,
    name: "Logitech G502 HERO Gaming Mouse",
    description:
      "Wired gaming mouse with customizable RGB lighting and 11 programmable buttons",
    sku: "LOGITECH-G502-HERO",
    itemsCategoryId: 2, // Equipments
    stock: 5,
    rawCost: 40.0,
    taxRate: 10.25,
    shippingCost: 10.0,
    vendorId: 3, // Logitech Official
    itemsSubCategoryId: 12, // Tools
    locationId: 3, // Warehouse B
  },
  {
    inventoryItemId: 4,
    name: "Apple AirPods Pro",
    description: "Wireless Bluetooth earbuds with active noise cancellation",
    sku: "APPLE-AIRPODS-PRO",
    itemsCategoryId: 4, // Devices
    stock: 20,
    rawCost: 180.0,
    taxRate: 10.25,
    shippingCost: 10.0,
    vendorId: 4, // Apple Store
    itemsSubCategoryId: 20, // Watch
    locationId: 4, // Retail Store 2
  },
];

export const Variation = [
  {
    variationId: 1,
    sku: "IPHONE-11-SCREEN-AFTERMARKET-AM-RED",
    inventoryItemId: 1,
  },
  {
    variationId: 2,
    sku: "IPHONE-11-SCREEN-AFTERMARKET-AM-BLUE",
    inventoryItemId: 1,
  },
  {
    variationId: 3,
    sku: "SAMSUNG-S20ULTRA-SCREEN-PROTECTOR-GLASS",
    inventoryItemId: 2,
  },
  {
    variationId: 4,
    sku: "SAMSUNG-S20ULTRA-SCREEN-PROTECTOR-PLASTIC",
    inventoryItemId: 2,
  },
  { variationId: 5, sku: "LOGITECH-G502-HERO-WIRED", inventoryItemId: 3 },
  { variationId: 6, sku: "LOGITECH-G502-HERO-WIRELESS", inventoryItemId: 3 },
  { variationId: 7, sku: "APPLE-AIRPODS-PRO-WHITE", inventoryItemId: 4 },
];

export const ItemReturn = [
  {
    stockReturnId: 1,
    returningParty: "Customer",
    locationId: 2, // Retail Store 1 (Seattle)
    returnedAt: new Date("2024-05-27T10:00:00Z"),
    status: "Complete",
    reason: "Defective product",
    request: "Refund",
    result: "Success",
    inventoryItemId: 1, // iPhone 11 LCD Screen Replacement Aftermarket AM
  },
  {
    stockReturnId: 2,
    returningParty: "Store",
    locationId: 1, // Warehouse A
    returnedAt: new Date("2024-05-25T15:30:00Z"),
    status: "Complete",
    reason: "Customer return",
    request: "Credit",
    result: "Success",
    inventoryItemId: 3, // Logitech G502 HERO Gaming Mouse
  },
  {
    stockReturnId: 3,
    returningParty: "Customer",
    locationId: 2, // Retail Store 1 (Seattle)
    returnedAt: new Date("2024-05-26T12:45:00Z"),
    status: "Pending",
    reason: "Change of mind",
    request: "Refund",
    result: "Rejected",
    inventoryItemId: 4, // Apple AirPods Pro
  },
];

export const Comment = [
  {
    commentId: 1,
    stockReturnId: 1,
    text: "Screen was cracked on arrival.",
    createdAt: new Date("2024-05-27T10:05:00Z"),
  },
  {
    commentId: 2,
    stockReturnId: 1,
    text: "Customer requested a refund.",
    createdAt: new Date("2024-05-27T10:10:00Z"),
  },
  {
    commentId: 3,
    stockReturnId: 2,
    text: "Customer returned due to personal preference.",
    createdAt: new Date("2024-05-25T15:35:00Z"),
  },
  {
    commentId: 4,
    stockReturnId: 2,
    text: "Issued store credit.",
    createdAt: new Date("2024-05-25T15:40:00Z"),
  },
  {
    commentId: 5,
    stockReturnId: 3,
    text: "Customer decided they no longer wanted the item.",
    createdAt: new Date("2024-05-26T12:50:00Z"),
  },
  {
    commentId: 6,
    stockReturnId: 3,
    text: "Processing refund request.",
    createdAt: new Date("2024-05-26T12:55:00Z"),
  },
];

export const InternalTransfer = [
  {
    internalTransferId: 1,
    inventoryItemId: 1, // iPhone 11 LCD Screen Replacement Aftermarket AM
    quantity: 2,
    fromLocationId: 1, // Warehouse A
    toLocationId: 2, // Retail Store 1 (Seattle)
  },
  {
    internalTransferId: 2,
    inventoryItemId: 3, // Logitech G502 HERO Gaming Mouse
    quantity: 1,
    fromLocationId: 2, // Retail Store 1 (Seattle)
    toLocationId: 1, // Warehouse A
  },
  {
    internalTransferId: 3,
    inventoryItemId: 4, // Apple AirPods Pro
    quantity: 4,
    fromLocationId: 1, // Warehouse A
    toLocationId: 3, // Warehouse B
  },
];

export const Sale = [
  {
    saleId: 1,
    inventoryItemId: 1, // iPhone 11 LCD Screen Replacement Aftermarket AM
    quantity: 2,
    revenue: 50, // Assuming $25 per screen
    saleDate: new Date("2024-05-28T09:15:00Z"),
  },
  {
    saleId: 2,
    inventoryItemId: 3, // Logitech G502 HERO Gaming Mouse
    quantity: 1,
    revenue: 60, // Assuming $60 per mouse
    saleDate: new Date("2024-05-28T12:30:00Z"),
  },
  {
    saleId: 3,
    inventoryItemId: 4, // Apple AirPods Pro
    quantity: 2,
    revenue: 400, // Assuming $200 per AirPods Pro
    saleDate: new Date("2024-05-28T14:45:00Z"),
  },
];

export const InventoryAge = [
  {
    inventoryAgeId: 1,
    inventoryItemId: 1, // iPhone 11 LCD Screen Replacement Aftermarket AM
    arrivalDate: new Date("2024-04-15T00:00:00Z"), // Arrival date of the item in inventory
  },
  {
    inventoryAgeId: 2,
    inventoryItemId: 2, // Samsung Galaxy S20 Ultra Screen Protector
    arrivalDate: new Date("2024-04-20T00:00:00Z"), // Arrival date of the item in inventory
  },
  {
    inventoryAgeId: 3,
    inventoryItemId: 3, // Logitech G502 HERO Gaming Mouse
    arrivalDate: new Date("2024-04-25T00:00:00Z"), // Arrival date of the item in inventory
  },
  {
    inventoryAgeId: 4,
    inventoryItemId: 4, // Apple AirPods Pro
    arrivalDate: new Date("2024-05-01T00:00:00Z"), // Arrival date of the item in inventory
  },
];

export const LowStockAlert = [
  {
    lowStockAlertId: 1,
    inventoryItemId: 1, // iPhone 11 LCD Screen Replacement Aftermarket AM
    threshold: 5, // Low stock threshold for the item
  },
  {
    lowStockAlertId: 2,
    inventoryItemId: 2, // Samsung Galaxy S20 Ultra Screen Protector
    threshold: 3, // Low stock threshold for the item
  },
  {
    lowStockAlertId: 3,
    inventoryItemId: 3, // Logitech G502 HERO Gaming Mouse
    threshold: 2, // Low stock threshold for the item
  },
  {
    lowStockAlertId: 4,
    inventoryItemId: 4, // Apple AirPods Pro
    threshold: 10, // Low stock threshold for the item
  },
];
