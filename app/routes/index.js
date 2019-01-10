const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const lsdir = fs.readdirSync(__dirname);

lsdir.forEach(function(fileOrDirectory) {

    var mount,
        route,
        lstat,
        abspath = path.join(__dirname, fileOrDirectory);

    if (abspath == __filename) {
        return;
    }

    lstat = fs.lstatSync(abspath);

    if (lstat.isDirectory(abspath)) {
        route = path.join(abspath, 'index.js');
        mount = `/${fileOrDirectory}`;
    } else if (lstat.isFile(abspath) && path.extname(abspath) == '.js') {
        route = abspath;
    }

    if (route) {
        try {
            route = require(route);
            if (mount) {
                console.log(`[*] Mounting ${mount}`);
                router.use(mount, route);
            } else {
                router.use(route);
            }
        } catch (e) {
            console.error(e);
        }
    }
});

module.exports = router;