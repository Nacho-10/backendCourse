const filePath = './productos.json';
const productManager = new ProductManager(filePath);

productManager.getProductsFromFile();

const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.autoIncrementId = 1;
    this.products = [];
  }

  addProduct(product) {
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      console.log("Todos los campos son obligatorios.");
      return;
    }

    if (this.products.some(existingProduct => existingProduct.code === product.code)) {
      console.log("El código del producto ya existe. No se permiten códigos duplicados.");
      return;
    }

    const newProduct = {
      id: this.autoIncrementId++,
      ...product
    };

    this.products.push(newProduct);
    console.log(`Producto agregado: ${newProduct.title}`);
    this.saveProductsToFile();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const foundProduct = this.products.find(product => product.id === id);

    if (foundProduct) {
      return foundProduct;
    } else {
      console.log("Producto no encontrado.");
      return null;
    }
  }

  updateProduct(id, updatedFields) {
    const index = this.products.findIndex(product => product.id === id);

    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedFields };
      console.log(`Producto actualizado: ${this.products[index].title}`);
      this.saveProductsToFile();
      return this.products[index];
    }

    console.log("Producto no encontrado.");
    return null;
  }

  deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);

    if (index !== -1) {
      const deletedProduct = this.products.splice(index, 1)[0];
      console.log(`Producto eliminado: ${deletedProduct.title}`);
      this.saveProductsToFile();
      return deletedProduct;
    }

    console.log("Producto no encontrado.");
    return null;
  }

  generateId() {
    return this.autoIncrementId++;
  }

  getProductsFromFile() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.products = JSON.parse(data) || [];
      return this.products;
    } catch (error) {
      return [];
    }
  }
  

  saveProductsToFile() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
  }
}

module.exports = ProductManager;