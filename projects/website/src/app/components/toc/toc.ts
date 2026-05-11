import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  model,
} from '@angular/core';

@Component({
  selector: 'app-toc',
  imports: [],
  templateUrl: './toc.html',
  styleUrl: './toc.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toc {
  protected readonly destroyRef = inject(DestroyRef);

  route = input.required<string>();
  sections = input.required<string[]>();
  labels = input.required<string[]>();
  activeSection = model<string>('');

  constructor() {
    afterNextRender(() => {
      this.watchTocTargets();
    });
  }

  private watchTocTargets(): void {
    const tocLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('.toc-content a[href*="#"]'),
    );

    const sections = tocLinks
      .map((link) => {
        const id = link.hash.slice(1);
        const target = document.getElementById(id);

        return this.isDocSection(id) && target ? { id, target } : null;
      })
      .filter((section): section is { id: string; target: HTMLElement } => section !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (!visibleEntry) {
          return;
        }

        const activeSection = sections.find((section) => section.target === visibleEntry.target);

        if (activeSection) {
          this.activeSection.set(activeSection.id);
        }
      },
      {
        rootMargin: '-120px 0px -70% 0px',
        threshold: 0,
      },
    );

    for (const section of sections) {
      observer.observe(section.target);
    }

    this.destroyRef.onDestroy(() => observer.disconnect());
  }

  private isDocSection(id: string): id is string {
    return this.sections().some((section) => section === id);
  }

  protected tocLinkClass(section: string): string {
    return this.activeSection() === section
      ? 'text-black dark:text-white'
      : 'text-zinc-500 dark:text-zinc-300/75';
  }
}
