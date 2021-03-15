import { HttpApplication, HttpConf } from '@mohism/core';
import { get } from '@mohism/core';

const httpConf: HttpConf = get('http');

const app: HttpApplication = new HttpApplication(httpConf, __dirname);

app.bootstrap();





