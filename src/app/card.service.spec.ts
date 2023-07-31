import { TestBed } from '@angular/core/testing';

import { CardService } from './card.service';

describe('CardService', () => {
  let service: CardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be edited', () => {
    service.addCard({id:1,title:"t4st",description:"fdfdfdf",priority:{id: 1,color: "#ffbf00", name: "MEDIUM"}})
    expect(service.getCards()).toHaveSize(2);
  });
});
