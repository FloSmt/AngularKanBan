 import { TestBed } from '@angular/core/testing';

import { PriorityService } from './priority.service';
 import {HttpClientTestingModule} from "@angular/common/http/testing";
 import {DataService} from "./db.service";
 import createSpyObj = jasmine.createSpyObj;
 import {of} from "rxjs";

describe('PriorityService', () => {
  let service: PriorityService;
  let dbService: jasmine.SpyObj<DataService>;

  const mock =  {
    get newPriority() {
      return {
        id: 20,
        sortid: 20,
        color: "#000000",
        name: "New Priority"
      };
    }
  }

  beforeEach(() => {
    dbService = createSpyObj("DataService", ["getPriorityFromDb"]);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PriorityService, {provide: DataService, useValue: dbService}]
    });
    service = TestBed.inject(PriorityService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get default Priority', () => {
    expect(service.getPriority(-111)).toEqual(service.default);
    expect(service.getPriority(99)).toEqual(service.default);
  });

  it('should get right Priority', () => {
    service.setPriorities(mock.newPriority)
    expect(service.getPriority(0).id).toEqual(mock.newPriority.id);
    expect(service.getPriority(0).color).toEqual(mock.newPriority.color);
  });

  it('should set a new Priority into List', () => {
    service.setPriorities(mock.newPriority);

    expect(service.getPriorities()).toContain(mock.newPriority);

  });


  it('should delete a Priority from List', () => {
    service.setPriorities(mock.newPriority);

    expect(service.getPriorities()).toContain(mock.newPriority);

    service.deletePriority(20);

    expect(service.getPriorities()).not.toContain(mock.newPriority);

  });

  it('should load Priority from Db', (done) => {
    dbService.getPriorityFromDb.and.returnValue(of([
      {
      id: 1,
      sortid: 0,
      color: "#000000",
      name: "Test"
    },
      {
        id: 2,
        sortid: 1,
        color: "#100000",
        name: "Test2"
      }
    ]));

    const setPrioritySpy = spyOn(service, "setPriorities");

    service.loadPriorityFromDb().subscribe((data) =>{
      expect(data).toEqual(data);
      expect(service.isPriorityLoading).toBeFalse();
      expect(setPrioritySpy).toHaveBeenCalled();
      done();
    })
  });
});
