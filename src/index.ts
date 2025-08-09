import {Command} from 'commander'
import {version} from '../package.json'

import {create} from './command/create'

const program = new Command('lxferic');
program.version(version, '-v, --version');

program.command('create').description('create a new project').argument('[name]', 'project name').action(async (dirname)=>{
    create(dirname);
    // console.log("dirname=", dirname);
    // if(dirname){
    //     create(dirname);
    // }
});

program.parse();