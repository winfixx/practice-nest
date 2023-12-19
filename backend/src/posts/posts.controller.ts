import { Controller, Body, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { CreatePostDto } from './dto/post.dto'
import { PostsService } from './posts.service'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('posts')
export class PostsController {

    constructor(
        private postService: PostsService
    ) { }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPost(
        @Body() postDto: CreatePostDto,
        @UploadedFile() image
    ) {
        return this.postService.createPost(postDto, image)
    }

}
