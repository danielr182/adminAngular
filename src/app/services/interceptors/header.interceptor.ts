import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authToken = localStorage.getItem('token') || '';

  // Clone the request and add the authorization header
  const authReq = req.clone({
    setHeaders: {
      'x-token': authToken,
    },
  });

  // Pass the cloned request with the updated header to the next handler
  return next(authReq);
};
