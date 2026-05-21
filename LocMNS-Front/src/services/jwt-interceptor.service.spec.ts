import { TestBed } from '@angular/core/testing';
import { jwtInterceptorService } from './jwt-interceptor.service';
import { HttpInterceptorFn } from '@angular/common/http';

describe('jwtInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => jwtInterceptorService(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
