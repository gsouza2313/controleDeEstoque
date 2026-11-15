import prismaClient from "../../prisma";
import { DetailSupplierRequest } from "../../models/interfaces/supplier/DetailSupplierRequest";

class DetailSupplierService {
    async execute({ supplier_id }: DetailSupplierRequest) {
        if (!supplier_id) {
            throw new Error("Invalid supplier id");
        }

        const supplier = await prismaClient.supplier.findUnique({
            where: {
                id: supplier_id,
            },
        });

        if (!supplier) {
            throw new Error("Supplier not found");
        }

        return supplier;
    }
}

export { DetailSupplierService };
