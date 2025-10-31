import { ChallengeType, Seniority } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { UserEntity } from 'src/user/entities/user.entity';
import { CellEntityNested } from 'src/cell/entities/cell.entity';
import { QuestionEntity } from 'src/question/entities/question.entity';
import { QuestionForTakingEntity } from 'src/question/entities/question-for-taking.entity';

export class QuizEntity  {
    
    @ApiProperty()
    id: UUID;

    @ApiProperty()
    name:string;

    @ApiProperty({ required: false, nullable: true  })
    description?:string | null;
       
    @ApiProperty()
    cell_id: string;

    @ApiProperty({ enum: Seniority })
    seniority:Seniority;
    
    @ApiProperty({ enum: ChallengeType })
    challenge_type:ChallengeType;
    
    @ApiProperty({ required: false })
    max_time?:number;

    @ApiProperty()
    created_by_id: UUID;
       
    @ApiProperty({ required: false, default:true })
    is_active?: boolean=true

    @ApiProperty()
    created_at: Date

    @ApiProperty()
    updated_at: Date
}

export class QuizEntityNested  extends QuizEntity{
    //Anida el creador y la celula a la que esta relacionada 
    @ApiProperty({ type: () => UserEntity })
    created_by: UserEntity;

    @ApiProperty({ type: () => CellEntityNested })
    cell: CellEntityNested;
}

export class QuizEntityQuestion extends QuizEntityNested{
    //Anida todas las preguntas relacionadas al quiz
    @ApiProperty({ 
        type: () => QuestionEntity,
        isArray: true,
        description: 'Array de Questions asociadas al Quiz' 
    })
    questions: QuestionEntity[];
}

export class QuizEntityForTaking extends QuizEntityNested {
    @ApiProperty({ 
        type: () => QuestionForTakingEntity,
        isArray: true,
        description: 'Array de Questions para realizar el Quiz (sin respuestas correctas)' 
    })
    questions: QuestionForTakingEntity[];
}