import express from `express`;

import{
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
}   from '../controllers/productController.js';

const router = express.Router();

//Rota para criar um produto.
router.post('/new', createProduct);

//Rota para ler todos os produtos.
router.get('/', getProducts);

//Rota para ler um produto especifico
router.get('/product/:id', getProduct);

//Rota para atualizar um produto
router.put('/update/:id', updateProduct);

//Rota para deletar um produto
router.delete('/delete/:id', deleteProduct);

export default router;