import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main class="root-layout">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: `
    .root-layout {
      width: 100%;
      height: 100dvh;
      display: flex;
      flex-direction: column;
    }
  `
})
export class RootLayoutComponent {}
