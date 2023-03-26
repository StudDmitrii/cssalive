const Comb = require('csscomb');
const config = require('node_modules\csscomb\config\csscomb.json');
var comb = new Comb(config);

function Start(req) {
    let out_text = editor.getValue();
    //out.setValue(editor.getValue());
    //comb.processFile(out_text);
    comb.processString(out_text);

    out.setValue(out_text);
}