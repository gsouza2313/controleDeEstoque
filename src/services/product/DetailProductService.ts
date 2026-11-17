import prismaClient from "../../prisma";

interface DetailProductRequest {
    product_id: string;
}

class DetailProductService {
    async execute({ product_id }: DetailProductRequest) {
        if (!product_id) {
            throw new Error("Invalid product id");
        }

        const product = await prismaClient.product.findUnique({
            where: {
                id: product_id,
            },
            include: {
                supplier: true,
            },
        });

        if (!product) {
            throw new Error("Product not found");
        }

        return product;
    }
}

export { DetailProductService };
