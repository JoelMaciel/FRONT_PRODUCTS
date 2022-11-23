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
  products: Product[] = [];

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

  findAllProducts() {
    this.productService.findAll().subscribe({
      next: (result) => {
        this.products = result;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

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
          this.findAllProducts();
          this.productForm.reset();
          alert('Product saved successfully');
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  delete(product: Product) {
    const confirmation = confirm(
      'Are you sure you want to delete this product'
    );
    if (confirmation) {
      const id = product.id ?? 0;
      this.productService.delete(id).subscribe({
        next: (result) => {
          alert('Product deleted successfully');
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
