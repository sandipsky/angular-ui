import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PageEvent, Pagination } from '../../../shared/components/ui/pagination/pagination';
import { Story } from '../../story/story';

@Component({
  selector: 'app-pagination-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Pagination, Story],
  templateUrl: './pagination-stories.html',
  styleUrl: './pagination-stories.scss',
})
export class PaginationStories {
  protected readonly lastEvent = signal<PageEvent | null>(null);

  protected onPage(event: PageEvent): void {
    this.lastEvent.set(event);
  }
}
