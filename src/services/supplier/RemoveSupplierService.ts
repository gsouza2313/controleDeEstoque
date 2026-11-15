import prismaClient from "../../prisma";
import { RemoveSupplierRequest } from "../../models/interfaces/supplier/RemoveSupplierRequest";

class RemoveSupplierService {
    async execute({ supplier_id }: RemoveSupplierRequest) {
        if (!supplier_id) {
            throw new Error("Invalid supplier id");
        }

        const existingSupplier = await prismaClient.supplier.findUnique({
            where: {
                id: supplier_id,
            },
        });

        if (!existingSupplier) {
            throw new Error("Supplier not found");
        }

        const supplier = await prismaClient.supplier.delete({
            where: {
                id: supplier_id,
            },
        });

        return supplier;
    }
}

export { RemoveSupplierService };
