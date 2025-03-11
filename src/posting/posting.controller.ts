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
    getAllPostings(): Promise<Posting[]> {
        return this.postingService.getAllPostings();
    }

    @Get(':id')
    getPostingById(@Param('id') id: string): Promise<Posting[]> {
        return this.postingService.getPostingById(id);
    }

    @Post('create')
    createPosting(@Body() createPostingDto: CreatePostingDto): Promise<Posting> {
        return this.postingService.createPosting(createPostingDto);
    }

    @Post('update/:id')
    updatePosting(@Param('id') id: string, @Body() updatePostingDto: UpdatePostingDto): Promise<Posting> {
        return this.postingService.updatePosting(id, updatePostingDto);
    }

    @Post('remove/:id')
    removePosting(@Param('id') id: string, @Body() removePostingDto: RemovePostingDto): Promise<Posting> {
        return this.postingService.removePosting(id, removePostingDto);
    }
    
}
