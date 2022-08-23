const fs = require('fs');
var jsdom = require('jsdom');
var JSDOM = jsdom.JSDOM;
const path = require('path');
const directoryPath = path.join(__dirname, '');
fs.readdir(directoryPath, (err, files) => {
  files = files.filter((x) => x.includes('.html'));
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    fs.readFile(file, 'utf8', function (err, html) {
      const dom = new JSDOM(html);
      let counter = 0;
      dom.window.document.querySelectorAll('img').forEach((imgOld) => {
        if (
          (imgOld.src.includes('.png') || imgOld.src.includes('.jpg')) &&
          imgOld.parentElement.tagName != 'PICTURE'
        ) {
          let srcImgWebp = imgOld.src.split('.');
          srcImgWebp[srcImgWebp.length - 1] = 'webp';
          srcImgWebp = srcImgWebp.join('.');
          const picture = dom.window.document.createElement('picture');
          const source = dom.window.document.createElement('source');
          const img = dom.window.document.createElement('img');

          source.setAttribute('srcset', srcImgWebp);
          img.setAttribute('src', imgOld.src);
          img.setAttribute('title', imgOld.title);
          img.setAttribute('alt', imgOld.alt);
          img.setAttribute('loading', 'lazy');
          picture.appendChild(source);
          picture.appendChild(img);
          imgOld.parentNode.insertBefore(picture, imgOld);
          imgOld.parentNode.removeChild(imgOld);
          counter++;
        }
      });
      fs.writeFileSync(
        file,
        html.includes('body')
          ? dom.serialize()
          : dom.window._document.querySelector('body').innerHTML
      );
      console.log(`${counter} tags img alteradas em ${file}`);
    });
  }
});
