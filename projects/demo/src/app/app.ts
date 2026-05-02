import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BetterDrawer } from 'better-drawer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BetterDrawer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('demo');
}
