import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController"
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { RemoveUserController } from "./controllers/user/RemoveUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { EditCategoryController } from "./controllers/category/EditCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { RemoveCategoryController } from "./controllers/category/RemoveCategoryController";
import multer from "multer";
import uploadConfig from "./config/multer";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { DetailProductController } from "./controllers/product/DetailProductController";
import { EditProductController } from "./controllers/product/EditProductController";
import { ListProductByCategoryController } from "./controllers/product/ListProductByCategoryController";
import { RemoveProductController } from "./controllers/product/RemoveProductController";
import { CreateSupplierController } from "./controllers/supplier/CreateSupplierController";
import { DetailSupplierController } from "./controllers/supplier/DetailSupplierController";
import { EditSupplierController } from "./controllers/supplier/EditSupplierController";
import { ListSupplierController } from "./controllers/supplier/ListSupplierController";
import { RemoveSupplierController } from "./controllers/supplier/RemoveSupplierController";
import { SaleProductController } from "./controllers/sale/SaleProductController";



const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));
router.get("/", (request: Request, response: Response) => {
    return response.json({ ok: true });
});

router.get("/test", (request: Request, response: Response) => {
    return response.json({ ok: true });
});
//User Routes
router.post('/user', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);
router.delete('/user/remove', new RemoveUserController().handle);

//Category Routes
router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.patch('/category/edit', isAuthenticated, new EditCategoryController().handle);
router.get('/category/all', isAuthenticated, new ListCategoryController().handle);
router.delete('/category/remove', isAuthenticated, new RemoveCategoryController().handle);

//Product Routes
router.post('/product', isAuthenticated, upload.single("file") as any, new CreateProductController().handle);
router.post('/products', isAuthenticated, upload.single("file") as any, new CreateProductController().handle);
router.patch('/product/edit', isAuthenticated, upload.single("file") as any, new EditProductController().handle);
router.get('/product', isAuthenticated, new ListProductByCategoryController().handle);
router.get('/products/:id', isAuthenticated, new DetailProductController().handle);
router.delete('/product/remove', isAuthenticated, new RemoveProductController().handle);

//Supplier Routes
router.post('/suppliers', isAuthenticated, new CreateSupplierController().handle);
router.get('/suppliers', isAuthenticated, new ListSupplierController().handle);
router.get('/suppliers/:id', isAuthenticated, new DetailSupplierController().handle);
router.patch('/suppliers/:id', isAuthenticated, new EditSupplierController().handle);
router.delete('/suppliers/:id', isAuthenticated, new RemoveSupplierController().handle);

//Sale Routes
router.patch('/sale/product', isAuthenticated, new SaleProductController().handle);

export { router };