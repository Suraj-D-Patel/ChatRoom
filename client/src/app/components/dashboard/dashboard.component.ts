import { ProductsComponent } from './../products/products.component';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  PRODUCTS_Array: Array<Products> = [];
  showProducts:boolean = true;
  showDetails:boolean = false;
  product_title: string;
  // product_desc: string;
  // product_price: number;

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.productService.getALLPRODUCTS().subscribe(data_get => {
      console.log("data_get.result[i].photo[0] = ",typeof(data_get.result[0].photo[0]));
      console.log("data_get.result[i].photo[0] = ",data_get.result[0].photo[0]);
      console.log("products are =" , data_get);
      if(data_get.status == 200) {

        for (var i = 0; i <= data_get.result.length; i++) {
          const Products_details = new Products(
            data_get.result[i].photo[0],
            data_get.result[i]._id,
            data_get.result[i].title,
            data_get.result[i].content,
            data_get.result[i].price,
            data_get.result[i].product_added_date
          );
          this.PRODUCTS_Array.push(Products_details);
        }
        console.log("PRODUCTS_Array = ", this.PRODUCTS_Array)
      }else {
      }
    });
  }

  Buy_Product(id) {
console.log("buy product = " , id)
  }

  viewDetails(id) {
    this.showDetails = true;
    this.showProducts = false;
    console.log("id = " , id);
    this.productService.getProductbyProductID(id).subscribe(data => {
      console.log("product = ",data);
      this.product_title = data.result[0].title;
      this.PRODUCTS_Array = data.result;
    });
  }
}

export class Products {
  constructor(
    public image: string,
    public _id: string,
    public title: string,
    public content: string,
    public price: number,
    public product_added_date: any
  ) {}
}
