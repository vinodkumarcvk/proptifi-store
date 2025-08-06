import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MaterialModule } from '@modules/material/material-module';
import { Product } from '@services/product';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-category-list',
  imports: [MaterialModule ],
  templateUrl: './category-list.html',
  styleUrl: './category-list.scss'
})
export class CategoryList {

  
  displayedColumns = ['id', 'category'];
  dataSource: MatTableDataSource<CategoryData> = new MatTableDataSource<CategoryData>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public appURL = environment.appUrl;

  private productService = inject(Product);
  private router = inject(Router);

  constructor() {}

  ngOnInit() {
    this.getAllCategories();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async getAllCategories() {
    try {
      const categories: string[] = await this.productService.fetchRecord('products/categories');
      const formattedData: CategoryData[] = categories.map((cat, index) => ({
        id: index + 1,
        category: cat
      }));
      this.dataSource.data = formattedData;
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

viewCategoryProducts(category: string) {
  const encodedCategory = encodeURIComponent(category);
  console.log('Navigating to category:', encodedCategory);
  this.router.navigate(['/categories', encodedCategory]);
}

}

export interface CategoryData {
  id: number;
  category: string;
}