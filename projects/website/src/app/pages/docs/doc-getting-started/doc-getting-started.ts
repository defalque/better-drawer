import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  model,
  signal,
} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { DRAWER_INSTALLATION_SOURCE, DRAWER_USAGE_SOURCE } from './helpers/sources';
import { higlightBashSource, higlightTypescriptSource } from '../../../helpers/highlight';
import { Toc } from '../../../components/toc/toc';

type GettingStartedDocSection = 'installation' | 'create-a-drawer-component';

@Component({
  selector: 'app-doc-getting-started',
  templateUrl: './doc-getting-started.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Toc],
  styleUrl: './doc-getting-started.css',
  host: {
    class: 'block w-full min-w-0 max-w-5xl mx-auto',
  },
})
export class DocGettingStarted {
  private readonly meta = inject(Meta);
  private copyResetTimeout: ReturnType<typeof setTimeout> | null = null;
  protected readonly enterEnabled = signal(false);

  protected readonly installationCodeCopied = signal(false);
  protected readonly usageCodeCopied = signal(false);
  protected readonly typesCodeCopied = signal(false);

  activeSection = model<GettingStartedDocSection>('installation');

  constructor() {
    this.meta.updateTag({
      name: 'description',
      content:
        'Install Better Drawer, compose a drawer component, and start using it in your app. A step-by-step guide for Angular applications.',
    });

    afterNextRender(() => {
      setTimeout(() => {
        this.enterEnabled.set(true);
      }, 100);
    });
  }

  protected readonly drawerInstallationSource = computed(() => {
    return higlightBashSource(DRAWER_INSTALLATION_SOURCE);
  });

  protected readonly drawerUsageSource = computed(() => {
    return higlightTypescriptSource(DRAWER_USAGE_SOURCE);
  });

  protected async copyInstallationCode(): Promise<void> {
    await this.copyToClipboard(DRAWER_INSTALLATION_SOURCE, this.installationCodeCopied);
  }

  protected async copyUsageCode(): Promise<void> {
    await this.copyToClipboard(DRAWER_USAGE_SOURCE, this.usageCodeCopied);
  }

  private async copyToClipboard(
    source: string,
    copiedSignal: ReturnType<typeof signal<boolean>>,
  ): Promise<void> {
    try {
      if (copiedSignal()) {
        return;
      }
      this.installationCodeCopied.set(false);
      this.usageCodeCopied.set(false);
      this.typesCodeCopied.set(false);
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
