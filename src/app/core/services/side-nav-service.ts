import { Injectable } from '@angular/core';


interface NavItem {
  label: string;
  path: string;
  icon: string;
}

@Injectable({ providedIn: 'root' })
export class SideNavService {
  private  = {
    student: [
      { label: 'product', path: '/student-dashboard', icon: 'pi pi-home' },
      { label: 'caetegory', path: '/exams', icon: 'pi pi-pencil' },
      { label: 'Attendance', path: '/attendance', icon: 'pi pi-calendar' },
      { label: 'Academic Identity', path: '/academic-identity', icon: 'pi pi-id-card' },
    ],
   
  };


}
