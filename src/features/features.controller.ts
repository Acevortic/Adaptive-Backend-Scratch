import { Controller, Get, Post, Body, Patch, Delete, Param, ParseIntPipe, Query, HttpCode } from '@nestjs/common';
import { CreateFeatureDto } from './dtos/CreateFeatureDto';
import { FeaturesService } from './features.service';
import { UpdateFeatureDto } from './dtos/UpdateFeatureDto';

@Controller('posts')
export class FeaturesController {       // Handles incoming requests 

    constructor(private featureService: FeaturesService) {}

    @Post()     // Create a new blog post
    createPost(@Body() CreateFeatureDto: CreateFeatureDto) {
        return this.featureService.createPost(CreateFeatureDto);
    }

    @Get()
    async getAllPosts() {   // Returns all the posts in the database
        const posts = await this.featureService.getAllPosts();
        return posts;
    }

    @Get('/search') // Searches all posts in the database for matching titles / content
    async searchPosts(@Query('title') title: string, @Query('content') content: string) {
        const searchPost = await this.featureService.searchPosts(title, content);
        return searchPost;
    }

    @Get('/count')  // Counts all blog posts
    async countPosts() {
        const totalPosts = await this.featureService.countPosts();
        return {"total:" : totalPosts};
        // return await this.featureService.countPosts();
    }

    @Get(':id')     // Gets a single blog post
    async getSinglePost(@Param('id') id: number) {
        const post = await this.featureService.getSinglePost(id);
        return post;
    }

    @Patch(':id')   // Updates an existing blog post
    async updatePost(@Param('id', ParseIntPipe) id: number, @Body() updateFeatureDto: UpdateFeatureDto) {
        await this.featureService.updatePost(id, updateFeatureDto);
    }

    @HttpCode(204)
    @Delete(':id')     // Deletes an existing blog post
    async deletePost(@Param('id', ParseIntPipe) id: number) {
        await this.featureService.deletePost(id);
    }
}
