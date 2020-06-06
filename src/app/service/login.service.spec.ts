import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('LoginService', () => {
  let httpTestingController: HttpTestingController;
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(LoginService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returned Observable should match the right data', () => {
    service.googleLogin().subscribe((data)=> {
        expect(data !== null).toEqual(true);
    });
    const req = httpTestingController.expectOne('http://localhost:4200/api/restricted');
    expect(req.request.method).toEqual('GET');
  });

  it('returned Observable should match the right email for a user', () => {
    service.searchEmail("abc@gmail.com").subscribe((data)=> {
        expect(data !== null).toEqual(true);
    });
    const req = httpTestingController.expectOne('http://localhost:4200/api/user/abc@gmail.com');
    expect(req.request.method).toEqual('GET');
  });

  it('returned Observable should match the right data to add user', () => {
    const user: any = {};
    service.addUser(user).subscribe((data)=> {
        expect(data !== null).toEqual(true);
    });
    const req = httpTestingController.expectOne('http://localhost:4200/api/user/add');
    expect(req.request.method).toEqual('PUT');
  });

  it('returned Observable should match login credentials', () => {
    const user: any = {};
    service.basicAuth("", "").subscribe((data)=> {
        expect(data !== null).toEqual(true);
    });
    const req = httpTestingController.expectOne('http://localhost:4200/api/user/login');
    expect(req.request.method).toEqual('GET');
  });
});
