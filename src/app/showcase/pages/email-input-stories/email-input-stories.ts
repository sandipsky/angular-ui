import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailInput } from '../../../shared/components/ui/input/email-input/email-input';
import { Story } from '../../story/story';

@Component({
  selector: 'app-email-input-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EmailInput, Story, FormsModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './email-input-stories.html',
  styleUrl: './email-input-stories.scss',
})
export class EmailInputStories {
  protected readonly ngModelValue = signal('');
  protected readonly emailControl = new FormControl('', [Validators.required]);
}
