import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocalStorageService } from './services/localstorage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'front_qualitystandardohio';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.checkVersion();
  }

  checkVersion() {
    if (this.localStorageService.isLocalStorageAvailable()) {
      this.http.get('version.json?' + new Date().getTime()).subscribe((data: any) => {
        const currentVersion = localStorage.getItem('appVersion');
        if (currentVersion && currentVersion !== data.version) {
          localStorage.setItem('appVersion', data.version);
          location.reload(); // Fuerza la recarga cuando hay una nueva versión
        } else {
          localStorage.setItem('appVersion', data.version);
        }
      });
    }
  }
}
