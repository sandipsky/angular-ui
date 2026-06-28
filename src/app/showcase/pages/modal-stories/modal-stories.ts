import { ChangeDetectionStrategy, Component, TemplateRef, inject, signal, viewChild } from '@angular/core';
import { map, timer } from 'rxjs';
import { Button } from '../../../shared/components/ui/button/button';
import { ConfirmDialog } from '../../../shared/components/ui/modal/confirm-dialog';
import { ModalAnimation } from '../../../shared/components/ui/modal/modal.config';
import { ModalService } from '../../../shared/components/ui/modal/modal.service';
import { Story } from '../../story/story';

@Component({
  selector: 'app-modal-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Story],
  templateUrl: './modal-stories.html',
  styleUrl: './modal-stories.scss',
})
export class ModalStories {
  private readonly _modal = inject(ModalService);

  protected readonly demoTpl = viewChild.required<TemplateRef<unknown>>('demoTpl');
  protected readonly lastResult = signal<string>('—');

  protected readonly animations: ModalAnimation[] = [
    'slideUp',
    'slideDown',
    'slideLeft',
    'slideRight',
    'fade',
    'zoom',
    'none',
  ];

  openBasic(): void {
    this._modal.open(this.demoTpl(), {
      data: {
        title: 'Welcome to LumenUI',
        body: 'This panel is rendered from an <ng-template>. Click the backdrop or press Esc to dismiss it.',
      },
    });
  }

  openAnimation(animation: ModalAnimation): void {
    this._modal.open(this.demoTpl(), {
      animation,
      data: {
        title: `Animation: ${animation}`,
        body: 'Both the enter and leave transitions use this animation.',
      },
    });
  }

  openSized(width: string): void {
    this._modal.open(this.demoTpl(), {
      width,
      data: { title: `Width: ${width}`, body: 'The panel still caps at maxWidth (90vw by default).' },
    });
  }

  openNoBackdrop(): void {
    this._modal.open(this.demoTpl(), {
      backdrop: false,
      data: { title: 'No backdrop', body: 'The page behind stays visible — only the panel floats above it.' },
    });
  }

  openDisableClose(): void {
    this._modal.open(this.demoTpl(), {
      disableClose: true,
      data: {
        title: 'Disabled close',
        body: 'Backdrop clicks and Esc are ignored — you must use the button below.',
      },
    });
  }

  openConfirm(): void {
    const ref = this._modal.open(ConfirmDialog, {
      data: {
        title: 'Delete project?',
        message: 'This permanently removes the project and all of its data. This cannot be undone.',
      },
    });
    ref.afterClosed().subscribe((result) => this.lastResult.set(result ? 'Confirmed' : 'Cancelled'));
  }

  openAsyncConfirm(): void {
    const ref = this._modal.open(ConfirmDialog, {
      data: {
        title: 'Save changes?',
        message: 'The dialog stays open and shows a loading state until the async action resolves.',
        confirmText: 'Save',
        confirmVariant: 'primary',
        onConfirm: () => timer(1200).pipe(map(() => true)),
      },
    });
    ref.afterClosed().subscribe((result) => this.lastResult.set(result ? 'Saved' : 'Cancelled'));
  }
}
