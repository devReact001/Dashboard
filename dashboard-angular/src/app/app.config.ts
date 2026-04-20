import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { FormsModule } from '@angular/forms';

// ✅ NEW IMPORTS
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    // forms (already correct)
    importProvidersFrom(FormsModule),

    // ✅ ADD THIS (IMPORTANT)
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
  ],
};