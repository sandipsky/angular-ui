import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Accordion } from '../../../shared/components/ui/accordion/accordion';
import { AccordionItem } from '../../../shared/components/ui/accordion/accordion-item';
import { Story } from '../../story/story';

@Component({
  selector: 'app-accordion-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Accordion, AccordionItem, Story],
  templateUrl: './accordion-stories.html',
  styleUrl: './accordion-stories.scss',
})
export class AccordionStories {}
