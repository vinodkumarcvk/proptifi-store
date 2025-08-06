import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MaterialModule } from '@modules/material/material-module';
import { SweetAlert } from '@services/sweet-alert';

interface NavItem {
  name: string;
  route: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MaterialModule,RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  protected title = 'proptifi-store';
  public showSideNav:Boolean=true

  menuItems: NavItem[] = [];
  public router = inject(Router);
  public sweetAlertService = inject(SweetAlert);

  constructor() {}

  ngOnInit() {
    this.menuItems = [
       { name: 'Products', route: 'products' },
      { name: 'Categories', route: 'categories' }
    ];
  }



  toggleSidenav() {
    this.showSideNav = !this.showSideNav;
  }

logout() {
    this.sweetAlertService.confirm('You will be logged out of the session!').then((confirmed) => {
      if (confirmed) {
        console.log('User Logged Out');
        this.router.navigate(['/login']);
      }
    });
  }


}
