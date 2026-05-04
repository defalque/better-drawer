import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BetterDrawer, BetterDrawerOverlay } from 'better-drawer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BetterDrawer, BetterDrawerOverlay],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('demo');

  protected readonly leftOpen = signal(false);
  protected readonly rightOpen = signal(false);
  protected readonly topOpen = signal(false);
  protected readonly bottomOpen = signal(false);
}
