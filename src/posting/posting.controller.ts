import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Posting } from './interfaces/posting.interface';
import { PostingService } from './posting.service';
import { CreatePostingDto } from './dto/create-posting.dto';
import { UpdatePostingDto } from './dto/update-posting.dto';

@Controller('posting')
export class PostingController {
    constructor(private readonly postingService: PostingService) {}

    @Get('all')
    getAllPostings(): Posting[] {
        return this.postingService.getAllPostings();
    }

    @Get(':id')
    getPostingById(@Param('id') id: number): Posting | undefined {
        return this.postingService.getPostingById(id);
    }

    @Post('create')
    createPosting(@Body() createPostingDto: CreatePostingDto): Posting {
        return this.postingService.createPosting(createPostingDto);
    }

    @Post('update/:id')
    updatePosting(@Param('id') id: number, @Body() updatePostingDto: UpdatePostingDto): Posting | undefined {
        return this.postingService.updatePosting(id, updatePostingDto);
    }
}
