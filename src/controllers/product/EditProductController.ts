import { Request, Response } from "express"
import { EditProductService } from "../../services/product/EditProductService";
import { EditProductRequest } from "../../models/interfaces/product/EditProductRequest";

class EditProductController {
    async handle(request: Request, response: Response){
        const { name, banner, amount, description, product_id, price }: EditProductRequest = request.body;
        const editproductService = new EditProductService();
        const productEdited = editproductService.execute({name, banner, amount, description, product_id, price});
        return response.json(productEdited);
    }
}
export { EditProductController }