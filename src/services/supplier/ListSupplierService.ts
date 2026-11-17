import prismaClient from "../../prisma";

class ListSupplierService {
    async execute() {
        const suppliers = await prismaClient.supplier.findMany({
            orderBy: {
                created_at: "desc",
            },
        });
        return suppliers;
    }
}

export { ListSupplierService };
