import { Controller, Get, Post, Body, Patch, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { CreateFeaturedto } from './dtos/CreateFeaturedto';
import { FeaturesService } from './features.service';
import { UpdateFeatureDto } from './dtos/UpdateFeatureDto';

@Controller('posts')
export class FeaturesController {       // Handles incoming requests 

    constructor(private featureService: FeaturesService) {}

    @Get()
    async getAllPosts() {
        const posts = await this.featureService.getAllPosts();
        return posts;
    }

    @Post()
    createPosts(@Body() CreateFeaturedto: CreateFeaturedto) {
        return this.featureService.createPost(CreateFeaturedto);
    }

    @Patch(':id')
    async updatePost(@Param('id', ParseIntPipe) id: number, @Body() updateFeatureDto: UpdateFeatureDto) {
        await this.featureService.updatePost(id, updateFeatureDto);
    }

    @Delete(':id')
    async deletePost(@Param('id', ParseIntPipe) id: number) {
        await this.featureService.deletePost(id);
    }
}
