import { afterNextRender, Component, input, model, signal } from '@angular/core';
import { higlightTypescriptSource } from '../../helpers/highlight';

@Component({
  selector: 'app-code-tabs',
  imports: [],
  templateUrl: './code-tabs.html',
  styleUrl: './code-tabs.css',
  host: {
    class: 'mt-7 space-y-6',
  },
})
export class CodeTabs {
  readonly codeSource = input.required<string>();

  protected readonly enterEnabled = signal(false);
  constructor() {
    afterNextRender(() => {
      setTimeout(() => {
        this.enterEnabled.set(true);
      }, 100);
    });
  }

  private copyResetTimeout: ReturnType<typeof setTimeout> | null = null;

  protected openDrawer = model(false);
  protected onTabClick = signal<'preview' | 'code'>('preview');
  protected onCodeCopied = signal(false);
  protected drawerCodeSource(): string {
    return higlightTypescriptSource(this.codeSource());
  }
  protected async copyDrawerCodeSource(): Promise<void> {
    await this.copyToClipboard(this.codeSource(), this.onCodeCopied);
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
