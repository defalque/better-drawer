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
import hljs from 'highlight.js';
import {
  BetterDrawerContent,
  BetterDrawerOverlay,
  BetterDrawerRoot,
  BetterDrawerTitle,
  BetterDrawerTrigger,
} from 'better-drawer';

type OtherDocSection = 'non-modal' | 'non-dismissible' | 'dynamic';

const ON_NON_MODAL_DRAWER_SOURCE = `import { Component, model } from '@angular/core';
import { BetterDrawerContent, BetterDrawerOverlay, BetterDrawerRoot, BetterDrawerTitle, BetterDrawerTrigger } from 'better-drawer';

@Component({
  selector: 'app-my-non-modal-drawer',
  imports: [
    BetterDrawerRoot, BetterDrawerTrigger, BetterDrawerOverlay, BetterDrawerContent, BetterDrawerTitle
  ],
  template: '
    <div bdDrawerRoot class="contents" [(open)]="openNonModalDrawer" [modal]="false">
      <button type="button" bdDrawerTrigger class="btn">
        Open non modal drawer
      </button>
      @if (openNonModalDrawer()) {
        <div bdDrawerOverlay class="bg-black/50"></div>
        <div bdDrawerContent class="fixed bottom-0 left-0 right-0 outline-none...">
          <div class="space-y-4 max-w-md mx-auto pt-4">
            <h2 bdDrawerTitle class="title">
              This is a non modal drawer
            </h2>
            <p class="description">
              Interaction with the background is allowed while the drawer is open.
            </p>
          </div>
        </div>
      }
    </div>
  ',
})
export class MyNonModalDrawer {
  protected openNonModalDrawer = model(false);
}`;

const ON_NON_DISMISSIBLE_DRAWER_SOURCE = `import { Component, model } from '@angular/core';
import { BetterDrawerContent, BetterDrawerOverlay, BetterDrawerRoot, BetterDrawerTitle, BetterDrawerTrigger } from 'better-drawer';

@Component({
  selector: 'app-my-non-dismissible-drawer',
  imports: [
    BetterDrawerRoot, BetterDrawerTrigger, BetterDrawerOverlay, BetterDrawerContent, BetterDrawerTitle
  ],
  template: '
    <div bdDrawerRoot class="contents" [(open)]="openNonDismissibleDrawer" direction="bottom" [dismissible]="false">
      <button type="button" bdDrawerTrigger class="btn">
        Open non dismissible drawer
      </button>
      @if (openNonDismissibleDrawer()) {
        <div bdDrawerOverlay class="bg-black/50"></div>
        <aside bdDrawerContent class="fixed left-0 bottom-0 right-0 outline-none...">
          <div class="space-y-4 max-w-md mx-auto pt-4">
            <h2 bdDrawerTitle class="title">
              This is a non dismissible drawer
            </h2>
            <p class="description">
              You can't close the drawer by clicking outside of it, pressing the escape key, or dragging it down.
            </p>
          </div>
        </aside>
      }
    </div>
  ',
})
export class MyNonDismissibleDrawer {
  protected openNonDismissibleDrawer = model(false);
}`;

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
    return hljs.highlight(ON_NON_MODAL_DRAWER_SOURCE, { language: 'typescript' }).value;
  }
  protected async copyOnNonModalDrawerCode(): Promise<void> {
    await this.copyToClipboard(ON_NON_MODAL_DRAWER_SOURCE, this.onNonModalDrawerCodeCopied);
  }

  protected openNonDismissibleDrawer = model(false);
  protected onNonDismissibleDrawerTab = signal<'preview' | 'code'>('preview');
  protected onNonDismissibleDrawerCodeCopied = signal(false);
  protected onNonDismissibleDrawerSource(): string {
    return hljs.highlight(ON_NON_DISMISSIBLE_DRAWER_SOURCE, { language: 'typescript' }).value;
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
      content: 'Other features for Better Drawer.',
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
