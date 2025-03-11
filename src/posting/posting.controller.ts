import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Posting } from './interfaces/posting.interface';
import { PostingService } from './posting.service';
import { CreatePostingDto } from './dto/create-posting.dto';
import { UpdatePostingDto } from './dto/update-posting.dto';
import { RemovePostingDto } from './dto/remove-posting.dto';

@Controller('posting')
export class PostingController {
    constructor(private readonly postingService: PostingService) {}

    @Get('all')
    getAllPostings(): Posting[] {
        return this.postingService.getAllPostings();
    }

    // mongo
    @Get('/all-mongo')
    getAllPostingsMongo(): Promise<Posting[]> {
        return this.postingService.getAllPostingsMongo();
    }

    @Get(':id')
    getPostingById(@Param('id') id: number): Posting | undefined {
        return this.postingService.getPostingById(id);
    }

    @Post('create')
    createPosting(@Body() createPostingDto: CreatePostingDto): Posting {
        return this.postingService.createPosting(createPostingDto);
    }

    @Post('create-mongo')
    createPostingMongo(@Body() createPostingDto: CreatePostingDto): Promise<Posting> {
        return this.postingService.createPostingMongo(createPostingDto);
    }

    @Post('update/:id')
    updatePosting(@Param('id') id: number, @Body() updatePostingDto: UpdatePostingDto): Posting | undefined {
        return this.postingService.updatePosting(id, updatePostingDto);
    }

    @Post('remove/:id')
    removePosting(@Param('id') id: number, @Body() removePostingDto: RemovePostingDto): Posting | undefined {
        return this.postingService.removePosting(id, removePostingDto);
    }
    
}
