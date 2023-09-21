import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AbstractComponent } from '../../../../common';
import { HomeState } from '../../state-management';

@Component({
  selector: 'hm-config-panel',
  templateUrl: './config-panel.component.html',
  styleUrls: ['./config-panel.component.scss'],
})
export class ConfigPanelComponent extends AbstractComponent {
  constructor(private store: Store<HomeState>) {
    super();
  }
}
