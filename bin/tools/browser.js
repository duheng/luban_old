const open = require('opn')

const openBrowser = (options) => {
  console.log(
    [
      '    ████             █████ ',
      '   ░░███            ░░███   ',
      '    ░███  █████ ████ ░███████   ██████   ████████  ',
      '    ░███ ░░███ ░███  ░███░░███ ░░░░░███ ░░███░░███ ',
      '    ░███  ░███ ░███  ░███ ░███  ███████  ░███ ░███ ',
      '    ░███  ░███ ░███  ░███ ░███ ███░░███  ░███ ░███ ',
      '    █████ ░░████████ ████████ ░░████████ ████ █████',
      '   ░░░░░   ░░░░░░░░ ░░░░░░░░   ░░░░░░░░ ░░░░ ░░░░░ ',
    ].join('\n'),
    '\n\n 🌹  start service at http://' + options.host + ':' + options.port
  )
  console.log('\n\nPlease copy the address and open it in the browser:',    ' http://' + options.host + ':' + options.port+'\n\n')
  //open('http://' + options.host + ':' + options.port, { app: 'google chrome' })
}

module.exports = {
  openBrowser,
}
