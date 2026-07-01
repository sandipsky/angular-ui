import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from '../../../shared/components/ui/button/button';
import { OtpInput } from '../../../shared/components/ui/input/otp-input/otp-input';
import { Story } from '../../story/story';

@Component({
  selector: 'app-otp-input-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OtpInput, Story, Button, FormsModule],
  templateUrl: './otp-input-stories.html',
  styleUrl: './otp-input-stories.scss',
})
export class OtpInputStories {
  protected readonly code = signal('');
  protected readonly pin = signal('');
  protected readonly sized = signal('');

  // Show / hide toggle demo — bind `mask` to a signal.
  protected readonly secret = signal('');
  protected readonly masked = signal(true);

  protected toggleMask(): void {
    this.masked.update((m) => !m);
  }

  protected readonly lastCompleted = signal('');
  protected onCompleted(value: string): void {
    this.lastCompleted.set(value);
  }
}
