#!/usr/bin/env node

/*
 * Copyright (c) 2018 LEEDIUM.
 * This file is subject to the terms and conditions
 * defined in file 'LICENSE.txt', which is part of this
 * source code package.
 */

/**
 * @project occ-download-extension
 * @file index.js
 * @company LEEDIUM
 * @createdBy davidlee
 * @contact david@leedium.com
 * @dateUpdated 12/12/2018
 * @description  Downloads an extension to a zip file;
 */


const program = require('commander');
const axios = require('axios');
const fs = require('fs');

const occTokenGenerator = require('./occ-token-generator');
const packageJSON = require('./package');

let counter = 0;

Promise.each = (arr, func) => {
    return arr.reduce((a, item) => {
        return a.then(() => {
            return func(item);
        })
    }, Promise.resolve())
};

const main = () => {
    program
        .version(packageJSON.version)
        .description(packageJSON.description)
        .option(
            "-s, --sourceserver <sourceserver> ",
            "Occ Admin url for source instance (from)"
        )
        .option(
            "-k, --sourcekey <sourcekey>",
            "Occ Admin api key for source instance (from)"
        ).parse(process.argv);


    /**
     * Starts the task
     * Login and get an access_token, then request the zip and pipe a file
     * @returns {Promise<void>}
     */
    const start = async () => {
        try {
            const token = await occTokenGenerator.generateToken(program.sourceserver, program.sourcekey);
            const result = await axios(
                {
                    "method": "GET",
                    "url": `${program.sourceserver}/ccadmin/v1/extensions?fields=items.name,items.zipPath`,
                    "responseType": "arrayBuffer",
                    "headers": {
                        "Authorization": `Bearer ${token}`,
                        "X-CCAsset-Language": "en"
                    }
                });

            const {items} = result.data;

            Promise.each(result.data.items, (item) =>
                new Promise(async (resolve, reject) => {
                    try {
                        const {data} = await axios(
                            {
                                "method": "GET",
                                "url": `${program.sourceserver}/file/${encodeURIComponent(item.zipPath)}`,
                                "responseType": "arraybuffer",
                                "headers": {
                                    "Authorization": `Bearer ${token}`,
                                    "X-CCAsset-Language": "en"
                                }
                            });
                        const fileStream = fs.createWriteStream(`${item.name.replace(/\//g, '%2F')}.zip`);
                        fileStream.on('finish', () => {
                            console.log(`${item.name} download complete. - ${++counter}/${items.length}`);
                            resolve();
                        });
                        fileStream.write(data, 'binary');
                        fileStream.end();
                    } catch (err) {
                        reject();
                    }
                })
            )
        } catch (err) {
            console.log(err.message);
        }
    };

    try {
        if (typeof program.sourceserver === 'undefined') {
            throw new Error('missing sourceserver -s');
        }
        else if (typeof program.sourcekey === 'undefined') {
            throw new Error('missing sourcekey : -k');
        }
        else {
            start();
        }
    } catch (err) {
        console.log(err.message);
    }
};

return main();

