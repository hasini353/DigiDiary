const https = require('https');
https.get('https://digi-diary-j6azmeian-hasini353s-projects.vercel.app/', (res) => {
  let html = '';
  res.on('data', d => html += d);
  res.on('end', () => {
    const match = html.match(/assets\/index-[a-zA-Z0-9]+\.js/);
    if (match) {
      console.log("Found JS file:", match[0]);
      https.get('https://digi-diary-j6azmeian-hasini353s-projects.vercel.app/' + match[0], (res2) => {
        let js = '';
        res2.on('data', d => js += d);
        res2.on('end', () => {
          if (js.includes('http://localhost:5000')) {
            console.log('LOCALHOST FOUND IN COMPILED JS!');
          } else {
            console.log('NO LOCALHOST FOUND.');
          }
        });
      });
    } else {
      console.log("Could not find JS file in HTML.");
    }
  });
});
