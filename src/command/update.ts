import chalk from 'chalk'
import ora from 'ora'
import process from 'child_process'

const spinner = ora({
    text: 'lxferic-cli updating ...',
    spinner: {
        interval: 300,
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map(item => chalk.blue(item))
    }
});

export function update(){
    spinner.start();
    process.exec('npm install lxferic-cli@latest -g', (error) => {
        spinner.stop();
        if(!error){
            console.log(chalk.green('update successfully'));
        }else{
            console.log(chalk.red(error));
        }
    });
}