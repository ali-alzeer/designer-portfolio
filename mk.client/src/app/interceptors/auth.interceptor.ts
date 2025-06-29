import { HttpInterceptorFn } from '@angular/common/http';
import { inject, Optional } from '@angular/core';
import { AdminStore } from '../stores/adminstore';
import { timeout } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let token: string | undefined = undefined;

  const adminFromStorage = localStorage.getItem('admin');
  if (adminFromStorage !== null) {
    const admin = JSON.parse(adminFromStorage);
    if (admin.token !== undefined) {
      token = admin.token;
    }
  }

  const skipUrls = ['/api/Auth/validate-token'];
  const MediaUrl = ['/api/Media'];
  // Check if the current URL matches any of the skip URLs
  if (skipUrls.some((url) => req.url.includes(url))) {
    // Skip the interceptor for this request
    return next(req);
  } else {
    if (token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });

      return next(authReq);
    } else {
      return next(req);
    }
  }
};
