import { IsNotEmpty } from "class-validator";

export class CreateFeatureDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;

    createdAt: Date;

    updatedAt: Date;
}