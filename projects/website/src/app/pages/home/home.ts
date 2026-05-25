import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { MyDrawer } from '../../components/open-drawer/open-drawer';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MyDrawer],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly meta = inject(Meta);
  constructor() {
    this.meta.updateTag({
      name: 'description',
      content:
        'Drawer component for Angular. Lightweight, accessible, and headless. Style with CSS and ship better UX in minutes.',
    });
  }
}
