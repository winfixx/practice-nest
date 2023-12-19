import { CallHandler, DynamicModule, Module } from '@nestjs/common'
import { ConfigController } from './config.controller'
import { ConfigService } from './config.service'

export const CONFIG_OPTIONS = 'CONFIG_OPTIONS'

@Module({})
export class ConfigModule {
    static register(options): DynamicModule {
        return {
            module: ConfigModule,
            controllers: [ConfigController],
            providers: [
                {
                    provide: CONFIG_OPTIONS,
                    useValue: options
                },
                ConfigService
            ]
        }
    }
}
