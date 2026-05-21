import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptorService: HttpInterceptorFn = (req, next) => {
  const jwt = localStorage.getItem('jwt');

  if (jwt) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  }

  return next(req);
};
