const path = require('path');
const projectPages = require('../../project/pages');

function inputs( base_dir, base_src_rel_dir ) {
    let k, ret = {};
    for(k in projectPages){
        if(projectPages.hasOwnProperty(k)){
            ret[k] = path.join(base_dir, base_src_rel_dir, k + ".js");
        }
    }
    return ret;
}

module.exports = inputs;