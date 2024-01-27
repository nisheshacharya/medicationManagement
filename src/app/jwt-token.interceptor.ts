import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
export const jwtTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const jwt = authService.user_signal().jwt;
  if (jwt) {
    const request = req.clone({
      setHeaders: { Authorization: 'Bearer ' + jwt },
    });
    return next(request);
  } else {
    return next(req);
  }
};
