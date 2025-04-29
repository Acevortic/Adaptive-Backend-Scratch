import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feature } from 'src/typeorm/entities/Feature';
import { Repository } from 'typeorm';
import { CreateFeatureDto } from './dtos/CreateFeatureDto';
import { UpdateFeatureDto } from './dtos/UpdateFeatureDto';

@Injectable()
export class FeaturesService {      // Responsible for all business logic, calling API's, etc
    constructor(@InjectRepository(Feature) private featureRepository: Repository<Feature>, 
    ) {}

    async createPost(featureDetails: CreateFeatureDto) {     
        const newPost = await this.featureRepository.create({...featureDetails, createdAt: new Date(), updatedAt: new Date()});  // Added updatedAt as adding is an update
        return await this.featureRepository.save(newPost); 
        
    }

    async getAllPosts() {    // Return all posts that exist in the database as an array
        return await this.featureRepository.find();
    }

    async searchPosts(term): Promise<any>  {  
        if (!term) {
            throw new HttpException("Term parameter is empty or missing. ", HttpStatus.BAD_REQUEST);
        }

        const searchPost = await this.featureRepository.createQueryBuilder("Blog Posts")
        .where("LOWER(title) = LOWER(:term)", { term })
        .orWhere("LOWER(content) = LOWER(:term)", { term })
        .getMany();
        
        console.log(searchPost + "Found post!");
        return searchPost;
    }

    async countPosts() {      // Return the total number of posts in the database
        const totalPosts = await this.featureRepository.count({});
        return totalPosts;
    }

    async getSinglePost(id: number): Promise<any> { 
        const post = await this.featureRepository.findOneBy({id: id});
        if (!post) {
            throw new HttpException('The ID you searched for was not found.', HttpStatus.NOT_FOUND);    // This exception is fine (invalid ID)
        } 
        return post;
    }

    async updatePost(id: number, updateFeatureDto: UpdateFeatureDto): Promise<any> {  // Verify the bad request logic 
        const postToUpdate = await this.featureRepository.findOneBy({id: id});
        if (!postToUpdate) {    // If the post isn't found there's no need to update it
            throw new HttpException('The ID you searched for was not found in the database.', HttpStatus.NOT_FOUND);
        } 
        return this.featureRepository.update({ id }, {...updateFeatureDto, updatedAt: new Date()});
    }

    async deletePost(id: number): Promise<any> {  // Returns 204 if the deletion was successful
        const postToDelete = await this.featureRepository.findOneBy({id: id});
        if (!postToDelete) {        // Not found error if the ID does not exist.
            throw new HttpException('The ID you want to delete is not in the database.', HttpStatus.NOT_FOUND);
        } else {
            return this.featureRepository.delete({ id });   // Don't fully delete (Change to softdelete later)
        }
    }
}

