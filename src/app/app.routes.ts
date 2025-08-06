import { Routes } from '@angular/router';

export const routes: Routes = [
  // Redirect root to /products
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },

  // /products → ProductListComponent
  {
    path: 'products',
    loadComponent: () =>
      import('@components/product/product-list/product-list').then(m => m.ProductList)
  },

  // /products/:id → ProductDetailComponent
  {
    path: 'products/:id',
    loadComponent: () =>
      import('@components/product/product-detail/product-detail').then(m => m.ProductDetail)
  },

  // /categories → CategoryListComponent
  {
    path: 'categories',
    loadComponent: () =>
      import('@components/product/category-list/category-list').then(m => m.CategoryList)
  },

  // /categories/:name → ProductListComponent (Filtered by category)
  {
    path: 'categories/:name',
    loadComponent: () =>
      import('@components/product/product-list/product-list').then(m => m.ProductList)
  },

  // Wildcard route (optional)
  {
    path: '**',
    redirectTo: 'products'
  }
];
