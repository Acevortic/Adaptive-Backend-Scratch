import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feature } from 'src/typeorm/entities/Feature';
import { Repository } from 'typeorm';
import { CreateFeatureParams, UpdateFeatureParams } from './utils/types';

@Injectable()
export class FeaturesService {      // Responsible for all business logic, calling API's, etc
    constructor(@InjectRepository(Feature) private featureRepository: Repository<Feature>, 
    ) {}

    getAllPosts() {    
        return this.featureRepository.find();
    }

    searchPosts(title: string, content : string) {
        // if (this.featureRepository.findBy({title: title}))
        // return this.featureRepository.findBy({title: title, content: content});
    }

    countPosts() {      // todo actually count posts, this is broken
        

    }

    async getSinglePost(id: number): Promise<any> { 

        const post = await this.featureRepository.findOneBy({id: id});

        if (!post) {
            throw new HttpException('The ID you searched for was not found.', HttpStatus.NOT_FOUND);
        } else {
            return this.featureRepository.findOneBy({ id: id });
        }
    }

    createPost(featureDetails: CreateFeatureParams) {     
        if (!featureDetails.title || !featureDetails.content) {
            throw new HttpException('Title or content was missing or empty. Cannot create the user.', HttpStatus.BAD_REQUEST);
        } else {
            const newPost = this.featureRepository.create({...featureDetails, createdAt: new Date()});  // Not async
            this.featureRepository.save(newPost); // Async
        }

    }

    async updatePost(id: number, updatePostDetails: UpdateFeatureParams): Promise<any> {  // Verify the bad request and not found exceptions actually work
        const postToUpdate = await this.featureRepository.findOneBy({id: id});
        if (!updatePostDetails.title || !updatePostDetails.content) {
            throw new HttpException('Title or content was empty. Cannot update the user.', HttpStatus.BAD_REQUEST);
        } else if (!postToUpdate) {
            throw new HttpException('The ID you searched for was not found in the database.', HttpStatus.NOT_FOUND);
        } else {
            return this.featureRepository.update({ id }, {...updatePostDetails, updatedAt: new Date()});
        }
    }

    async deletePost(id: number): Promise<any> {  // Todo fix the status code from 200 to 204 no content
        const postToDelete = await this.featureRepository.findOneBy({id: id});
        if (!postToDelete) {
            throw new HttpException('The ID you want to delte is not in the database.', HttpStatus.NOT_FOUND);
        } else {
            return this.featureRepository.delete({ id }), HttpStatus.NO_CONTENT;
        }
    }
}

