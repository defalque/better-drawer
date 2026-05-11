import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Toc } from '../../../components/toc/toc';

type ConsiderationsDocSection = 'bundle-size' | 'caveats';

@Component({
  selector: 'app-doc-considerations',
  imports: [RouterLink, Toc],
  templateUrl: './doc-considerations.html',
  styleUrl: './doc-considerations.css',
  host: {
    class: 'block w-full min-w-0 max-w-5xl mx-auto',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocConsiderations {
  private readonly meta = inject(Meta);
  constructor() {
    this.meta.updateTag({
      name: 'description',
      content:
        'Considerations for Better Drawer: bundle size, browser compatibility, @starting-style caveats.',
    });
  }

  protected activeSection = model<ConsiderationsDocSection>('bundle-size');
}
