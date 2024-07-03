import { faker } from "@faker-js/faker";

// faker.locale = "en";
faker.locale = "es";

export const generateProduct = () => {

  //Urls de fotos
  let numImgs = parseInt(faker.random.numeric(1));
  let productsImgs = [];
  for (let index = 0; index < numImgs; index++) {
    productsImgs.push(faker.image.image());
  }

  return {
    title: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price()),
    thumbnails: productsImgs,
    code: faker.datatype.uuid(),
    status: faker.datatype.boolean(),
    stock: Number(faker.random.numeric(1)),
    category: faker.commerce.department(),
  };
};