import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import {
  ON_ANATOMY_SOURCE,
  ON_DRAWER_PORTAL_SOURCE,
  ON_DRAWER_ROOT_SOURCE,
  ON_DRAWER_TRIGGER_SOURCE,
  ON_DRAWER_OVERLAY_SOURCE,
  ON_DRAWER_CONTENT_SOURCE,
  ON_DRAWER_TITLE_SOURCE,
} from './helpers/sources';
import { higlightTypescriptSource, higlightHtmlSource } from '../../../helpers/highlight';
import { Toc } from '../../../components/toc/toc';

type ApiDocSection =
  | 'anatomy'
  | 'bdDrawerRoot'
  | 'bdDrawerTrigger'
  | 'bdDrawerPortal'
  | 'bdDrawerOverlay'
  | 'bdDrawerContent'
  | 'bdDrawerTitle'
  | 'api-reference';

@Component({
  selector: 'app-doc-api',
  imports: [RouterLink, Toc],
  templateUrl: './doc-api.html',
  styleUrl: './doc-api.css',
  host: {
    class: 'block w-full min-w-0 max-w-5xl mx-auto',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocApi {
  private readonly meta = inject(Meta);
  constructor() {
    this.meta.updateTag({
      name: 'description',
      content: "Learn Better Drawer's API.",
    });
  }

  protected activeSection = model<ApiDocSection>('anatomy');

  protected onAnatomySource(): string {
    return higlightTypescriptSource(ON_ANATOMY_SOURCE);
  }

  protected bdDrawerRootSource() {
    return higlightHtmlSource(ON_DRAWER_ROOT_SOURCE);
  }

  protected bdDrawerTriggerSource() {
    return higlightHtmlSource(ON_DRAWER_TRIGGER_SOURCE);
  }

  protected bdDrawerPortalSource() {
    return higlightHtmlSource(ON_DRAWER_PORTAL_SOURCE);
  }

  protected bdDrawerOverlaySource() {
    return higlightHtmlSource(ON_DRAWER_OVERLAY_SOURCE);
  }

  protected bdDrawerContentSource() {
    return higlightHtmlSource(ON_DRAWER_CONTENT_SOURCE);
  }

  protected bdDrawerTitleSource() {
    return higlightHtmlSource(ON_DRAWER_TITLE_SOURCE);
  }
}
