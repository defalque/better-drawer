import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
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
  protected activeSection = signal<OtherDocSection>('non-modal');
  protected readonly destroyRef = inject(DestroyRef);
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

  private watchTocTargets(): void {
    const tocLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('.toc-content a[href*="#"]'),
    );

    const sections = tocLinks
      .map((link) => {
        const id = link.hash.slice(1);
        const target = document.getElementById(id);

        return this.isOtherDocSection(id) && target ? { id, target } : null;
      })
      .filter(
        (section): section is { id: OtherDocSection; target: HTMLElement } => section !== null,
      );

    if (sections.length === 0) {
      return;
    }

    /** Match sidebar offset used elsewhere (-120px region); keeps TOC in sync on short pages where IntersectionObserver often misses. */
    const scrollLinePx = 130;

    const updateActiveFromScroll = (): void => {
      const scrollable = document.documentElement;
      const nearBottom = window.scrollY + window.innerHeight >= scrollable.scrollHeight - 8;

      if (nearBottom) {
        this.activeSection.set(sections[sections.length - 1].id);
        return;
      }

      let active = sections[0].id;
      for (const s of sections) {
        if (s.target.getBoundingClientRect().top <= scrollLinePx) {
          active = s.id;
        }
      }
      this.activeSection.set(active);
    };

    updateActiveFromScroll();
    window.addEventListener('scroll', updateActiveFromScroll, { passive: true });
    window.addEventListener('resize', updateActiveFromScroll, { passive: true });

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('scroll', updateActiveFromScroll);
      window.removeEventListener('resize', updateActiveFromScroll);
    });
  }

  private isOtherDocSection(id: string): id is OtherDocSection {
    return ['non-modal', 'non-dismissible', 'dynamic'].includes(id);
  }

  protected tocLinkClass(section: OtherDocSection): string {
    return this.activeSection() === section
      ? 'text-black dark:text-white'
      : 'text-zinc-600 dark:text-zinc-300/75';
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

      this.watchTocTargets();
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
