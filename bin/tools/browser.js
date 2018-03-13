const execSync    =   require('child_process').execSync;
const  open        =   require('opn');
require('shelljs/global');

try{
  //如果已经有服务则不打开新窗口
    var browserToOpenWith;
    var configFile = ".luban_config";
    var confPath = path.join(os.homedir(), configFile);
    var conf = require(confPath);
    conf.browserToOpenWith && (browserToOpenWith = conf.browserToOpenWith);
}catch(e){
    // console.log(e);
}

function openBrowser(luban) {
    if (process.platform === 'darwin') {
      try {

        // Try our best to reuse existing tab
        // on OS X Google Chrome with AppleScript
        execSync('ps cax | grep "Google Chrome"');
        execSync(
        'osascript chrome.applescript http://' + luban.host + ':' + luban.port + '/',
        {cwd: path.join(__dirname), stdio: 'ignore'}
        );
        return;
      } catch (err) {
        // Ignore errors.
      }
    }

    console.log('🌹  Listening at http://' + luban.host + ':' + luban.port, browserToOpenWith ? ' browser:' + browserToOpenWith : '');

    open('http://' + luban.host + ':' + luban.port, { app: browserToOpenWith || 'google chrome' });
}

module.exports = {
  openBrowser
};
