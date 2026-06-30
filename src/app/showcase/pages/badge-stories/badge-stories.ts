import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BadgeDirective } from '../../../shared/components/ui/badge/badge.directive';
import { Button } from '../../../shared/components/ui/button/button';
import { Story } from '../../story/story';

@Component({
  selector: 'app-badge-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BadgeDirective, Button, Story],
  templateUrl: './badge-stories.html',
  styleUrl: './badge-stories.scss',
})
export class BadgeStories {
  protected readonly count = signal(3);
  protected readonly lastClick = signal('—');

  protected inc(): void {
    this.count.update((c) => c + 1);
  }

  protected dec(): void {
    this.count.update((c) => Math.max(0, c - 1));
  }

  protected onBadgeClick(): void {
    this.lastClick.set(new Date().toLocaleTimeString());
  }
}
