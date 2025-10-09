import { ApiProperty } from "@nestjs/swagger";
import { ChallengeType } from "@prisma/client";

export class Challenge {
    @ApiProperty({ description: 'id del challenge' })
    id: string;

    @ApiProperty({ description: 'calificación obtenida en el challenge' })
    calification: number;

    @ApiProperty({ description: 'tiempo transcurrido para resolver en el challenge' })
    time_taken: number;

    @ApiProperty({ description: 'respuestas a las preguntas del challenge',
        type: 'array',
            items: {
            type: 'array',
                items: {
                    type: 'number',
                }
            },})
    question_answers: number[][];

    /* @ApiProperty({ description: 'estado del challenge', type: ChallengeType })
    state: ChallengeType; */

    @ApiProperty({ description: 'fecha de creación del challenge' })
    created_at: Date;

    @ApiProperty({ description: 'fecha de última actualización del challenge' })
    updated_at: Date;

    @ApiProperty({ description: 'ID del quiz asociado al challenge' })
    quiz_id: string;

    @ApiProperty({ description: 'ID del usuario que realiza el challenge' })
    user_id: string;


}
