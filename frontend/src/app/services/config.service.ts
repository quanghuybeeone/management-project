import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private apiUrl = 'http://localhost:7777/api/';
  private imageUrl = 'http://localhost:7777/uploads/';

  getApiUrl(): string {
    return this.apiUrl;
  }

  getImageUrl(): string {
    return this.imageUrl;
  }
}
