import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Tab } from '../../../shared/components/ui/tabs/tab';
import { Tabs } from '../../../shared/components/ui/tabs/tabs';
import { Story } from '../../story/story';

@Component({
  selector: 'app-tabs-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Tabs, Tab, Story],
  templateUrl: './tabs-stories.html',
  styleUrl: './tabs-stories.scss',
})
export class TabsStories {
  protected readonly active = signal<unknown>('profile');
}
