import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="login-container">
      <h1>Login</h1>
      <p>Welcome to the application</p>
      <button routerLink="/visor">Go to Visor</button>
    </div>
  `,
  styles: `
    .login-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100dvh;
      gap: 1rem;
      
      h1 {
        font-size: 2rem;
      }
      
      button {
        padding: 0.5rem 1rem;
        background-color: var(--pill-accent, #4f46e5);
        color: white;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
        font-size: 1rem;
        
        &:hover {
          opacity: 0.9;
        }
      }
    }
  `
})
export class LoginComponent {}
