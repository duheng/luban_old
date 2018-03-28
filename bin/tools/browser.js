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

  open('http://' + options.host + ':' + options.port, { app: 'google chrome' })
}

module.exports = {
  openBrowser,
}
