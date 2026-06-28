import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordInput } from '../../../shared/components/ui/input/password-input/password-input';
import { Story } from '../../story/story';

@Component({
  selector: 'app-password-input-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PasswordInput, Story, FormsModule, ReactiveFormsModule],
  templateUrl: './password-input-stories.html',
  styleUrl: './password-input-stories.scss',
})
export class PasswordInputStories {
  protected readonly ngModelValue = signal('');
  protected readonly passwordControl = new FormControl('');
}
