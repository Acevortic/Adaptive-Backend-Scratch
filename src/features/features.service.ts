import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feature } from 'src/typeorm/entities/Feature';
import { Repository } from 'typeorm';
import { CreateFeatureParams, UpdateFeatureParams } from './utils/types';

@Injectable()
export class FeaturesService {      // Responsible for all business logic, calling API's, etc
    constructor(@InjectRepository(Feature) private featureRepository: Repository<Feature>, 
    ) {}

    getAllPosts() {     // This works no issues
        return this.featureRepository.find();
    }

    countPosts() {      // todo actually count posts, this is broken
        const postsJson: any[] = Array.of(this.featureRepository.find());
        console.log(postsJson);
        return postsJson.length;
    }

    getSinglePost(id: number) { // Add logic for when the post is not found, actual http exception
        return this.featureRepository.findOneBy({ id: id });
    }

    createPost(featureDetails: CreateFeatureParams) {       // Todo throw the actual http exception for it being a bad request. (400 bad request)
        if (!featureDetails.title || !featureDetails.content) {
            throw new HttpException('Title or content was missing or empty. Cannot create the user.', HttpStatus.BAD_REQUEST);
        } else {
            const newPost = this.featureRepository.create({...featureDetails, createdAt: new Date()});  // Not async
            this.featureRepository.save(newPost); // Async
        }

    }

    updatePost(id: number, updatePostDetails: UpdateFeatureParams) {    // Todo throw the actual http exception for empty titles / content
        if (!updatePostDetails.title || !updatePostDetails.content) {
            throw new HttpException('Title or content was empty. Cannot update the user.', HttpStatus.BAD_REQUEST);
        } else {
            return this.featureRepository.update({ id }, {...updatePostDetails, updatedAt: new Date()});
        }
       
    }

    deletePost(id: number) {    // Add validation logic to check if the id exists
        return this.featureRepository.delete({ id });
    }
}

