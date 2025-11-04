// src/app/components/common/animated-counter/animated-counter.component.ts
import { Component, Input, signal, effect } from '@angular/core';

@Component({
  selector: 'app-animated-counter',
  standalone: true,
  template: `
    <div class="w-full">
      {{ display() }}
    </div>
  `,
})
export class AnimatedCounterComponent {
  /**
   * Valeur finale sous forme de string (ex: "$1,234.56")
   */
  @Input() amount = '0';

  // signal pour l'affichage progressif
  display = signal('0');

  private duration = 1000; // durée totale en ms

  ngOnChanges() {
    // Nettoyer la chaîne pour extraire le nombre
    const numericAmount = Number(this.amount.replace(/[^0-9.-]+/g, '')) || 0;
    this.animateTo(numericAmount);
  }

  /**
   * Anime la valeur de 0 → target (type "count-up")
   */
  private animateTo(target: number) {
    const start = performance.now();
    const animate = (time: number) => {
      const progress = Math.min((time - start) / this.duration, 1);
      const current = target * progress;
      this.display.set(current.toFixed(2)); // deux décimales
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }
}
