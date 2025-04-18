import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feature } from 'src/typeorm/entities/Feature';
import { Repository } from 'typeorm';
import { CreateFeatureParams } from './utils/types';

@Injectable()
export class FeaturesService {      // Responsible for all business logic, calling API's, etc
    constructor(@InjectRepository(Feature) private featureRepository: Repository<Feature>, 
    ) {}

    getAllPosts() {
        return this.featureRepository.find();
    }

    createPost(featureDetails: CreateFeatureParams) {
        const newPost = this.featureRepository.create({...featureDetails, createdAt: new Date()});  // Not async
        this.featureRepository.save(newPost); // Async
    }
}

