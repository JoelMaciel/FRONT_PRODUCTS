import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from './model/product';
import { ProductService } from './service/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  productForm = this.fb.group({
    id: [],
    name: [null, Validators.required],
    price: [null, Validators.required],
    description: [],
  });

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  createProduct(): Product {
    return {
      id: this.productForm.get('id')?.value,
      name: this.productForm.get('name')?.value,
      price: this.productForm.get('price')?.value,
      description: this.productForm.get('description')?.value,
    };
  }

  save() {
    if (this.productForm.valid) {
      const product = this.createProduct();
      console.log('product', product);

      this.productService.save(product).subscribe({
        next: (res) => {
          alert('Product saved successfully');
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
