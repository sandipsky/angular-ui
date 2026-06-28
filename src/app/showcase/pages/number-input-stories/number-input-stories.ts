import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NumberInput } from '../../../shared/components/ui/input/number-input/number-input';
import { Story } from '../../story/story';

@Component({
  selector: 'app-number-input-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NumberInput, Story, FormsModule, ReactiveFormsModule],
  templateUrl: './number-input-stories.html',
  styleUrl: './number-input-stories.scss',
})
export class NumberInputStories {
  protected readonly quantity = signal<number | null>(1234567.891);
  protected readonly amount = signal<number | null>(1234567);
  protected readonly priceControl = new FormControl<number | null>(null, [Validators.required]);
}
