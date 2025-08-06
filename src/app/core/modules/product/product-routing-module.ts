import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetail } from '@components/product/product-detail/product-detail';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@components/product/product-list/product-list').then(m => m.ProductList)
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('@components/product/category-list/category-list').then(m => m.CategoryList)
  },
  {
    path: 'category/:name',
    loadComponent: () =>
      import('@components/product/product-list/product-list').then(m => m.ProductList)
  },
  {
    path: ':id',
    loadComponent: () =>
      import('@components/product/product-detail/product-detail').then(m => m.ProductDetail)
  }
];

