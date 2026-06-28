import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInput } from '../../../shared/components/ui/input/text-input/text-input';
import { Story } from '../../story/story';

@Component({
  selector: 'app-text-input-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TextInput, Story, FormsModule, ReactiveFormsModule],
  templateUrl: './text-input-stories.html',
  styleUrl: './text-input-stories.scss',
})
export class TextInputStories {
  protected readonly ngModelValue = signal('');
  protected readonly nameControl = new FormControl('');
  protected readonly lastEvent = signal('—');
}
