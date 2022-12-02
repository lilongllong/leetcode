const fs = require('fs');

const readFile = (path, callback) => {
    fs.readFile(path, (err, data) => {
        if (err) {
            callback(err, undefined);
        } else {
            const str = data.toString();
            const strs = str.split('\n');
            const result = strs.map(item => {
                return item + item;
            });
            callback(null, result);
        }

        // console.log(err, strs);
    });
}


// fs.readFile = (path, callback) => {

// }