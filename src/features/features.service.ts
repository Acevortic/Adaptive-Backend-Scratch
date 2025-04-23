import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feature } from 'src/typeorm/entities/Feature';
import { Repository } from 'typeorm';
import { CreateFeatureParams, UpdateFeatureParams} from './utils/types';

@Injectable()
export class FeaturesService {      // Responsible for all business logic, calling API's, etc
    constructor(@InjectRepository(Feature) private featureRepository: Repository<Feature>, 
    ) {}

    createPost(featureDetails: CreateFeatureParams) {     
        if (!featureDetails.title || !featureDetails.content) { // Condition where we won't interact with the database (invalid data)
            throw new HttpException('Title or content was missing or empty. Cannot create the user.', HttpStatus.BAD_REQUEST);
        } else {
            const newPost = this.featureRepository.create({...featureDetails, createdAt: new Date()});  // Not async, creates a post
            this.featureRepository.save(newPost); 
        }
    }

    getAllPosts() {    // Return all posts that exist in the database as an array
        return this.featureRepository.find();
    }

    async searchPosts(title: string, content: string): Promise<any>  {  
        if (!title && content || !content && title) {       // Condition where we will search the database
            const searchPost = await this.featureRepository.createQueryBuilder("Blog Posts")
            .where("LOWER(title) = LOWER(:title)", { title })
            .orWhere("LOWER(content) = LOWER(:content)", { content })
            .getMany();
            if(searchPost.length == 0) {    // Added the case where an empty array is returned if the title / content is not found. 
                throw new HttpException('The title or content you searched for was not found in the database ', HttpStatus.NOT_FOUND);
            }
            console.log(searchPost);
            return searchPost;
        } else {        // Condition where we don't need to search the database
            throw new HttpException('Title or content must be included to search. ', HttpStatus.BAD_REQUEST);
        }
    }

    async countPosts() {      // Return the total number of posts in the database
        const totalPosts = await this.featureRepository.count({});
        return totalPosts;
       //  console.log(totalPosts);     // Debug for initial testing and implementation
        // return JSON.stringify("{total: " + totalPosts + "}");  // NestJS automatically serializes to JSON, this isn't needed
    }

    async getSinglePost(id: number): Promise<any> { 
        const post = await this.featureRepository.findOneBy({id: id});
        if (!post) {
            throw new HttpException('The ID you searched for was not found.', HttpStatus.NOT_FOUND);
        } else {
            return this.featureRepository.findOneBy({ id: id });
        }
    }

    async updatePost(id: number, updatePostDetails: UpdateFeatureParams): Promise<any> {  // Verify the bad request logic 
        const postToUpdate = await this.featureRepository.findOneBy({id: id});
        if (!postToUpdate) {    // If the post isn't found there's no need to update it
            throw new HttpException('The ID you searched for was not found in the database.', HttpStatus.NOT_FOUND);
        } 

        if (!updatePostDetails.title && !updatePostDetails.content) {   // Hotfix for updating posts, would only update if both title and content passed in.
            throw new HttpException('Title and content was missing. cannot update. ', HttpStatus.BAD_REQUEST);
        } else if (updatePostDetails.title) {
            return this.featureRepository.update({ id }, {...updatePostDetails, updatedAt: new Date()});
        } else if (updatePostDetails.content) {
            return this.featureRepository.update({ id }, {...updatePostDetails, updatedAt: new Date()});
        }
    }

    async deletePost(id: number): Promise<any> {  // Returns 204 if the deletion was successful
        const postToDelete = await this.featureRepository.findOneBy({id: id});
        if (!postToDelete) {        // Not found error if the ID does not exist.
            throw new HttpException('The ID you want to delete is not in the database.', HttpStatus.NOT_FOUND);
        } else {
            return this.featureRepository.delete({ id });
        }
    }
}

