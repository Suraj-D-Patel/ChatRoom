import { ProductsService } from "./../../services/products/products.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { FileUploadService } from "src/app/services/shared/file-upload.service";
import { environment } from "../../../environments/environment.prod";
import swal from 'sweetalert2';

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  ProductsForm: FormGroup;
  images = [];
  SET_filename: string;
  primary_image: string;
  errorMessage: string;
  serverPath = environment.serverPath;
  getIMAGEPath = environment.getIMAGE_URL;
  isUploaded: boolean = false;
  showADDbutton: boolean = false;
  jsonArray = [];

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private fileuploadService: FileUploadService
  ) {
    this.ProductsForm = this.formBuilder.group({
      product_title: [
        null,
        Validators.compose([Validators.minLength(3), Validators.required])
      ],
      product_desc: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(200)
        ])
      ],
      product_price: [null, Validators.compose([Validators.required])]
    });
  }
  ngOnInit() {
    // this.getImageData('file-1541148928798.png');
  }

  validAddbutton() {
    //todo isUploaded
    this.isUploaded = true;

    const product_title = this.ProductsForm.controls.product_title.valid;
    const product_desc = this.ProductsForm.controls.product_desc.valid;
    const product_price = this.ProductsForm.controls.product_price.valid;

    if (product_title && product_desc && this.isUploaded && product_price) {
      this.showADDbutton = true;
    } else {
      this.showADDbutton = false;
    }
  }

  add_products() {
    console.log("addproduct ", this.images);
    //////////all images into array//////////////////////
    for (let i = 0; i < this.images.length; i++) {
      const abc = this.images[i].filename;
      this.jsonArray.push(abc);
    }
    const info_to_send = {
      title: this.ProductsForm.controls.product_title.value,
      desc: this.ProductsForm.controls.product_desc.value,
      price: this.ProductsForm.controls.product_price.value,
      images: this.jsonArray
    };
    console.log("info_to_send = ", info_to_send);
    this.productsService.ADDPRoducts(info_to_send).subscribe(data => {
      console.log("data = ", data);
      if(data.status == 200) {
        swal({ title: 'Success!', text: 'Product Added Successfully!', type: 'success', confirmButtonText: 'ok', allowOutsideClick: false })
        .then(result => {
          this.clearTHEfields_afterADDING();
        });
      } else if(data.status == 400) {
        swal({ title: 'Error!', text: 'An Error Occured!!, Cannot Save the Product', type: 'warning', confirmButtonText: 'ok', allowOutsideClick: false })
      }
    });
  }

  clearTHEfields_afterADDING() {
    this.ProductsForm.controls.product_title.setValue(null);
    this.ProductsForm.controls.product_title.clearValidators();
    this.ProductsForm.controls.product_title.updateValueAndValidity();

    this.ProductsForm.controls.product_desc.clearValidators();
    this.ProductsForm.controls.product_desc.setValue(null);
    this.ProductsForm.controls.product_desc.updateValueAndValidity();

    this.ProductsForm.controls.product_price.clearValidators();
    this.ProductsForm.controls.product_price.setValue(null);
    this.ProductsForm.controls.product_price.updateValueAndValidity();

    this.jsonArray = [];
  }

  getImageData(image) {
    this.fileuploadService.getImages(image).subscribe(
      data => {
        console.log("data = " , data)
        this.images = data.result;
      },
      error => {
        console.log("error = ", error);
        this.errorMessage = error
      }
    );
  }

  // file_NAME(get_file_name) {
  //   this.SET_filename = get_file_name.filename;
  // }

  refreshImages(status) {
    this.validAddbutton();
    console.log("Status::: ", status);
    if (status.upload_status == true) {
      this.images = status.document_array.data;
      this.primary_image = this.images[0].filename
      // console.log("file_NAME = " , this.file_NAME);
      this.getImageData(this.primary_image);
    } else {
      // console.log("Uploaded Error!");
    }
  }
}
