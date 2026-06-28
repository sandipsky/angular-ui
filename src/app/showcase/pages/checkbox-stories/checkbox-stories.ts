import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Checkbox } from '../../../shared/components/ui/input/checkbox/checkbox';
import { Story } from '../../story/story';

@Component({
  selector: 'app-checkbox-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Checkbox, Story, FormsModule, ReactiveFormsModule],
  templateUrl: './checkbox-stories.html',
  styleUrl: './checkbox-stories.scss',
})
export class CheckboxStories {
  protected readonly ngModelValue = signal(false);
  protected readonly termsControl = new FormControl(false, [Validators.requiredTrue]);
}
