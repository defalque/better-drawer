import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  signal,
} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import {
  BetterDrawerContent,
  BetterDrawerOverlay,
  BetterDrawerRoot,
  BetterDrawerTitle,
  BetterDrawerTrigger,
} from 'better-drawer';
import { ON_NON_MODAL_DRAWER_SOURCE, ON_NON_DISMISSIBLE_DRAWER_SOURCE } from './helpers/sources';
import { higlightTypescriptSource } from '../../../helpers/highlight';
import { Toc } from '../../../components/toc/toc';

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
    Toc,
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
  protected readonly enterEnabled = signal(false);
  protected activeSection = model<OtherDocSection>('non-modal');
  private copyResetTimeout: ReturnType<typeof setTimeout> | null = null;

  protected openNonModalDrawer = model(false);
  protected onNonModalDrawerTab = signal<'preview' | 'code'>('preview');
  protected onNonModalDrawerCodeCopied = signal(false);
  protected onNonModalDrawerSource(): string {
    return higlightTypescriptSource(ON_NON_MODAL_DRAWER_SOURCE);
  }
  protected async copyOnNonModalDrawerCode(): Promise<void> {
    await this.copyToClipboard(ON_NON_MODAL_DRAWER_SOURCE, this.onNonModalDrawerCodeCopied);
  }

  protected openNonDismissibleDrawer = model(false);
  protected onNonDismissibleDrawerTab = signal<'preview' | 'code'>('preview');
  protected onNonDismissibleDrawerCodeCopied = signal(false);
  protected onNonDismissibleDrawerSource(): string {
    return higlightTypescriptSource(ON_NON_DISMISSIBLE_DRAWER_SOURCE);
  }
  protected async copyOnNonDismissibleDrawerCode(): Promise<void> {
    await this.copyToClipboard(
      ON_NON_DISMISSIBLE_DRAWER_SOURCE,
      this.onNonDismissibleDrawerCodeCopied,
    );
  }

  constructor() {
    this.meta.updateTag({
      name: 'description',
      content: 'Other useful configuration setups for Better Drawer.',
    });

    afterNextRender(() => {
      setTimeout(() => {
        this.enterEnabled.set(true);
      }, 100);
    });
  }

  private async copyToClipboard(
    source: string,
    copiedSignal: ReturnType<typeof signal<boolean>>,
  ): Promise<void> {
    try {
      await navigator.clipboard.writeText(source);
      copiedSignal.set(true);
      if (this.copyResetTimeout !== null) {
        clearTimeout(this.copyResetTimeout);
      }
      this.copyResetTimeout = setTimeout(() => copiedSignal.set(false), 2000);
    } catch {
      copiedSignal.set(false);
    }
  }
}
