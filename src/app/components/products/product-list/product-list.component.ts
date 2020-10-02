import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
 
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList:Product[];

  constructor(private productService: ProductService, private toast:ToastrService) { }

  ngOnInit(): void {
    this.productService.getProducts()
    .snapshotChanges()
    .subscribe(items => {
      this.productList = [];
      items.forEach(element => {
        const elementJson = element.payload.toJSON();
        elementJson['$key'] = element.key;
        console.log(elementJson);        
        this.productList.push(elementJson as Product);        
      })
    });
  }

  onEdit(product: Product){
    this.productService.selectedProduct = Object.assign({}, product);
  }

  onDelete($key: string){
    if(confirm('Are you sure you want to delete it?')) {
      this.productService.deleteProduct($key);
      this.toast.warning('Deleted Successfully', 'Product Removed');
    }
  }

}
