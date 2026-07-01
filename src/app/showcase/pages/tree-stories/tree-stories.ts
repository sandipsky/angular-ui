import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Button } from '../../../shared/components/ui/button/button';
import { Tree, TreeNode } from '../../../shared/components/ui/tree/tree';
import { Story } from '../../story/story';

@Component({
  selector: 'app-tree-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Tree, Story, Button],
  templateUrl: './tree-stories.html',
  styleUrl: './tree-stories.scss',
})
export class TreeStories {
  protected readonly files: TreeNode[] = [
    {
      key: 'src',
      label: 'src',
      icon: '📁',
      children: [
        {
          key: 'app',
          label: 'app',
          icon: '📁',
          children: [
            { key: 'app.ts', label: 'app.ts', icon: '📄' },
            { key: 'app.html', label: 'app.html', icon: '📄' },
            { key: 'app.scss', label: 'app.scss', icon: '🎨' },
          ],
        },
        {
          key: 'shared',
          label: 'shared',
          icon: '📁',
          children: [
            { key: 'button', label: 'button.ts', icon: '📄' },
            { key: 'tree', label: 'tree.ts', icon: '📄' },
          ],
        },
        { key: 'main.ts', label: 'main.ts', icon: '📄' },
      ],
    },
    {
      key: 'root-files',
      label: 'config',
      icon: '📁',
      children: [
        { key: 'pkg', label: 'package.json', icon: '📦' },
        { key: 'tsconfig', label: 'tsconfig.json', icon: '⚙️' },
      ],
    },
  ];

  protected readonly comments: TreeNode[] = [
    {
      key: 'c1',
      label: 'Diplodocus — Nope, not buying it.',
      children: [
        {
          key: 'c1-1',
          label: 'malachai — SOPHISTRY. This is the crux of the issue.',
          children: [
            { key: 'c1-1-1', label: 'user_42 — Say more?' },
            { key: 'c1-1-2', label: 'quietStorm — Agreed, well put.' },
          ],
        },
        { key: 'c1-2', label: 'anon — 1 more reply' },
      ],
    },
    {
      key: 'c2',
      label: 'greenTea — Actually the docs cover this.',
      children: [{ key: 'c2-1', label: 'devlin — Link please!' }],
    },
  ];

  protected readonly permissions: TreeNode[] = [
    {
      key: 'billing',
      label: 'Billing',
      children: [
        { key: 'billing.view', label: 'View invoices' },
        { key: 'billing.edit', label: 'Edit payment methods' },
        { key: 'billing.refund', label: 'Issue refunds', disabled: true },
      ],
    },
    {
      key: 'team',
      label: 'Team',
      children: [
        { key: 'team.invite', label: 'Invite members' },
        { key: 'team.remove', label: 'Remove members' },
      ],
    },
  ];

  protected readonly filesExpanded = signal<string[]>(['src', 'app']);
  protected readonly commentsExpanded = signal<string[]>(['c1', 'c1-1']);
  protected readonly checked = signal<string[]>(['billing.view']);
}
