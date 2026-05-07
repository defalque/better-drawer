import { afterNextRender, Component, DestroyRef, inject, model, signal } from '@angular/core';
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

type DefaultDocSection = 'default' | 'side-drawer' | 'nested-drawers' | 'scrollable';

const ON_DEFAULT_SOURCE = `import { Component, model } from '@angular/core';
import { BetterDrawerContent, BetterDrawerOverlay, BetterDrawerRoot, BetterDrawerTitle, BetterDrawerTrigger } from 'better-drawer';

@Component({
  selector: 'app-my-drawer',
  imports: [
    BetterDrawerRoot, BetterDrawerTrigger, BetterDrawerOverlay, BetterDrawerContent, BetterDrawerTitle
  ],
  template: '
    <div bdDrawerRoot class="contents" [(open)]="openDrawer">
      <button type="button" bdDrawerTrigger class="btn">
        Open Drawer
      </button>
      @if (openDrawer()) {
        <div bdDrawerOverlay class="bg-black/50"></div>
        <div bdDrawerContent class="fixed bottom-0 left-0 right-0 outline-none...">
          <div class="space-y-4 max-w-md mx-auto pt-4">
            <h2 bdDrawerTitle class="title">
              This is a default drawer
            </h2>
            <p class="description">
              Comes from the bottom side of the screen.
            </p>
          </div>
        </div>
      }
    </div>
  ',
})
export class MyDrawer {
  protected openDrawer = model(false);
}`;

const ON_SIDE_DRAWER_SOURCE = `import { Component, model } from '@angular/core';
import { BetterDrawerContent, BetterDrawerOverlay, BetterDrawerRoot, BetterDrawerTitle, BetterDrawerTrigger } from 'better-drawer';

@Component({
  selector: 'app-my-side-drawer',
  imports: [
    BetterDrawerRoot, BetterDrawerTrigger, BetterDrawerOverlay, BetterDrawerContent, BetterDrawerTitle
  ],
  template: '
    <div bdDrawerRoot class="contents" [(open)]="openSideDrawer" direction="left">
      <button type="button" bdDrawerTrigger class="btn">
        Open side drawer
      </button>
      @if (openSideDrawer()) {
        <div bdDrawerOverlay class="bg-black/50"></div>
        <aside bdDrawerContent class="fixed left-0 bottom-0 top-0 outline-none...">
          <div class="space-y-4 max-w-md mx-auto pt-4">
            <h2 bdDrawerTitle class="title">
              This is a side drawer
            </h2>
            <p class="description">
              Comes from the right side of the screen.
            </p>
          </div>
        </aside>
      }
    </div>
  ',
})
export class MySideDrawer {
  protected openSideDrawer = model(false);
}`;

@Component({
  selector: 'app-doc-default',
  imports: [
    RouterLink,
    BetterDrawerRoot,
    BetterDrawerTrigger,
    BetterDrawerOverlay,
    BetterDrawerContent,
    BetterDrawerTitle,
  ],
  templateUrl: './doc-default.html',
  styleUrl: './doc-default.css',
  host: {
    class: 'block w-full min-w-0 max-w-5xl mx-auto',
  },
})
export class DocDefault {
  private readonly meta = inject(Meta);
  protected readonly enterEnabled = signal(false);
  protected activeSection = signal<DefaultDocSection>('default');
  protected readonly destroyRef = inject(DestroyRef);
  private copyResetTimeout: ReturnType<typeof setTimeout> | null = null;

  protected openDrawer = model(false);
  protected onDefaultTab = signal<'preview' | 'code'>('preview');
  protected onDefaultCodeCopied = signal(false);
  protected onDefaultSource(): string {
    return hljs.highlight(ON_DEFAULT_SOURCE, { language: 'typescript' }).value;
  }
  protected async copyOnDefaultCode(): Promise<void> {
    await this.copyToClipboard(ON_DEFAULT_SOURCE, this.onDefaultCodeCopied);
  }

  protected openSideDrawer = model(false);
  protected onSideDrawerTab = signal<'preview' | 'code'>('preview');
  protected onSideDrawerCodeCopied = signal(false);
  protected onSideDrawerSource(): string {
    return hljs.highlight(ON_SIDE_DRAWER_SOURCE, { language: 'typescript' }).value;
  }
  protected async copyOnSideDrawerCode(): Promise<void> {
    await this.copyToClipboard(ON_SIDE_DRAWER_SOURCE, this.onSideDrawerCodeCopied);
  }

  private watchTocTargets(): void {
    const tocLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('.toc-content a[href*="#"]'),
    );

    const sections = tocLinks
      .map((link) => {
        const id = link.hash.slice(1);
        const target = document.getElementById(id);

        return this.isDefaultDocSection(id) && target ? { id, target } : null;
      })
      .filter(
        (section): section is { id: DefaultDocSection; target: HTMLElement } => section !== null,
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

  private isDefaultDocSection(id: string): id is DefaultDocSection {
    return ['default', 'side-drawer', 'nested-drawers', 'scrollable'].includes(id);
  }

  protected tocLinkClass(section: DefaultDocSection): string {
    return this.activeSection() === section
      ? 'text-black dark:text-white'
      : 'text-zinc-600 dark:text-zinc-300/75';
  }

  constructor() {
    this.meta.updateTag({
      name: 'description',
      content: 'Default usage for Better Drawer.',
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
