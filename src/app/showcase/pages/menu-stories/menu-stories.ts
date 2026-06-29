import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Menu } from '../../../shared/components/ui/menu/menu';
import { Button } from '../../../shared/components/ui/button/button';
import { Story } from '../../story/story';

@Component({
  selector: 'app-menu-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Menu, Button, Story],
  templateUrl: './menu-stories.html',
  styleUrl: './menu-stories.scss',
})
export class MenuStories {
  protected readonly lastAction = signal<string>('—');

  protected pick(action: string): void {
    this.lastAction.set(action);
  }
}
