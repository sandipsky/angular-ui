import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Toggle } from '../../../shared/components/ui/input/toggle/toggle';
import { Story } from '../../story/story';

@Component({
  selector: 'app-toggle-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Toggle, Story, FormsModule, ReactiveFormsModule],
  templateUrl: './toggle-stories.html',
  styleUrl: './toggle-stories.scss',
})
export class ToggleStories {
  protected readonly ngModelValue = signal(true);
  protected readonly notificationsControl = new FormControl(false);
}
