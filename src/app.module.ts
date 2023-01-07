import { Module } from '@nestjs/common';
import { AddonsModule } from './resources/addons/addons.module';
import { AddonCategoriesModule } from './resources/addon-categories/addon-categories.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AddonsModule, AddonCategoriesModule, DatabaseModule, AuthModule],
})
export class AppModule {}
