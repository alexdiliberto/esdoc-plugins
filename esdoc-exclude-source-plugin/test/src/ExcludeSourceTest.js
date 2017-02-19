const assert = require('assert');
const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');
const ESDocCLI = require('esdoc/out/src/ESDocCLI.js').default;

function cli() {
  const cliPath = path.resolve('./node_modules/esdoc/out/ESDocCLI.js');
  const argv = ['node', cliPath, '-c', './test/fixture/esdoc.json'];
  const cli = new ESDocCLI(argv);
  cli.exec();
}

cli();

describe('test exclude source result:', ()=> {
  it('does not have source code.', ()=>{
    const html = fs.readFileSync('./test/fixture/out/file/src/TestExcludeSource.js.html').toString();
    const $ = cheerio.load(html);
    assert.equal($('.content .source-code').text(), '');
  });
});

