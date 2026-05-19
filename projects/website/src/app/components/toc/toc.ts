import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  model,
} from '@angular/core';
import { RouterLink } from '@angular/router';

type TrackedSection = { id: string; target: HTMLElement };

@Component({
  selector: 'app-toc',
  imports: [RouterLink],
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

  /** Sidebar offset region; sections whose top has passed this line are considered passed. */
  private readonly scrollLinePx = 130;
  private readonly nearBottomThresholdPx = 8;

  private trackedSections: TrackedSection[] = [];

  constructor() {
    afterNextRender(() => {
      this.watchTocTargets();
    });
  }

  protected onSectionClick(section: string): void {
    this.activeSection.set(section);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => this.updateActiveFromScroll());
    });
  }

  private watchTocTargets(): void {
    const tocLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('.toc-content a[href*="#"]'),
    );

    this.trackedSections = tocLinks
      .map((link) => {
        const id = link.hash.slice(1);
        const target = document.getElementById(id);

        return this.isDocSection(id) && target ? { id, target } : null;
      })
      .filter((section): section is TrackedSection => section !== null);

    if (this.trackedSections.length === 0) {
      return;
    }

    this.updateActiveFromScroll();

    const onScrollOrResize = (): void => this.updateActiveFromScroll();

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    });
  }

  private updateActiveFromScroll(): void {
    if (this.trackedSections.length === 0) {
      return;
    }

    this.activeSection.set(this.resolveActiveSection());
  }

  private resolveActiveSection(): string {
    const sections = this.trackedSections;
    const scrollable = document.documentElement;
    const nearBottom =
      window.scrollY + window.innerHeight >= scrollable.scrollHeight - this.nearBottomThresholdPx;

    if (nearBottom) {
      return sections[sections.length - 1].id;
    }

    let active = sections[0].id;
    for (const s of sections) {
      if (s.target.getBoundingClientRect().top <= this.scrollLinePx) {
        active = s.id;
      }
    }
    return active;
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
