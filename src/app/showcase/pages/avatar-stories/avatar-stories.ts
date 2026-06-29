import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Avatar } from '../../../shared/components/ui/avatar/avatar';
import { Story } from '../../story/story';

@Component({
  selector: 'app-avatar-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Avatar, Story],
  templateUrl: './avatar-stories.html',
  styleUrl: './avatar-stories.scss',
})
export class AvatarStories {
  protected readonly avatarImg = 'https://i.pravatar.cc/120?img=5';
}
