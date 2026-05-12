import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import {
  BetterDrawerContent,
  BetterDrawerOverlay,
  BetterDrawerRoot,
  BetterDrawerTitle,
  BetterDrawerTrigger,
} from 'better-drawer';
import {
  ON_DEFAULT_SOURCE,
  ON_SIDE_DRAWER_SOURCE,
  ON_NESTED_DRAWER_SOURCE,
  ON_SCROLLABLE_DRAWER_SOURCE,
} from './helpers/sources';
import { Toc } from '../../../components/toc/toc';
import { CodeTabs } from '../../../components/code-tabs/code-tabs';

type DefaultDocSection = 'default' | 'side-drawer' | 'nested-drawers' | 'scrollable';

@Component({
  selector: 'app-doc-default',
  imports: [
    RouterLink,
    BetterDrawerRoot,
    BetterDrawerTrigger,
    BetterDrawerOverlay,
    BetterDrawerContent,
    BetterDrawerTitle,
    Toc,
    CodeTabs,
  ],
  templateUrl: './doc-default.html',
  styleUrl: './doc-default.css',
  host: {
    class: 'block w-full min-w-0 max-w-5xl mx-auto',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocDefault {
  private readonly meta = inject(Meta);
  constructor() {
    this.meta.updateTag({
      name: 'description',
      content: 'Main features of Better Drawer.',
    });
  }

  protected activeSection = model<DefaultDocSection>('default');

  protected openDrawer = model(false);
  protected readonly defaultDrawerCodeSource = ON_DEFAULT_SOURCE;

  protected openSideDrawer = model(false);
  protected readonly sideDrawerCodeSource = ON_SIDE_DRAWER_SOURCE;

  protected openNestedDrawer = model(false);
  protected openNestedDrawer2 = model(false);
  protected readonly nestedDrawerCodeSource = ON_NESTED_DRAWER_SOURCE;

  protected openScrollableDrawer = model(false);
  protected readonly scrollableDrawerCodeSource = ON_SCROLLABLE_DRAWER_SOURCE;
}
