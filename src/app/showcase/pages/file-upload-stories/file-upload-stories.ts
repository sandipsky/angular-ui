import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import {
  FileUpload,
  UploadFile,
} from '../../../shared/components/ui/file-upload/file-upload';
import { Story } from '../../story/story';

@Component({
  selector: 'app-file-upload-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FileUpload, Story],
  templateUrl: './file-upload-stories.html',
  styleUrl: './file-upload-stories.scss',
})
export class FileUploadStories {
  private readonly _timers = new Set<ReturnType<typeof setInterval>>();

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this._timers.forEach((t) => clearInterval(t));
      this._timers.clear();
    });
  }

  /** Fake an upload so the progress bars animate to completion. */
  protected simulate(files: UploadFile[], uploader: FileUpload): void {
    for (const item of files) {
      uploader.patchFile(item.id, { status: 'uploading', progress: 0 });
      let progress = 0;
      const timer = setInterval(() => {
        progress += Math.round(8 + progress / 8);
        if (progress >= 100) {
          clearInterval(timer);
          this._timers.delete(timer);
          uploader.patchFile(item.id, { status: 'success', progress: 100 });
        } else {
          uploader.patchFile(item.id, { progress });
        }
      }, 220);
      this._timers.add(timer);
    }
  }
}
