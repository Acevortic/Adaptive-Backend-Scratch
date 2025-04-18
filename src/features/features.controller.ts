import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateFeaturedto } from './dtos/CreateFeaturedto';
import { FeaturesService } from './features.service';

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
}
