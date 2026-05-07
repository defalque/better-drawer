import { Component, model, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ThemeToggle } from '../../../components/theme-toggle/theme-toggle';
import {
  BetterDrawerOverlay,
  BetterDrawerRoot,
  BetterDrawerTrigger,
  BetterDrawerContent,
  BetterDrawerTitle,
} from 'better-drawer';

@Component({
  selector: 'app-docs-shell',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ThemeToggle,
    BetterDrawerRoot,
    BetterDrawerTrigger,
    BetterDrawerOverlay,
    BetterDrawerContent,
    BetterDrawerTitle,
  ],
  templateUrl: './docs-shell.html',
  styleUrl: './docs-shell.css',
})
export class DocsShell {
  protected openDrawer = signal(false);
  protected openMobileDrawer = model(false);
}
