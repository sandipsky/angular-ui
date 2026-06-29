import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Button } from '../../../shared/components/ui/button/button';
import { LoadingSpinner } from '../../../shared/components/ui/loading-spinner/loading-spinner';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { Story } from '../../story/story';

@Component({
  selector: 'app-loading-spinner-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, LoadingSpinner, Story],
  templateUrl: './loading-spinner-stories.html',
  styleUrl: './loading-spinner-stories.scss',
})
export class LoadingSpinnerStories {
  private readonly _spinner = inject(SpinnerService);

  protected demo(ms = 1500): void {
    this._spinner.show();
    setTimeout(() => this._spinner.hide(), ms);
  }
}
