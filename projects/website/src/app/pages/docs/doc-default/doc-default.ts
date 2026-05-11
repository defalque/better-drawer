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
import {
  ON_DEFAULT_SOURCE,
  ON_SIDE_DRAWER_SOURCE,
  ON_NESTED_DRAWER_SOURCE,
} from './helpers/sources';
import { higlightTypescriptSource } from '../../../helpers/highlight';
import { Toc } from '../../../components/toc/toc';

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
  protected activeSection = model<DefaultDocSection>('default');

  constructor() {
    this.meta.updateTag({
      name: 'description',
      content: 'Main features of Better Drawer.',
    });

    afterNextRender(() => {
      setTimeout(() => {
        this.enterEnabled.set(true);
      }, 100);
    });
  }

  protected readonly enterEnabled = signal(false);
  private copyResetTimeout: ReturnType<typeof setTimeout> | null = null;

  protected openDrawer = model(false);
  protected onDefaultTab = signal<'preview' | 'code'>('preview');
  protected onDefaultCodeCopied = signal(false);
  protected onDefaultSource(): string {
    return higlightTypescriptSource(ON_DEFAULT_SOURCE);
  }
  protected async copyOnDefaultCode(): Promise<void> {
    await this.copyToClipboard(ON_DEFAULT_SOURCE, this.onDefaultCodeCopied);
  }

  protected openSideDrawer = model(false);
  protected onSideDrawerTab = signal<'preview' | 'code'>('preview');
  protected onSideDrawerCodeCopied = signal(false);
  protected onSideDrawerSource(): string {
    return higlightTypescriptSource(ON_SIDE_DRAWER_SOURCE);
  }
  protected async copyOnSideDrawerCode(): Promise<void> {
    await this.copyToClipboard(ON_SIDE_DRAWER_SOURCE, this.onSideDrawerCodeCopied);
  }

  protected openNestedDrawer = model(false);
  protected openNestedDrawer2 = model(false);
  protected onNestedDrawerTab = signal<'preview' | 'code'>('preview');
  protected onNestedDrawerCodeCopied = signal(false);
  protected onNestedDrawerSource(): string {
    return higlightTypescriptSource(ON_NESTED_DRAWER_SOURCE);
  }
  protected async copyOnNestedDrawerCode(): Promise<void> {
    await this.copyToClipboard(ON_NESTED_DRAWER_SOURCE, this.onNestedDrawerCodeCopied);
  }

  protected openScrollableDrawer = model(false);
  protected onScrollableDrawerTab = signal<'preview' | 'code'>('preview');
  protected onScrollableDrawerCodeCopied = signal(false);
  protected onScrollableDrawerSource(): string {
    return higlightTypescriptSource(ON_DEFAULT_SOURCE);
  }
  protected async copyOnScrollableDrawerCode(): Promise<void> {
    await this.copyToClipboard(ON_DEFAULT_SOURCE, this.onScrollableDrawerCodeCopied);
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
