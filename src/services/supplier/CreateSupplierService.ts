import prismaClient from "../../prisma";
import { SupplierRequest } from "../../models/interfaces/supplier/SupplierRequest";

class CreateSupplierService {
    async execute({ name, email, phone, cnpj, address }: SupplierRequest) {
        if (!name || name.trim() === "") {
            throw new Error("Invalid supplier name");
        }

        const supplier = await prismaClient.supplier.create({
            data: {
                name: name.trim(),
                email: email ?? null,
                phone: phone ?? null,
                cnpj: cnpj ?? null,
                address: address ?? null,
            },
        });

        return supplier;
    }
}

export { CreateSupplierService };
