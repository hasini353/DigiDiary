const https = require('https');
https.get('https://digi-diary-j6azmeian-hasini353s-projects.vercel.app/', (res) => {
  let html = '';
  res.on('data', d => html += d);
  res.on('end', () => {
    const match = html.match(/assets\/index-[a-zA-Z0-9]+\.js/);
    if (match) {
      https.get('https://digi-diary-j6azmeian-hasini353s-projects.vercel.app/' + match[0], (res2) => {
        let js = '';
        res2.on('data', d => js += d);
        res2.on('end', () => {
          const idx = js.indexOf('http://localhost:5000');
          if (idx !== -1) {
            console.log(js.substring(idx - 100, idx + 100));
          }
        });
      });
    }
  });
});
