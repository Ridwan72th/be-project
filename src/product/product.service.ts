import { Injectable, Query } from '@nestjs/common';

@Injectable()
export class ProductService {
    private products: ProductDTO[] = [{ name: "Lay", id: 1, price: 20 },
    { name: "Testo", id: 2, price: 25 },]

    findAll(): ProductDTO[] {
        return this.products
    }
    findById(pId: number): ProductDTO {
        return this.products.find((val) => val.id === pId)
    }
    findByCondition(predicate: (product: ProductDTO) => boolean) {
        return this.products.filter((val) => predicate(val))
    }
}
