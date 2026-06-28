import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select } from '../../../shared/components/ui/input/select/select';
import { Story } from '../../story/story';

interface User {
  id: number;
  name: string;
  team: string;
  disabled?: boolean;
}

const ALL_USERS: User[] = [
  { id: 1, name: 'Jack', team: 'Design' },
  { id: 2, name: 'Lucy', team: 'Design' },
  { id: 3, name: 'Yiminghe', team: 'Engineering' },
  { id: 4, name: 'Aarav', team: 'Engineering' },
  { id: 5, name: 'Mei', team: 'Engineering' },
  { id: 6, name: 'Diego', team: 'Product' },
  { id: 7, name: 'Sofia', team: 'Product' },
  { id: 8, name: 'Omar', team: 'Product', disabled: true },
];

@Component({
  selector: 'app-select-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Select, Story, FormsModule, ReactiveFormsModule],
  templateUrl: './select-stories.html',
  styleUrl: './select-stories.scss',
})
export class SelectStories {
  protected readonly fruits = ['Apple', 'Banana', 'Cherry', 'Mango', 'Pineapple'];
  protected readonly users = ALL_USERS;

  protected readonly fruit = signal<string | null>('Banana');
  protected readonly userId = signal<number | null>(2);
  protected readonly searchableUserId = signal<number | null>(null);
  protected readonly groupedUserId = signal<number | null>(null);
  protected readonly cityId = signal<number | null>(null);

  /** Reactive form control with a required validator for the validation demo. */
  protected readonly countryControl = new FormControl<string | null>(null, [Validators.required]);

  /** Large list to demonstrate the virtual scroller. */
  protected readonly cities = Array.from({ length: 5000 }, (_, i) => ({
    id: i,
    label: `City #${i + 1}`,
  }));

  // --- Async search simulation ---

  protected readonly remoteUsers = signal<User[]>([]);
  protected readonly loadingRemote = signal(false);
  protected readonly remoteUserId = signal<number | null>(null);
  private _searchTimer: ReturnType<typeof setTimeout> | undefined;

  protected onRemoteSearch(term: string): void {
    clearTimeout(this._searchTimer);
    const query = term.trim().toLowerCase();
    if (!query) {
      this.remoteUsers.set([]);
      this.loadingRemote.set(false);
      return;
    }

    this.loadingRemote.set(true);
    // Stand-in for an HTTP call — debounced, then resolves with matches.
    this._searchTimer = setTimeout(() => {
      this.remoteUsers.set(ALL_USERS.filter((u) => u.name.toLowerCase().includes(query)));
      this.loadingRemote.set(false);
    }, 600);
  }
}
