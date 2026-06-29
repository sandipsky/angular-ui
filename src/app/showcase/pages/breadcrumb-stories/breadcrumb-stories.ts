import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Breadcrumb, BreadcrumbItem } from '../../../shared/components/ui/breadcrumb/breadcrumb';
import { Story } from '../../story/story';

@Component({
  selector: 'app-breadcrumb-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Breadcrumb, Story],
  templateUrl: './breadcrumb-stories.html',
  styleUrl: './breadcrumb-stories.scss',
})
export class BreadcrumbStories {
  protected readonly trail: BreadcrumbItem[] = [
    { label: 'Home', link: '/button' },
    { label: 'Components', link: '/menu' },
    { label: 'Breadcrumb' },
  ];

  protected readonly shortTrail: BreadcrumbItem[] = [
    { label: 'Docs', link: '/button' },
    { label: 'Getting started' },
  ];
}
