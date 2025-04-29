import { IsNotEmpty } from "class-validator";

export class UpdateFeatureDto{
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;
    
    updatedAt: Date;
}