import path from 'path'
import fs from 'fs-extra'
import {input, select} from '@inquirer/prompts'
import { clone } from '../utils/clone';

export interface TemplateInfo{
    name: string;   // 模板名称
    downloadUrl: string;    // 模板下载地址
    description: string;    // 模板描述
    branch: string; // 模板分支
}

export const templates: Map<string, TemplateInfo> = new Map([
        ['Vite-Vue3-Typescript-tempalte', {
            name: 'Vite-Vue3-Typescript-template',
            downloadUrl: 'https://github.com/lxf101/admin-pro.git',
            description: 'Vue3技术栈开发模板-pc端',
            branch: 'main'
        }],
        ['Vite-Vue3-移动端模板', {
            name: 'Vite-Vue3-Typescript-tempalte',
            downloadUrl: 'https://github.com/lxf101/admin-pro.git',
            description: 'Vue3技术栈开发模板-mobile端',
            branch: 'gh-graph'
        }]
]);

export function isOverwrite(fileName: string){
    return select({
        message: `${fileName} exists and whether or not overwrite?`,
        choices: [
            {name: 'overwrite', value: true},
            {name: 'cancel', value: false}
        ]
    });
}

export async function create(projectName?: string){
    // 初始化模板列表
    const templateList = Array.from(templates).map(item => {
        const [name, info] = item;
        return {
            name,
            value: name,
            description: info.description
        }
    });
    
    if(!projectName){
        projectName = await input({message: 'please input project name'});
    }

    // 判断文件夹是否存在，提示是否覆盖
    const filePath = path.resolve(process.cwd(), projectName);
    if(fs.existsSync(filePath)){
        const run = await isOverwrite(projectName);
        if(run){
            await fs.remove(filePath);
        }else{
            return; // 不覆盖，直接结束
        }
    }

    const templateName = await select({
        message: 'please choose template',
        choices: templateList
    });
    const info = templates.get(templateName);
    if(info){
        clone(info.downloadUrl, projectName, ['-b', info.branch]);
    }
}