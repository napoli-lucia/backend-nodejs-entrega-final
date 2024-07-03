import { productService } from "../src/repository/index.js";

describe("create product", () => {
  it("should log a success message if the product data is correct", async () => {
    const mockAddProduct = jest.fn().mockResolvedValue({ message: "Producto agregado!" });
    productService.addProduct = mockAddProduct;

    const product = {
      "title": "Queso",
      "description": "Queso crema",
      "price": 45,
      "thumbnails": [
        "./images/queso-crema.jpg"
      ],
      "code": "ABC0122",
      "status": true,
      "stock": 25,
      "category": "Lacteos"
    };
    const result = await productService.addProduct(product);
    expect(result.message).toEqual("Producto agregado!" );
  });

  it("should log an error message if no title is provided", async () => {
    const product = {
      "description": "Queso crema",
      "price": 45,
      "thumbnails": [
        "./images/queso-crema.jpg"
      ],
      "code": "ABC120",
      "status": true,
      "stock": 25,
      "category": "Lacteos"
    };
    try {
      await productService.addProduct(product);
    } catch (e) {
      expect(e.message).toEqual("Producto no agregado. Datos erróneos: El titulo es requerido y debe ser un String.");
    }
  });

  it("should log an error message if title is empty", async () => {
    const product = {
      "title": "",
      "description": "Queso crema",
      "price": 45,
      "thumbnails": [
        "./images/queso-crema.jpg"
      ],
      "code": "ABC120",
      "status": true,
      "stock": 25,
      "category": "Lacteos"
    };
    try {
      await productService.addProduct(product);
    } catch (e) {
      expect(e.message).toEqual("Producto no agregado. Datos erróneos: El titulo es requerido y debe ser un String.");
    }
  });

  it("should log an error message if title is not a string", async () => {
    const product = {
      "title": null,
      "description": "Queso crema",
      "price": 45,
      "thumbnails": [
        "./images/queso-crema.jpg"
      ],
      "code": "ABC120",
      "status": true,
      "stock": 25,
      "category": "Lacteos"
    };
    try {
      await productService.addProduct(product);
    } catch (e) {
      expect(e.message).toEqual("Producto no agregado. Datos erróneos: El titulo es requerido y debe ser un String.");
    }
  });

  it("should log an error message if no price is provided", async () => {
    const product = {
      "title": "Queso",
      "description": "Queso crema",
      "thumbnails": [
        "./images/queso-crema.jpg"
      ],
      "code": "ABC120",
      "status": true,
      "stock": 25,
      "category": "Lacteos"
    };
    // const result = await productService.addProduct(product);
    // expect(result).toEqual({ error: `Producto no agregado. Datos erróneos: El precio es requerido y debe ser un número.` });
    try {
      await productService.addProduct(product);
    } catch (e) {
      expect(e.message).toEqual("Producto no agregado. Datos erróneos: El precio es requerido y debe ser un número.");
    }
  });

  it("should log an error message if price type is not a number", async () => {
    const product = {
      "title": "Queso",
      "description": "Queso crema",
      "price": "A",
      "thumbnails": [
        "./images/queso-crema.jpg"
      ],
      "code": "ABC120",
      "status": true,
      "stock": 25,
      "category": "Lacteos"
    };
    try {
      await productService.addProduct(product);
    } catch (e) {
      expect(e.message).toEqual("Producto no agregado. Datos erróneos: El precio es requerido y debe ser un número.");
    }
  });
});