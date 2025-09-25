import { ApiProperty } from "@nestjs/swagger";
import { UUID } from "crypto";
import { QuestionType, Seniority } from "@prisma/client";

export class QuestionForTakingEntity {
    @ApiProperty()
    id: UUID;

    @ApiProperty()
    question: string;

    @ApiProperty({ enum: Seniority })
    seniority: Seniority;

    @ApiProperty({ enum: QuestionType })
    type: QuestionType;

    @ApiProperty()
    options: string[];

    // NO incluimos correct_option, explanation, link para el candidato

    @ApiProperty()
    quiz_id: UUID;
}