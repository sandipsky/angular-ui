import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Button } from '../../../shared/components/ui/button/button';
import { Skeleton } from '../../../shared/components/ui/skeleton/skeleton';
import { Story } from '../../story/story';

@Component({
  selector: 'app-skeleton-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Skeleton, Button, Story],
  templateUrl: './skeleton-stories.html',
  styleUrl: './skeleton-stories.scss',
})
export class SkeletonStories {
  protected readonly loading = signal(true);

  protected toggleLoading(): void {
    this.loading.update((v) => !v);
  }
}
