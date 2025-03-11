import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Comment } from './interfaces/comment.interface'
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { RemoveCommentDto } from './dto/remove-comment.dto';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Get(':postingId')
    getAllComments(@Param('postingId') postingId: string): Promise<Comment[]> {
        return this.commentService.getAllComments(postingId);
    }

    @Post('create/:postingId')
    createComment(@Param('postingId') postingId: string, @Body() createCommentDto: CreateCommentDto): Promise<Comment> {
        return this.commentService.createComment(postingId, createCommentDto);
    }

    @Post('update/:id')
    updateComment(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto): Promise<Comment> {
        return this.commentService.updateComment(id, updateCommentDto);
    }

    @Post('remove/:id')
    removeComment(@Param('id') id: string, @Body() removeCommentDto: RemoveCommentDto): Promise<Comment> {
        return this.commentService.removeComment(id, removeCommentDto);
    }
}