import { Request, Response } from "express";
import { DetailSupplierService } from "../../services/supplier/DetailSupplierService";

class DetailSupplierController {
    async handle(request: Request, response: Response) {
        const supplier_id = request.params.id as string;
        const detailSupplierService = new DetailSupplierService();
        const supplier = await detailSupplierService.execute({ supplier_id });
        return response.json(supplier);
    }
}

export { DetailSupplierController };
