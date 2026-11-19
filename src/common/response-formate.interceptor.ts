import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map,Observable } from 'rxjs';

@Injectable()
export class ResponseFormateInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(result =>{
        return {
          statusCode:context.switchToHttp().getResponse().statusCode,
          success:true,
          result
        }
      })
    )
  }
}
