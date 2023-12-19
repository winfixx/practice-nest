import { Inject, Injectable } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'
import { CONFIG_OPTIONS } from './config.module'

interface Options {
    folder: string
}

@Injectable()
export class ConfigService {
    private readonly envConfig

    constructor(
        @Inject(CONFIG_OPTIONS) private options: Options
    ) {
        const filePath = `${process.env.NODE_ENV || 'development'}.env`
        const envFile = path.resolve(__dirname, '../../', options.folder, filePath)
        this.envConfig = dotenv.parse(fs.readFileSync(envFile))
    }

    get(key: string): string {
        return this.envConfig[key]
    }
}
