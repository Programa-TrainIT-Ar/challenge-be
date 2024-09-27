import { ChallengeType, Seniority } from '@prisma/client';
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
