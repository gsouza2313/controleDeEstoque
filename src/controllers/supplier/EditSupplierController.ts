import { Request, Response } from "express";
import { EditSupplierService } from "../../services/supplier/EditSupplierService";
import { EditSupplierRequest } from "../../models/interfaces/supplier/EditSupplierRequest";

class EditSupplierController {
    async handle(request: Request, response: Response) {
        const supplier_id = request.params.id as string;
        const { name, email, phone, cnpj, address }: Omit<EditSupplierRequest, "supplier_id"> = request.body;
        const editSupplierService = new EditSupplierService();
        const supplierEdited = await editSupplierService.execute({
            supplier_id,
            name,
            email,
            phone,
            cnpj,
            address,
        });
        return response.json(supplierEdited);
    }
}

export { EditSupplierController };
