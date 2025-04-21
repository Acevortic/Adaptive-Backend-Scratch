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

    @Get(':id')     // Gets a single blog post
    async getSinglePost(@Param('id') id: number) {
        const post = await this.featureService.getSinglePost(id);
        return post;
    }

    @Get('/count')  // Counts all blog posts
    async countPosts() {
        return this.featureService.countPosts();
    }

    // @Get('/search') 
    // async searchPosts(@Param('term') term: string) {
    //     return this.featureService.searchPosts();
    // }

    @Post()     // Create a new blog post
    createPosts(@Body() CreateFeaturedto: CreateFeaturedto) {
        return this.featureService.createPost(CreateFeaturedto);
    }

    @Patch(':id')   // Updates an existing blog post
    async updatePost(@Param('id', ParseIntPipe) id: number, @Body() updateFeatureDto: UpdateFeatureDto) {
        await this.featureService.updatePost(id, updateFeatureDto);
    }

    @Delete(':id')     // Deletes an existing blog post
    async deletePost(@Param('id', ParseIntPipe) id: number) {
        await this.featureService.deletePost(id);
    }
}
