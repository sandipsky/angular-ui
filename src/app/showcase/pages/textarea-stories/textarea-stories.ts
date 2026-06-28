import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Textarea } from '../../../shared/components/ui/input/textarea/textarea';
import { Story } from '../../story/story';

@Component({
  selector: 'app-textarea-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Textarea, Story, FormsModule, ReactiveFormsModule],
  templateUrl: './textarea-stories.html',
  styleUrl: './textarea-stories.scss',
})
export class TextareaStories {
  protected readonly ngModelValue = signal('');
  protected readonly bioControl = new FormControl('', [Validators.required, Validators.minLength(10)]);
}
