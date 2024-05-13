import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { Users } from 'src/users/users.entity';
import { GetUser } from 'src/users/get-user.decorator';
import { Collections } from './collections.entity';

@UseGuards(AuthGuard())
@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Post()
  create(
    @GetUser() user: Users,
    @Body() createCollectionDto: CreateCollectionDto,
  ): Promise<Collections> {
    return this.collectionsService.create(user, createCollectionDto);
  }

  @Get()
  get(@GetUser() user: Users): Promise<Collections[]> {
    return this.collectionsService.getByUserId(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ) {
    return this.collectionsService.update(+id, updateCollectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionsService.remove(+id);
  }
}
