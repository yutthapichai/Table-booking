import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthBasicGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // console.log('Check guards request', request);

    // check for basic auth header
    if (
      !request.headers.authorization ||
      request.headers.authorization.indexOf('Basic ') === -1
    ) {
      return false;
    }

    // verify auth credentials
    const base64Credentials = request.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString(
      'ascii',
    );
    const [username, password] = credentials.split(':');
    const user = this.validateBasicAuth(username, password);
    if (!user) {
      return false;
    }
    return true;
  }

  validateBasicAuth(username: string, password: string) {
    if (username == 'admin' && password == 'yut') {
      return true;
    }
    return false;
  }
}
