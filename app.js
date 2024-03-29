const express = require('express');
const ProductManager = require('./productManager');

const app = express();
const port = 8080;

const productManager = new ProductManager('productos.json');

app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit;
    let productsToSend = await productManager.getAllProducts();

    if (limit) {
      const parsedLimit = parseInt(limit, 10);
      productsToSend = productsToSend.slice(0, parsedLimit);
    }

    res.json({ products: productsToSend });
  } catch (error) {
    console.error('Error al recuperar productos:', error);
    res.status(500).json({ error: 'Error Interno del Servidor' });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productManager.getProductById(productId);

    if (product) {
      res.json({ product });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al recuperar el producto:', error);
    res.status(500).json({ error: 'Error Interno del Servidor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en: http://localhost:${port}`);
});
