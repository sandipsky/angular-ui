import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Radio } from '../../../shared/components/ui/input/radio/radio';
import { RadioOption } from '../../../shared/components/ui/input/input';
import { Story } from '../../story/story';

@Component({
  selector: 'app-radio-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Radio, Story, FormsModule, ReactiveFormsModule],
  templateUrl: './radio-stories.html',
  styleUrl: './radio-stories.scss',
})
export class RadioStories {
  protected readonly plans: RadioOption[] = [
    { label: 'Free', value: 'free' },
    { label: 'Pro', value: 'pro' },
    { label: 'Enterprise', value: 'enterprise' },
  ];

  protected readonly ngModelValue = signal('pro');
  protected readonly planControl = new FormControl('free');
}
