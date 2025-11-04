import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-auth-layout',
  imports: [RouterOutlet],
  styleUrls: ['./auth-layout.component.css'],
  template: `
  <main class="flex min-h-screen w-full font-inter ">
    <!-- Partie gauche : formulaire -->
    <section class=" w-1/2 items-center justify-center ">
      <router-outlet></router-outlet>
    </section>

    <!-- Partie droite : image -->
    <section class="flex w-1/2 items-center justify-end bg-sky-1 max-lg:hidden">
      <div class="rounded-xl border-y-[6px] border-l-[6px] border-gray-900">
        <img
          src="/assets/icons/auth-image.svg"
          alt="Auth Image"
          width="500"
          height="500"
          class="rounded-l-xl object-contain"
        />
      </div>
    </section>
  </main>
`,


})
export class AuthLayoutComponent {}
