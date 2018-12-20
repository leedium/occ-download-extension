# occ-download-extensions
Helper to download installed [Oracle Commerce Cloud](https://cloud.oracle.com/en_US/commerce-cloud "Oracle Commerce Cloud") extensions to their associated zipfiles.

This tool will authenticate with OCC, get the list of installed extensions, and dowload each one to the immediate folder.


#installation
```
$ npm i -g
```

### Options
```
Usage: ode [options]

Tool to download all extensions from an OCC instance

Options:
  -V, --version                       output the version number
  -s, --sourceserver <sourceserver>   Occ Admin url for source instance
  -k, --sourcekey <sourcekey>         Occ Admin api key for source instance
  -h, --help                          output usage information
```


### Realated
OCC Environment Variables Transfer - [occ-env-vars](https://github.com/leedium/occ-env-vars "OCC Environment Variables Add/Update")
OCC Migration Tool (diffs) - [occ-instance-migrator](https://github.com/leedium/occ-instance-migrator "OCC instance migrator")
OCC SSE Starter - [occ-sse-starter](https://github.com/leedium/occ-sse-starter "Serverside extension starter for Oracle Commerce Cloud")
Standalone React components in your current UI - [occ-react-component](https://github.com/leedium/occ-react-component "OCC react component")


<br/><br/><br/>
### Disclaimer of Warranty.

  THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY
APPLICABLE LAW.  EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT
HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY
OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
PURPOSE.  THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM
IS WITH YOU.  SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF
ALL NECESSARY SERVICING, REPAIR OR CORRECTION.


