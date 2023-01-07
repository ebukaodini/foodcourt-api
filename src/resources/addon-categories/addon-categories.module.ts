import { Global, Module } from '@nestjs/common';
import { AddonCategoriesService } from './addon-categories.service';
import { AddonCategoriesController } from './addon-categories.controller';
import { DatabaseModule } from '../../database/database.module';

@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [AddonCategoriesController],
  providers: [AddonCategoriesService],
  exports: [AddonCategoriesService],
})
export class AddonCategoriesModule {}
