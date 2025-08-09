import simpleGit, { SimpleGitOptions } from 'simple-git'
import createLogger from 'progress-estimator';
import chalk from 'chalk'

const gitOptions: Partial<SimpleGitOptions> = {
    baseDir: process.cwd(), // 当前工作目录
    binary: 'git',  // 指定git二进制文件路径
    maxConcurrentProcesses: 6   // 最大的进程并发数
};

// 初始化进度条
const logger = createLogger({
    spinner: {
        interval: 100,
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map(item => chalk.green(item))
    }
});

export const clone = async (url: string, projectName: string, options: string[]) => {
    const git = simpleGit(gitOptions);
    console.log("git=", git);
    try{
        await logger(git.clone(url, projectName, options), 'codes downloading ...', {
            estimate: 7000     // 预计下载时常
        });
        console.log();
        console.log(chalk.blueBright("================================"));
        console.log(chalk.blueBright("===欢迎使用 lxferic-cli 脚手架===="));
        console.log(chalk.blueBright("================================"));
        console.log();
    }catch(error){
        console.error(chalk.red('download error'));
    }
}


