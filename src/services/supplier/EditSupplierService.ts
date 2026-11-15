import prismaClient from "../../prisma";
import { EditSupplierRequest } from "../../models/interfaces/supplier/EditSupplierRequest";

class EditSupplierService {
    async execute({ supplier_id, name, email, phone, cnpj, address }: EditSupplierRequest) {
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

        if (name !== undefined && name.trim() === "") {
            throw new Error("Invalid supplier name");
        }

        const supplierEdited = await prismaClient.supplier.update({
            where: {
                id: supplier_id,
            },
            data: {
                ...(name !== undefined ? { name: name.trim() } : {}),
                ...(email !== undefined ? { email } : {}),
                ...(phone !== undefined ? { phone } : {}),
                ...(cnpj !== undefined ? { cnpj } : {}),
                ...(address !== undefined ? { address } : {}),
                updated_at: new Date(),
            },
        });

        return supplierEdited;
    }
}

export { EditSupplierService };
