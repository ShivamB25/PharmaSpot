const fs = require('fs')
const path = require('path')
const glob = require('glob')
module.exports = {
  packagerConfig: {
    icon:'assets/images/icon.ico',
    setupIcon: 'assets/images/icon.ico',
    asar:true,
    ignore:[
      'gulpfile\.js',
      '\.git.*',
      'TODO',
      'notes\.txt',
      'forge\.config\.js'
      ]
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-zip'
    },
    // {
    //   name: '@electron-forge/maker-squirrel',
    //   config: {
    //     // certificateFile: './cert.pfx',
    //     // certificatePassword: process.env.CERTIFICATE_PASSWORD
    //   },
    // },
    // {
    //   name: '@electron-forge/maker-zip',
    //   platforms: ['darwin'],
    // },
    // {
    //   name: '@electron-forge/maker-deb',
    //   config: {},
    // },
    // {
    //   name: '@electron-forge/maker-rpm',
    //   config: {},
    // },
  ],

      "publishers": [
        {
          "name": "@electron-forge/publisher-github",
          "config": {
            "repository": {
              "owner": "drkNsubuga",
              "name": "PharmaSpot",
              "draft": true
            }
          }
        }
      ],
      //fix the 
      hooks: {
        packageAfterPrune(config, buildPath) {
          if (process.platform === 'linux') {
            const dirs = glob.sync(
              path.join(buildPath, 'node_modules/**/node_gyp_bins'),
              {
                onlyDirectories: true,
              }
            );
    
            for (const directory of dirs) {
              fs.rmdirSync(directory, { recursive: true, force: true });
            }
          }
        },
      },
};