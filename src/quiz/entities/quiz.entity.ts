import { ChallengeType, Quiz } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';

export class QuizEntity  {
    
    @ApiProperty()
    id: UUID;

    @ApiProperty()
    name:string;

    @ApiProperty({ required: false, nullable: true  })
    description?:string | null;
       
    @ApiProperty()
    skill_level_id: string;
    
    @ApiProperty({ enum: ChallengeType })
    challenge_type:ChallengeType;
    
    @ApiProperty({ required: false })
    max_time?:number;

    @ApiProperty()
    created_by_id: string;
    
    @ApiProperty({ required: false, default:true })
    is_active: boolean=true
}
