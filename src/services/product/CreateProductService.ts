import prismaClient from "../../prisma";
import { ProductRequest } from "../../models/interfaces/product/ProductRequest";

class CreateProductService {
    async execute({name, price, description, banner, category_id, amount, supplierId}: ProductRequest){
        if (supplierId) {
            const supplierExists = await prismaClient.supplier.findUnique({
                where: {
                    id: supplierId,
                },
            });

            if (!supplierExists) {
                throw new Error("Supplier not found");
            }
        }

        const product = await prismaClient.product.create({
            data: {
                name: name,
                price: price,
                description: description,
                banner: banner,
                category_id: category_id,
                amount: +amount,
                ...(supplierId ? { supplierId } : {}),
            },
        });
        return product;
     }
}

export { CreateProductService }