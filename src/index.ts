import {Command} from 'commander'
import {version} from '../package.json'

import {create} from './command/create'
import {update} from './command/update'

const program = new Command('lxferic');
program.version(version, '-v, --version');

program.command('create').description('create a new project').argument('[name]', 'project name').action(async (dirname)=>{
    create(dirname);
});

program.command('update').description('update lxferic-cli').action(async () => {
    await update();
});


program.parse();