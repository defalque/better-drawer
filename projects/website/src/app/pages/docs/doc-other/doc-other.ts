import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import {
  BetterDrawerContent,
  BetterDrawerOverlay,
  BetterDrawerRoot,
  BetterDrawerTitle,
  BetterDrawerTrigger,
  BetterDrawerPortal,
} from 'better-drawer';
import { ON_NON_MODAL_DRAWER_SOURCE, ON_NON_DISMISSIBLE_DRAWER_SOURCE } from './helpers/sources';
import { Toc } from '../../../components/toc/toc';
import { CodeTabs } from '../../../components/code-tabs/code-tabs';

type OtherDocSection = 'non-modal' | 'non-dismissible' | 'dynamic';

@Component({
  selector: 'app-doc-other',
  imports: [
    RouterLink,
    BetterDrawerRoot,
    BetterDrawerTrigger,
    BetterDrawerOverlay,
    BetterDrawerContent,
    BetterDrawerTitle,
    BetterDrawerPortal,
    Toc,
    CodeTabs,
  ],
  templateUrl: './doc-other.html',
  styleUrl: './doc-other.css',
  host: {
    class: 'block w-full min-w-0 max-w-5xl mx-auto',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocOther {
  private readonly meta = inject(Meta);
  constructor() {
    this.meta.updateTag({
      name: 'description',
      content: 'Other useful configuration setups for Better Drawer.',
    });
  }

  protected activeSection = model<OtherDocSection>('non-modal');

  protected openNonModalDrawer = model(false);
  protected readonly nonModalDrawerCodeSource = ON_NON_MODAL_DRAWER_SOURCE;

  protected openNonDismissibleDrawer = model(false);
  protected readonly nonDismissibleDrawerCodeSource = ON_NON_DISMISSIBLE_DRAWER_SOURCE;
}
