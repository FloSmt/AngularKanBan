import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import { CardService } from './card.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {PriorityService} from "./priority.service";
import {StatusService} from "./status.service";
import {Card} from "./card";
import {Status} from "./status";
import {Priority} from "./priority";
import createSpyObj = jasmine.createSpyObj;

fdescribe('CardService', () => {
  let service: CardService;
  let priorityService: jasmine.SpyObj<PriorityService>;
  let statusService: jasmine.SpyObj<StatusService>;

  const mock = {
    get testCard():Card {
      return {id: 1, title: "test", description: "", status: this.testStatus[0], priority: this.testPriority[0], edited: null, created: new Date(Date.now())}
    },

    get testStatus():Status[] {
      return [{id: 0, title: "test-status", color: "#000000", max: 0, limit: false},
        {id: 1, title: "test-status2", color: "#000000", max: 2, limit: true}]
    },

    get testPriority():Priority[] {
      return [{id: 0, color: "#000000", name: "test-priority", sortid: 1},{id: 1, color: "#000000", name: "test-priority", sortid: 1}]
    }
  }

  beforeEach(() => {
    priorityService = createSpyObj("PriorityService", ["getPriority", "getPriorities"]);
    statusService = createSpyObj("StatusService", ["getStatusList"]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CardService,
        {provide: PriorityService, useValue: priorityService},
        {provide: StatusService, useValue: statusService}]});
    service = TestBed.inject(CardService);
    statusService.getStatusList.and.returnValue(mock.testStatus);
    priorityService.getPriorities.and.returnValue(mock.testPriority);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add card', () => {
    service.addCard("t4st","test")
    expect(service.getCards()).toHaveSize(1);
  });

  it('should update card', () => {
    service.addCard("title", "description");
    service.setCard(mock.testCard);

    expect(service.getCards()[0].title).toEqual(mock.testCard.title);
    expect(service.getCards()[0].description).toEqual(mock.testCard.description);

  });

  it('should edit Status of a Card', () => {
    service.addCard(mock.testCard.title, mock.testCard.description);



    expect(service.getCards()[0].title).toEqual(mock.testCard.title);
    expect(service.getCards()[0].priority).toEqual(priorityService.getPriority(-1));
  });
});
