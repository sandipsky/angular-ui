import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from '../../../shared/components/ui/button/button';
import { Toggle } from '../../../shared/components/ui/input/toggle/toggle';
import {
  NotificationPosition,
  NotificationType,
} from '../../../shared/components/ui/notification/notification.config';
import { NotificationService } from '../../../shared/components/ui/notification/notification.service';
import { Story } from '../../story/story';

const SAMPLES: Record<NotificationType, { title: string; message: string }> = {
  success: { title: 'Changes saved', message: 'Your profile has been updated successfully.' },
  info: { title: 'We notify you that', message: 'You are now obligated to give a star on GitHub.' },
  warn: { title: 'Storage almost full', message: 'You have used 90% of your available space.' },
  error: { title: 'Upload failed', message: 'The file exceeds the 25 MB limit. Try again.' },
};

@Component({
  selector: 'app-notification-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Toggle, Story, FormsModule],
  templateUrl: './notification-stories.html',
  styleUrl: './notification-stories.scss',
})
export class NotificationStories {
  private readonly _notify = inject(NotificationService);

  protected readonly types: NotificationType[] = ['success', 'info', 'warn', 'error'];
  protected readonly positions: NotificationPosition[] = [
    'top',
    'topLeft',
    'topRight',
    'bottom',
    'bottomLeft',
    'bottomRight',
  ];

  protected readonly position = signal<NotificationPosition>('topRight');
  protected readonly pauseOnHover = signal(true);
  protected readonly showProgress = signal(true);
  protected readonly showClose = signal(true);
  protected readonly withIcon = signal(true);
  protected readonly duration = signal(4000);

  protected fire(type: NotificationType): void {
    const sample = SAMPLES[type];
    this._notify.show({
      type,
      title: sample.title,
      message: sample.message,
      position: this.position(),
      pauseOnHover: this.pauseOnHover(),
      showProgress: this.showProgress(),
      showClose: this.showClose(),
      withIcon: this.withIcon(),
      duration: this.duration(),
    });
  }

  protected setPosition(position: NotificationPosition): void {
    this.position.set(position);
  }

  protected clearAll(): void {
    this._notify.clear();
  }
}
