const fs = require('fs').promises;

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading products:', error);
      return [];
    }
  }

  async getAllProducts() {
    const products = await this.loadProducts();
    return products;
  }

  async getProductById(id) {
    const products = await this.loadProducts();
    return products.find(product => product.id === id);
  }
}

module.exports = ProductManager;
