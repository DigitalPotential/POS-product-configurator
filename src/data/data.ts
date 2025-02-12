import { ProductWithModifications, AddonGroupType } from "../types";

export const productWithModifications: ProductWithModifications = {
  id: "a_very_unique_soda_id",
  name: "Soda",
  price: 75,
  modifications: {
    sizes: [
      { name: "Normal", addonPrice: 0 },
      { name: "Extra large", addonPrice: 15 },
    ],
    flavours: [
      { name: "Coca Cola", addonPrice: 0 },
      { name: "Fanta", addonPrice: 0 },
      { name: "Sprite", addonPrice: 0 },
    ],
  },
};

export const addonGroups: AddonGroupType[] = [
  {
    name: "Extra toppings",
    limit: 2,
    sortOrder: 1,
    refProductIds: ["a_very_unique_soda_id"],
    addons: [
      {
        addon: { name: "Whipped cream", price: 15 },
        limit: 1,
        sortOrder: 2,
      },
      {
        addon: { name: "Vanilla icecream", price: 5 },
        limit: 1,
        sortOrder: 0,
      },
      {
        addon: { name: "Marshmallow", price: 10 },
        limit: 1,
        sortOrder: 1,
      },
    ],
  },
  {
    name: "To remove",
    limit: 1,
    sortOrder: 0,
    refProductIds: ["a_very_unique_soda_id"],
    addons: [
      {
        addon: { name: "Bubbles", price: 0 },
        limit: 1,
        sortOrder: 0,
      },
      {
        addon: { name: "Sugar", price: 0 },
        limit: 1,
        sortOrder: 0,
      },
    ],
  },
];

// import { ProductWithModifications, AddonGroupType } from "../types";

// export const productWithModifications: ProductWithModifications = {
//   id: "a_very_unique_soda_id",
//   name: "Soda",
//   price: 75,
//   modifications: {
//     sizes: [
//       { name: "Small", addonPrice: -10 },
//       { name: "Normal", addonPrice: 0 },
//       { name: "Large", addonPrice: 10 },
//       { name: "Extra large", addonPrice: 15 },
//       { name: "Mega", addonPrice: 25 },
//     ],
//     flavours: [
//       { name: "Coca Cola", addonPrice: 0 },
//       { name: "Pepsi", addonPrice: 0 },
//       { name: "Fanta", addonPrice: 0 },
//       { name: "Sprite", addonPrice: 0 },
//       { name: "Dr Pepper", addonPrice: 5 },
//       { name: "Mountain Dew", addonPrice: 5 },
//       { name: "Root Beer", addonPrice: 5 },
//       { name: "Ginger Ale", addonPrice: 5 },
//     ],
//   },
// };

// export const addonGroups: AddonGroupType[] = [
//   {
//     name: "Extra toppings",
//     limit: 2,
//     sortOrder: 1,
//     refProductIds: ["a_very_unique_soda_id"],
//     addons: [
//       {
//         addon: { name: "Whipped cream", price: 15 },
//         limit: 2,
//         sortOrder: 2,
//       },
//       {
//         addon: { name: "Vanilla ice cream", price: 5 },
//         limit: 1,
//         sortOrder: 0,
//       },
//       {
//         addon: { name: "Chocolate ice cream", price: 5 },
//         limit: 1,
//         sortOrder: 1,
//       },
//       {
//         addon: { name: "Marshmallow", price: 10 },
//         limit: 2,
//         sortOrder: 3,
//       },
//       {
//         addon: { name: "Cherry", price: 5 },
//         limit: 3,
//         sortOrder: 4,
//       },
//       {
//         addon: { name: "Caramel syrup", price: 8 },
//         limit: 1,
//         sortOrder: 5,
//       },
//     ],
//   },
//   {
//     name: "To remove",
//     limit: 1,
//     sortOrder: 0,
//     refProductIds: ["a_very_unique_soda_id"],
//     addons: [
//       {
//         addon: { name: "Bubbles", price: 0 },
//         limit: 1,
//         sortOrder: 0,
//       },
//       {
//         addon: { name: "Sugar", price: 0 },
//         limit: 1,
//         sortOrder: 1,
//       },
//       {
//         addon: { name: "Ice", price: 0 },
//         limit: 1,
//         sortOrder: 2,
//       },
//     ],
//   },
// ];