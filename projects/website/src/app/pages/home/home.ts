import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { MyDrawer } from '../../components/open-drawer/open-drawer';

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);

@Component({
  selector: 'app-home',
  imports: [RouterLink, MyDrawer],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly meta = inject(Meta);

  constructor() {
    this.meta.updateTag({
      name: 'description',
      content:
        'Drawer component for Angular. Lightweight, accessible, and headless. Style with CSS and ship better UX in minutes.',
    });
  }
}
