import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ChildDto, DataDto } from '../../../shared';
import { HomeSelectors, HomeState } from '../../state-management';
import { DataTableComponent, THROTTLE_TIME } from './data-table.component';

const ADDITIONAL_IDS: string[] = ['13'];
const DATA_LIST: DataDto[] = [
  new DataDto('1', 5, 10.12, 'rgb(255, 228, 196)', new ChildDto('2', 'rgb(245, 123, 165)')),
];

describe('DataTableComponent', () => {
  let fixture: ComponentFixture<DataTableComponent>;
  let component: DataTableComponent;
  let componentElement: HTMLElement;
  let store: MockStore<HomeState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DataTableComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: HomeSelectors.GetDataListSelector, value: DATA_LIST },
            { selector: HomeSelectors.GetAdditionalIdsSelector, value: [] },
          ],
        }),
      ],
    });
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    componentElement = fixture.nativeElement;
    store = TestBed.inject(MockStore);
  });

  it('should create the DataTableComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render rows equal to the length of data list', () => {
    fixture.detectChanges();
    const rows: NodeListOf<Element> = componentElement.querySelectorAll('#main-table > tbody > tr');
    expect(rows.length).toBe(DATA_LIST.length);
  });

  it('should render id, int, float, and color columns correctly', () => {
    fixture.detectChanges();
    const firstRow: HTMLTableRowElement = componentElement.querySelector('#main-table > tbody > tr')!;
    expect(firstRow.children[0].textContent!.trim()).toBe(DATA_LIST[0].id);
    expect(firstRow.children[1].textContent!.trim()).toBe(DATA_LIST[0].int.toString());
    expect(firstRow.children[2].textContent!.trim()).toBe(DATA_LIST[0].float.toString());
    expect(firstRow.children[3].textContent!.trim()).toBe(DATA_LIST[0].color);
  });

  it('should render nested child table with id and color', () => {
    fixture.detectChanges();
    const nestedTable: HTMLTableElement = componentElement.querySelector(
      '#main-table > tbody > tr .table'
    ) as HTMLTableElement;
    expect(nestedTable).toBeTruthy();
    expect(nestedTable.querySelector('tbody > tr > th')!.textContent!.trim()).toBe(DATA_LIST[0].child.id);
    expect(nestedTable.querySelector('tbody > tr > td')!.textContent!.trim()).toBe(DATA_LIST[0].child.color);
  });

  it('should apply correct background color to color labels in main table', () => {
    fixture.detectChanges();
    const colorLabel: HTMLSpanElement = componentElement.querySelector(
      '#main-table > tbody > tr > td > .label-color'
    ) as HTMLSpanElement;
    expect(colorLabel.style.backgroundColor).toBe(DATA_LIST[0].color);
  });

  it('should apply correct background color to color labels in child table', () => {
    fixture.detectChanges();
    const colorLabel: HTMLSpanElement = componentElement.querySelector(
      '#main-table .table .label-color'
    ) as HTMLSpanElement;
    expect(colorLabel.style.backgroundColor).toBe(DATA_LIST[0].child.color);
  });

  it('should update additionalIds when additionalIds$ emits new values', () => {
    component.ngOnInit();
    store.overrideSelector(HomeSelectors.GetAdditionalIdsSelector, ADDITIONAL_IDS);
    store.refreshState();
    fixture.detectChanges();
    expect(component.additionalIds).toEqual(ADDITIONAL_IDS);
  });

  it('should display additionalIds when available', () => {
    store.overrideSelector(HomeSelectors.GetAdditionalIdsSelector, ADDITIONAL_IDS);
    store.refreshState();
    fixture.detectChanges();
    const firstRowId: string = componentElement
      .querySelector('#main-table > tbody > tr > th')!
      .textContent!.trim();
    expect(firstRowId).toBe(ADDITIONAL_IDS[0]);
  });

  it('should return correct id for trackById', () => {
    const dataDto: DataDto = new DataDto('1', 5, 10.12, '#ea23aa', new ChildDto('2', 'rgb(245, 123, 165)'));
    expect(component.trackById(0, dataDto)).toBe('1');
  });

  it('should handle no data scenario gracefully', () => {
    store.overrideSelector(HomeSelectors.GetDataListSelector, []);
    store.refreshState();
    fixture.detectChanges();
    const rows: NodeListOf<Element> = componentElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(0);
  });

  it('should throttle and allow distinct values for dataList$', fakeAsync(() => {
    const dataListSpy: jasmine.Spy<jasmine.Func> = jasmine.createSpy('dataListSpy');
    component.dataList$.subscribe(dataListSpy);

    // Emit two same values with a delay less than throttleTime
    store.overrideSelector(HomeSelectors.GetDataListSelector, DATA_LIST);
    store.refreshState();
    tick(THROTTLE_TIME / 2);
    store.refreshState();
    tick(THROTTLE_TIME);

    expect(dataListSpy).toHaveBeenCalledTimes(1);

    // Emit a new distinct value
    const newDataList = [
      ...DATA_LIST,
      new DataDto('3', 7, 11.12, '#123456', new ChildDto('4', 'rgb(111, 222, 333)')),
    ];
    store.overrideSelector(HomeSelectors.GetDataListSelector, newDataList);
    store.refreshState();
    tick(THROTTLE_TIME);

    expect(dataListSpy).toHaveBeenCalledTimes(2);
    expect(dataListSpy).toHaveBeenCalledWith(newDataList);
  }));
});
