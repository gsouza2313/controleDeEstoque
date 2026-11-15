import { Request, Response } from "express";
import { SupplierRequest } from "../../models/interfaces/supplier/SupplierRequest";
import { CreateSupplierService } from "../../services/supplier/CreateSupplierService";

class CreateSupplierController {
    async handle(request: Request, response: Response) {
        const { name, email, phone, cnpj, address }: SupplierRequest = request.body;
        const createSupplierService = new CreateSupplierService();
        const supplier = await createSupplierService.execute({ name, email, phone, cnpj, address });
        return response.status(201).json(supplier);
    }
}

export { CreateSupplierController };
