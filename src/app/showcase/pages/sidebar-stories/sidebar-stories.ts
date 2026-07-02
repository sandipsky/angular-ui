import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Story } from '../../story/story';

@Component({
  selector: 'app-sidebar-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Story, RouterLink],
  templateUrl: './sidebar-stories.html',
  styleUrl: './sidebar-stories.scss',
})
export class SidebarStories {}
