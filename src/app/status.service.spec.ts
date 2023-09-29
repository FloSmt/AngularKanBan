import { TestBed } from '@angular/core/testing';

import { StatusService } from './status.service';
import {DataService} from "./db.service";
import createSpyObj = jasmine.createSpyObj;
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Status} from "./status";
import {of} from "rxjs";

describe('StatusService', () => {
  let service: StatusService;
  let dbService: jasmine.SpyObj<DataService>;

  const mock =  {
    get testStatus():Status {
      return {
        id: 0,
        color: "#000000",
        title: "Test Title",
        limit: false,
        max: 0
      };
    }
  }

  beforeEach(() => {
    dbService = createSpyObj("DataService", ["getStatusFromDb"]);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StatusService, {provide: DataService, useValue: dbService}]});
    service = TestBed.inject(StatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get default Status', () => {
    expect(service.getStatus(-111)).toEqual(service.default);
    expect(service.getStatus(99)).toEqual(service.default);
  });

  it('should get right Status', () => {

    service.setStatus(mock.testStatus);

    expect(service.getStatus(mock.testStatus.id)).toEqual(mock.testStatus);
  });

  it('should load Status from Db', (done) => {
    dbService.getStatusFromDb.and.returnValue(of([
      {
        id: 0,
        color: "#ffffff",
        title: "Status1",
        limit: false,
        max: 0
      },
      {
        id: 1,
        color: "#ffffff",
        title: "Status2",
        limit: true,
        max: 3
      }]));

    const setStatusSpy = spyOn(service, "setStatus");

    service.loadStatusFromDb().subscribe((data) =>{
      expect(data).toEqual(data);
      expect(service.isStatusLoading).toBeFalse();
      expect(setStatusSpy).toHaveBeenCalled();
      done();
    })
  });
});
