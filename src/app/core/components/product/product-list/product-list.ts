import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '@modules/material/material-module';
import { Product } from '@services/product';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-product-list',
  imports: [MaterialModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList implements OnInit {



  displayedColumns = ['id', 'title', 'price', 'category'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public appURL = environment.appUrl;
  public productTableName: any

  private productService = inject(Product);
  private router = inject(Router);
  private route = inject(ActivatedRoute);


  constructor() { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const categoryName = params.get('name');
      if (categoryName) {
        this.loadProductsByCategory(decodeURIComponent(categoryName));
        this.productTableName = categoryName
      } else {
        this.getAllProducts();
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async getAllProducts() {
    try {
      const url = `${'products'}`;
      const products = await this.productService.fetchRecord(url);
      this.dataSource.data = products;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    } catch (error) {
      console.error('Error fetching products', error);
    }
  }

  async loadProductsByCategory(categoryName: any) {
    try {
      const products = await this.productService.fetchRecord(`products/category/${categoryName}`);

      this.dataSource.data = products;
      // Assign paginator & sort again to ensure attachment after data set
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } catch (error) {
      console.error('Error fetching products', error);

    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewProductDetails(productId: number) {
    this.router.navigate(['/products', productId]);
  }

}

// export interface ProductData {
//   id: number;
//   title: string;
//   price: number;
//   category: string;
// }