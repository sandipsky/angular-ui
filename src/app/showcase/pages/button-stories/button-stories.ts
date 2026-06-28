import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from '../../../shared/components/ui/button/button';
import { Story } from '../../story/story';

@Component({
  selector: 'app-button-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Story],
  templateUrl: './button-stories.html',
  styleUrl: './button-stories.scss',
})
export class ButtonStories {}
