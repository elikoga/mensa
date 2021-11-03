// make http request with node

// to https://studierendenwerk-pb.de/fileadmin/shareddata/access2.php?id=ostermann-gjhkz564

import https from 'https';
import { parse } from 'url';
// for saving
import fs from 'fs';

const get = async () => {
  https.get('https://studierendenwerk-pb.de/fileadmin/shareddata/access2.php?id=ostermann-gjhkz564', (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log(data);

      // parse json
      const json = JSON.parse(data);
      console.log(json);

      // create data folder if not exists
      if (!fs.existsSync('data')) {
        fs.mkdirSync('data');
      }

      // save json to file
      // filename has date
      const filename = `data/${new Date().toISOString()}.json`;
      fs.writeFile(filename, JSON.stringify(json), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Saved to ${filename}`);
        }
      });
    });
  });
  // repeat every hour
  setTimeout(get, 1000 * 60 * 60);
};

// repeat get every hour
get();

