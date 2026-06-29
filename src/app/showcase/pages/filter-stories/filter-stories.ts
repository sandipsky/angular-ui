import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Filter, FilterChange, FilterColumn } from '../../../shared/components/ui/filter/filter';
import { Story } from '../../story/story';

/** Builds a fresh column set so each demo mutates its own field values. */
function makeColumns(): FilterColumn[] {
  return [
    { name: 'Name', formcontrolName: 'name', type: 'text' },
    {
      name: 'Status',
      formcontrolName: 'status',
      type: 'select',
      data: [
        { id: 'active', name: 'Active' },
        { id: 'invited', name: 'Invited' },
        { id: 'disabled', name: 'Disabled' },
      ],
    },
    {
      name: 'Team',
      formcontrolName: 'team',
      type: 'select',
      groupBy: 'group',
      data: [
        { id: 1, name: 'Design', group: 'Product' },
        { id: 2, name: 'Engineering', group: 'Product' },
        { id: 3, name: 'Sales', group: 'Go to market' },
        { id: 4, name: 'Support', group: 'Go to market' },
      ],
    },
  ];
}

@Component({
  selector: 'app-filter-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Filter, Story],
  templateUrl: './filter-stories.html',
  styleUrl: './filter-stories.scss',
})
export class FilterStories {
  protected readonly columns = makeColumns();
  protected readonly plainColumns = makeColumns();

  protected readonly applied = signal<FilterChange[]>([]);
  protected readonly appliedText = computed(
    () =>
      this.applied()
        .map((f) => `${f.field}: ${f.displayValue || f.value}`)
        .join('   ·   ') || '—',
  );

  protected onFilter(changes: FilterChange[]): void {
    this.applied.set(changes);
  }
}
