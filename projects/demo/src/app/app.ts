import { Component, model, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  BetterDrawerContent,
  BetterDrawerRoot,
  BetterDrawerOverlay,
  BetterDrawerTitle,
  BetterDrawerTrigger,
} from 'better-drawer';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    BetterDrawerContent,
    BetterDrawerRoot,
    BetterDrawerOverlay,
    BetterDrawerTitle,
    BetterDrawerTrigger,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('demo');

  /** Bound to `[bdDrawerRoot]` `[(open)]` for each demo drawer */
  protected readonly leftOpen = model(false);
  protected readonly rightOpen = model(false);
  protected readonly topOpen = model(false);
  protected readonly bottomOpen = model(false);
  protected readonly nonDismissibleOpen = model(false);
  protected readonly nonModalOpen = model(false);
  protected readonly formDrawerOpen = model(false);
  protected readonly floatingOpen = model(false);
  protected readonly hideBarOpen = model(false);
  protected readonly scrollableContentOpen = model(false);

  /** Nested drawer demos: outer / inner `[(open)]` per direction */
  protected readonly nestedLeftOuterOpen = model(false);
  protected readonly nestedLeftInnerOpen = model(false);
  protected readonly nestedRightOuterOpen = model(false);
  protected readonly nestedRightInnerOpen = model(false);
  protected readonly nestedTopOuterOpen = model(false);
  protected readonly nestedTopInnerOpen = model(false);
  protected readonly nestedBottomOuterOpen = model(false);
  protected readonly nestedBottomInnerOpen = model(false);
}
