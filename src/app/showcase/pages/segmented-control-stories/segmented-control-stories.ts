import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  SegmentedControl,
  SegmentedOption,
} from '../../../shared/components/ui/segmented-control/segmented-control';
import { Story } from '../../story/story';

@Component({
  selector: 'app-segmented-control-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SegmentedControl, Story, FormsModule],
  templateUrl: './segmented-control-stories.html',
  styleUrl: './segmented-control-stories.scss',
})
export class SegmentedControlStories {
  protected readonly ranges = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
  protected readonly range = signal<string>('Daily');

  protected readonly view = signal<string>('list');
  protected readonly viewOptions: SegmentedOption[] = [
    { label: 'List', value: 'list' },
    { label: 'Board', value: 'board' },
    { label: 'Calendar', value: 'calendar' },
    { label: 'Timeline', value: 'timeline', disabled: true },
  ];

  protected readonly size = signal<string>('md');
  protected readonly sizes = ['sm', 'md', 'lg'];

  protected readonly plan = signal<string>('pro');
  protected readonly plans = ['Free', 'Pro', 'Team'];
}
