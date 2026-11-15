import prismaClient from "../../prisma";
import { EditProductRequest } from "../../models/interfaces/product/EditProductRequest";

class EditProductService {
    async execute({name, amount, banner, description, product_id, price}: EditProductRequest) {
        const productEdited = await prismaClient.product.update({
            where: {
                id: product_id
            },
            data: {
                name: name,
                amount: +amount,
                description: description,
                banner: banner,
                price: price
            }
        });
        return productEdited;
    }
}

export { EditProductService}