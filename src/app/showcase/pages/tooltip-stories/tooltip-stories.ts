import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from '../../../shared/components/ui/button/button';
import { TooltipDirective } from '../../../shared/components/ui/tooltip/tooltip.directive';
import { Story } from '../../story/story';

@Component({
  selector: 'app-tooltip-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TooltipDirective, Story, Button],
  templateUrl: './tooltip-stories.html',
  styleUrl: './tooltip-stories.scss',
})
export class TooltipStories {}
