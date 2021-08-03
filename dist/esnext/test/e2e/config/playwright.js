import debugLogger from 'debug';
import 'jest-playwright-preset';
// Allow to get browser console logs
// this is from https://playwright.dev/docs/api/class-page#pageonconsole
// see https://github.com/microsoft/playwright/issues/4498 and https://github.com/microsoft/playwright/issues/4125
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
const browserLog = debugLogger('bv:test:browser');
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
page.on('console', (msg) => browserLog('<%s> %s', msg.type(), msg.text()));
