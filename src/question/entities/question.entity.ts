import { ApiProperty } from "@nestjs/swagger";
import { UUID } from "crypto";
import { QuestionType, Seniority } from "@prisma/client";

export class QuestionEntity {
    
    @ApiProperty()
    id: UUID;

    @ApiProperty()
    question: string;

    @ApiProperty({ enum: Seniority })
    seniority: Seniority

    @ApiProperty({ enum: QuestionType })
    type:QuestionType

    @ApiProperty()
    options: string[];

    @ApiProperty()
    correct_option: number[]

    @ApiProperty()
    explanation: string;

    @ApiProperty()
    link: string;

    @ApiProperty({ required: false, default:true })
    is_active?: boolean=true;

    @ApiProperty()
    created_at: Date

    @ApiProperty()
    updated_at: Date

    @ApiProperty()
    quiz_id: UUID;
}
