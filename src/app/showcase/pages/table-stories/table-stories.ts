import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { Table, TableColumn, TableSort } from '../../../shared/components/ui/table/table';
import { TableCellDirective } from '../../../shared/components/ui/table/table-cell.directive';
import { Story } from '../../story/story';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  signups: number;
  status: 'success' | 'warn' | 'error';
}

const USERS: User[] = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com', role: 'Admin', signups: 128, status: 'success' },
  { id: 2, name: 'Grace Hopper', email: 'grace@example.com', role: 'Editor', signups: 92, status: 'success' },
  { id: 3, name: 'Alan Turing', email: 'alan@example.com', role: 'Viewer', signups: 45, status: 'warn' },
  { id: 4, name: 'Katherine Johnson', email: 'kj@example.com', role: 'Editor', signups: 210, status: 'success' },
  { id: 5, name: 'Linus Torvalds', email: 'linus@example.com', role: 'Admin', signups: 17, status: 'error' },
  { id: 6, name: 'Margaret Hamilton', email: 'margaret@example.com', role: 'Viewer', signups: 76, status: 'warn' },
];

@Component({
  selector: 'app-table-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Table, TableCellDirective, Story],
  templateUrl: './table-stories.html',
  styleUrl: './table-stories.scss',
})
export class TableStories {
  private readonly _destroyRef = inject(DestroyRef);

  protected readonly columns: TableColumn[] = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role', sortable: true },
    { key: 'signups', header: 'Signups', sortable: true, align: 'right' },
    { key: 'status', header: 'Status', sortable: true, align: 'center' },
  ];

  // ── Local sort ─────────────────────────────────────────────────
  protected readonly localData = USERS;
  protected readonly localSort = signal<TableSort | null>({ key: 'signups', direction: 'desc' });

  protected readonly statusLabel: Record<string, string> = {
    success: 'Active',
    warn: 'Pending',
    error: 'Suspended',
  };

  // ── Server sort (simulated) ────────────────────────────────────
  protected readonly serverData = signal<User[]>([]);
  protected readonly serverSort = signal<TableSort | null>({ key: 'name', direction: 'asc' });
  protected readonly loading = signal(false);
  private _pending: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this._fetch(this.serverSort());
    this._destroyRef.onDestroy(() => this._pending && clearTimeout(this._pending));
  }

  /** Pretend to hit an API: sort on the "server" after a short delay. */
  protected _fetch(sort: TableSort | null): void {
    this.loading.set(true);
    if (this._pending) clearTimeout(this._pending);
    this._pending = setTimeout(() => {
      const rows = [...USERS];
      if (sort) {
        const factor = sort.direction === 'asc' ? 1 : -1;
        rows.sort((a, b) => {
          const av = a[sort.key as keyof User];
          const bv = b[sort.key as keyof User];
          if (av === bv) return 0;
          if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * factor;
          return String(av).localeCompare(String(bv)) * factor;
        });
      }
      this.serverData.set(rows);
      this.loading.set(false);
    }, 700);
  }
}
