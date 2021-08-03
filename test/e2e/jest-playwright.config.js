const browsers = (process.env.BROWSERS || 'chromium').split(',');

module.exports = {
  serverOptions: {
    command: `npm run start -- --config-server-port 10002`,
    port: 10002,
    protocol: 'http',
    launchTimeout: 60000,
    debug: true,
    usedPortAction: 'ignore',
  },
  launchOptions: {
    headless: process.env.HEADLESS !== 'false',
    slowMo: process.env.SLOWMO ? process.env.SLOWMO : 0,
  },
  launchType: 'LAUNCH',
  contextOptions: {
    viewport: {
      width: 800,
      height: 600,
    },
  },
  browsers: browsers,
};
