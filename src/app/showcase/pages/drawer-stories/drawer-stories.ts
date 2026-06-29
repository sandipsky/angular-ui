import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Button } from '../../../shared/components/ui/button/button';
import { DrawerPosition } from '../../../shared/components/ui/drawer/drawer.config';
import { DrawerService } from '../../../shared/components/ui/drawer/drawer.service';
import { Story } from '../../story/story';

@Component({
  selector: 'app-drawer-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Story],
  templateUrl: './drawer-stories.html',
  styleUrl: './drawer-stories.scss',
})
export class DrawerStories {
  private readonly _drawer = inject(DrawerService);

  protected readonly demoTpl = viewChild.required<TemplateRef<unknown>>('demoTpl');

  protected readonly positions: DrawerPosition[] = ['left', 'right', 'bottom'];

  openPosition(position: DrawerPosition): void {
    this._drawer.open(this.demoTpl(), {
      position,
      data: {
        title: `${position[0].toUpperCase()}${position.slice(1)} drawer`,
        body: 'The slide direction follows the position. Click the backdrop or press Esc to dismiss it.',
      },
    });
  }

  openSized(size: string): void {
    this._drawer.open(this.demoTpl(), {
      position: 'right',
      size,
      data: { title: `Size: ${size}`, body: 'size sets the width for left/right drawers.' },
    });
  }

  openNoBackdrop(): void {
    this._drawer.open(this.demoTpl(), {
      position: 'right',
      backdrop: false,
      data: { title: 'No backdrop', body: 'The page behind stays visible — only the panel floats above it.' },
    });
  }

  openDisableClose(): void {
    this._drawer.open(this.demoTpl(), {
      position: 'right',
      disableClose: true,
      data: {
        title: 'Disabled close',
        body: 'Backdrop clicks and Esc are ignored — you must use the button below.',
      },
    });
  }
}
