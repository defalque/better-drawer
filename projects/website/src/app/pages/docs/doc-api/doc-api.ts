import { afterNextRender, Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import hljs from 'highlight.js';
import typescript from 'highlight.js/lib/languages/typescript';

hljs.registerLanguage('typescript', typescript);

const ON_ANATOMY_SOURCE = `import { Component, model } from '@angular/core';
import { 
  BetterDrawerContent,
  BetterDrawerOverlay,
  BetterDrawerRoot,
  BetterDrawerTitle,
  BetterDrawerTrigger,
} from 'better-drawer';

@Component({
  selector: 'app-my-drawer',
  imports: [
    BetterDrawerRoot, 
    BetterDrawerTrigger, 
    BetterDrawerOverlay, 
    BetterDrawerContent, 
    BetterDrawerTitle,
  ],
  template: '
    <div bdDrawerRoot [(open)]="openDrawer">
      <button type="button" bdDrawerTrigger>
        Open Drawer
      </button>
      @if (openDrawer()) {
        <div bdDrawerOverlay></div>
        <div bdDrawerContent>
            <h2 bdDrawerTitle></h2>
        </div>
      }
    </div>
  ',
})
export class MyDrawer {
  protected openDrawer = model(false);
}`;

type ApiDocSection =
  | 'anatomy'
  | 'bdDrawerRoot'
  | 'bdDrawerTrigger'
  | 'bdDrawerOverlay'
  | 'bdDrawerContent'
  | 'bdDrawerTitle'
  | 'api-reference';

@Component({
  selector: 'app-doc-api',
  imports: [],
  templateUrl: './doc-api.html',
  styleUrl: './doc-api.css',
  host: {
    class: 'block w-full min-w-0 max-w-5xl mx-auto',
  },
})
export class DocApi {
  private readonly meta = inject(Meta);

  protected activeSection = signal<ApiDocSection>('anatomy');
  protected readonly destroyRef = inject(DestroyRef);

  private watchTocTargets(): void {
    const tocLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('.toc-content a[href*="#"]'),
    );

    const sections = tocLinks
      .map((link) => {
        const id = link.hash.slice(1);
        const target = document.getElementById(id);

        return this.isApiDocSection(id) && target ? { id, target } : null;
      })
      .filter((section): section is { id: ApiDocSection; target: HTMLElement } => section !== null);

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

  private isApiDocSection(id: string): id is ApiDocSection {
    return [
      'anatomy',
      'bdDrawerRoot',
      'bdDrawerTrigger',
      'bdDrawerOverlay',
      'bdDrawerContent',
      'bdDrawerTitle',
      'api-reference',
    ].includes(id);
  }

  protected tocLinkClass(section: ApiDocSection): string {
    return this.activeSection() === section
      ? 'text-black dark:text-white'
      : 'text-zinc-500 dark:text-zinc-300/75';
  }

  constructor() {
    this.meta.updateTag({
      name: 'description',
      content: 'API reference for Better Drawer.',
    });

    afterNextRender(() => {
      this.watchTocTargets();
    });
  }

  protected onAnatomySource(): string {
    return hljs.highlight(ON_ANATOMY_SOURCE, { language: 'typescript' }).value;
  }

  protected readonly bdDrawerRootSource = computed(() => {
    return hljs.highlight(
      `<!-- my-drawer.ts -->
protected openDrawer = model(false);

<!-- my-drawer.html -->
<div bdDrawerRoot [(open)]="openDrawer">...</div>`,
      {
        language: 'typescript',
      },
    ).value;
  });

  protected readonly bdDrawerTriggerSource = computed(() => {
    return hljs.highlight(`<button bdDrawerTrigger type="button">...</button>`, {
      language: 'xml',
    }).value;
  });

  protected readonly bdDrawerOverlaySource = computed(() => {
    return hljs.highlight(
      `<!-- my-drawer.ts -->
protected openDrawer = model(false);

<!-- my-drawer.html -->
@if (openDrawer()) {
  <div bdDrawerOverlay></div>
  ...
}`,
      {
        language: 'xml',
      },
    ).value;
  });

  protected readonly bdDrawerContentSource = computed(() => {
    return hljs.highlight(
      `<!-- my-drawer.ts -->
protected openDrawer = model(false);

<!-- my-drawer.html -->
@if (openDrawer()) {
  ...
  <div bdDrawerContent></div>
}`,
      {
        language: 'xml',
      },
    ).value;
  });

  protected readonly bdDrawerTitleSource = computed(() => {
    return hljs.highlight(
      `<!-- my-drawer.ts -->
protected openDrawer = model(false);

<!-- my-drawer.html -->
@if (openDrawer()) {
  ...
  <h2 bdDrawerTitle></h2>
}`,
      {
        language: 'xml',
      },
    ).value;
  });
}
