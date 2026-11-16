import { Request, Response } from "express";
import { RemoveSupplierService } from "../../services/supplier/RemoveSupplierService";

class RemoveSupplierController {
    async handle(request: Request, response: Response) {
        const supplier_id = request.params.id as string;
        const removeSupplierService = new RemoveSupplierService();
        await removeSupplierService.execute({ supplier_id });
        return response.json({ message: "Supplier deleted successfully!" });
    }
}

export { RemoveSupplierController };
