import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import Axios from 'axios';
import { SweetAlert } from './sweet-alert';

@Injectable({
  providedIn: 'root'
})
export class Product {
  
  public  APPURL = environment.appUrl;

   public SweetAlertService = inject(SweetAlert);


  constructor(){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

   async createNewRecord( endpoint: string, payload: any){
    try {
       const response = await Axios.post(`${this.APPURL}/${endpoint}`, payload);
      return response.data;
    } catch (error) {
          console.error('Error creating new record:', error);
      throw error; 
    }
   }


   async fetchRecord(endpoint:any){
    try {
      const reponse = await Axios.get(`${this.APPURL}/${endpoint}`);
      return reponse.data
    } catch (error) {
       console.error('Error fetching record:', error);
    throw error;
    }
   }

     // Fetch Single Product By ID
  async fetchRecordById(id: any,endpoint: string,) {
    try {
      const response = await Axios.get(`${this.APPURL}/${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    }
  }

  async  updateRecord( endpoint:any, payload:any){
    try {
      const response = await Axios.put(`${this.APPURL}/${endpoint}`, payload);

      return response.data

    } catch (error) {
          console.error('Error updating record:', error);
    throw error;
    }
  }
  

  async deleteRecord(endpoint:any){
    try {
      const response = await  Axios.delete(`${this.APPURL}/${endpoint}`);
      return response.data
    } catch (error) {
               console.error('Error Deleting record:', error);
    throw error;
    }
  }
  
}
