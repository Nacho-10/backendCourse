class ProductManager {
    constructor() {
        this.products = [];
        this.autoIncrementId = 1;
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
}


const productManager = new ProductManager();

productManager.addProduct({
    title: "Remera",
    description: "Remera estampada overSize",
    price: 100,
    thumbnail: "./imagenes/descarga1.jpg",
    code: "P001",
    stock: 50
});

productManager.addProduct({
    title: "Bermuda",
    description: "Bermuda floreada",
    price: 200,
    thumbnail: "./imagenes/descarga2.jpg",
    code: "P002",
    stock: 30
});

console.log("Lista de Productos:", productManager.getProducts());

const productIdToFind = 2;
const foundProduct = productManager.getProductById(productIdToFind);

if (foundProduct) {
    console.log(`Producto encontrado: ${foundProduct.title}`);
}
