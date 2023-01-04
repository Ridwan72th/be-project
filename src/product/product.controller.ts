import { Controller, Get, Param, Query } from '@nestjs/common';
import { pid } from 'process';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }
    @Get()
    getProductAll(@Query("name") productName?: string): ProductDTO[] {
        if (productName) {
            return this.productService.findByCondition(product => product.name.includes(productName))
        }
        return this.productService.findAll()
    }

    @Get(':pId')
    getProductById(@Param('pId') pId: string): ProductDTO {
        return this, this.productService.findById(Number(pId))
    }
}
