import { IMiddleware, HttpPick, HTTP_PARAM_LOCATION, useRedis } from '@mohism/core';
import { Logger, Dict } from '@mohism/utils';
import { ErrSecretNotMatch } from '../errors/index';

const logger = Logger();

class Auth implements IMiddleware {
  name(): string {
    return 'auth';
  }
  params() {
    return {
      name: HttpPick('token')
        .in(HTTP_PARAM_LOCATION.HEADERS)
        .string()
        .required(),
    };
  }

  async run(params: Dict<any>) {
    logger.info('auth');
    const redis = useRedis('default');
    const secret = await redis.get('secret');

    if (secret !== params.name) {
      throw ErrSecretNotMatch;
    }
  }
}

export default new Auth();