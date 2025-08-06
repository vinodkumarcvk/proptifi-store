import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '@modules/material/material-module';
import { Product } from '@services/product';

@Component({
  selector: 'app-product-detail',
  imports: [MaterialModule,CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
export class ProductDetail implements OnInit {
  public productID:any;
   public productData: any;
  public quantity = 1;
  public isLoading = true;
  public cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

   public activateRoute= inject(ActivatedRoute);
   public productService= inject(Product);

  ngOnInit(): void {
    this.productID = Number(this.activateRoute.snapshot.paramMap.get('id'));
    this.getProductDetails()
      
  }

async getProductDetails() {
  try {
    const product = await this.productService.fetchRecord(`products/${this.productID}`);

    setTimeout(() => {
      this.productData = product;
      this.isLoading = false;

      this.cdr.detectChanges();

    }, 500);

  } catch (error) {
    console.error('Failed to load product details', error);
    this.isLoading = false;
    this.cdr.detectChanges();  
  }
}


  increaseQty() {
  this.quantity++;
}

decreaseQty() {
  if (this.quantity > 1) {
    this.quantity--;
  }
}

buyNow() {
  ('Proceed to Buy Now');
}

addToCart() {
  console.log(`Added ${this.quantity} items to Cart`);
}


  navigateBack() {
    this.router.navigate(['/products']);
  }

}
