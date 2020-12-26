import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {AirIndexDto} from '../../models/dtos/air-index.dto';
import {AirIndexLevelDto} from '../../models/dtos/air-index-level.dto';
import {ConfigurationService} from '../../services/configuration.service';
import { Observable } from 'rxjs';


export interface AirIndexTableData extends AirIndexLevelDto {
  indexName: string;
}

@Component({
  selector: 'app-details-card',
  templateUrl: './details-card.component.html',
  styleUrls: ['./details-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsCardComponent {

  @Input()
  get airIndex(): AirIndexDto | undefined {
    return this._indexData;
  }

  set airIndex(indexData: AirIndexDto | undefined) {
    this._indexData = indexData;
    this.tableData = this._setupTableData(indexData);
  }

  constructor(configurationService: ConfigurationService) {
   this.langKey$ = configurationService.languageKey$;
  }

  readonly langKey$: Observable<string>;
  readonly displayedColumns: string[] = ['indexName', 'indexDate', 'indexValue'];
  tableData: AirIndexTableData[] = [];

  private _indexData?: AirIndexDto;

  private _setupTableData(airIndexData?: AirIndexDto): AirIndexTableData[] {
    return !!airIndexData ? [
      {...airIndexData.co, indexName: 'co'},
      {...airIndexData.benzene, indexName: 'benzene'},
      {...airIndexData.nO2, indexName: 'no2'},
      {...airIndexData.o3, indexName: 'o3'},
      {...airIndexData.sO2, indexName: 'so2'},
      {...airIndexData.pM10, indexName: 'pm 1.0'},
      {...airIndexData.pM25, indexName: 'pm2.5'},
    ] : [];
  }
}
