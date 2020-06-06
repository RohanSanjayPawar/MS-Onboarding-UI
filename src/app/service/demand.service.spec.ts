import { TestBed } from '@angular/core/testing';

import { DemandService } from './demand.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('DemandService', () => {
  let httpTestingController: HttpTestingController;
  let service: DemandService;
  const onboardee =  {
    uid: 0,
    demandUid: 0,
    firstName: "",
    lastName: "",
    webLoginId: "",
    skillSet: [],
    status: "",
    demandId: 0,
    backgroundCheckStatus: "",
    etaForOnboarding: 0,
    experience: 0,
    joiningLocation: "",
    hiringManager: ""
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DemandService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(DemandService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returned Observable should match the right data', () => {
    service.getDemands().subscribe((data)=> {
        expect(data.length >= 0).toEqual(true);
    });
    const req = httpTestingController.expectOne('http://localhost:4200/api/demand/');
    expect(req.request.method).toEqual('GET');
  });

  it('returned Observable should match right demands for uid 1', () => {
    service.getAllDemands(1).subscribe((data)=> {
        expect(data.length >= 0).toEqual(true);
    });
    const req = httpTestingController.expectOne('http://localhost:4200/api/demand/1');
    expect(req.request.method).toEqual('GET');
  });

  it('returned Observable should match right demands for filter', () => {
    service.filterDemands(1, onboardee).subscribe((data)=> {
        expect(data.length >= 0).toEqual(true);
    });
    const req = httpTestingController.expectOne('http://localhost:4200/api/demand/1');
    expect(req.request.method).toEqual('PUT');
  });

  it('returned Observable should match right demands for update', () => {
    service.updateDemands(1).subscribe((data)=> {
        expect(data !== null).toEqual(true);
    });
    const req = httpTestingController.expectOne('http://localhost:4200/api/demand/update/1');
    expect(req.request.method).toEqual('PUT');
  });

  it('returned Observable should match right demands for uid fetching', () => {
    service.fetchDemandForUID(1).subscribe((data)=> {
        expect(data.length >= 0).toEqual(true);
    });
    const req = httpTestingController.expectOne('http://localhost:4200/api/demand/get/1');
    expect(req.request.method).toEqual('GET');
  });
});
