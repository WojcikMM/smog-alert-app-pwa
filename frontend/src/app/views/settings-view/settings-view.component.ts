import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {APP_CONSTS} from '../../app.consts';
import {ConfigurationService} from '../../services/configuration.service';
import {ConfigurationModel} from '../../models/configuration.model';

@Component({
  selector: 'app-settings-view',
  templateUrl: './settings-view.component.html',
  styleUrls: ['./settings-view.component.scss']
})
export class SettingsViewComponent {

  settingsForm: FormGroup;
  mainRouteUrl = APP_CONSTS.ROUTES.ROOT;

  constructor(private readonly _configurationService: ConfigurationService) {
    this.settingsForm = this._createForm();
    this._pathForm(_configurationService.getSnapshot());
  }

  private _createForm(): FormGroup {
    return new FormGroup({
      refreshRate: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(999)
      ])
    });
  }

  private _pathForm(model: ConfigurationModel): void {
    this.settingsForm.patchValue({
      refreshRate: model.refreshRate
    });
  }

  onSubmit(): void {
    if (!this.settingsForm.valid) {
      return;
    }

    this._configurationService.setRefreshRate(this.settingsForm.value?.refreshRate);
  }
}
