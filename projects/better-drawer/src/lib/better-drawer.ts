import { Component, signal } from '@angular/core';

@Component({
  selector: 'better-drawer',
  imports: [],
  template: `
    <div [attr.data-open]="open()" aria-hidden="true" class="overlay"></div>
    <div [attr.data-open]="open()" role="dialog" class="drawer"></div>
  `,
  styleUrl: './styles.css',
})
export class BetterDrawer {
  protected readonly open = signal(false);
}
