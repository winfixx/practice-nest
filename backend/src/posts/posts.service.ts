import { Injectable } from '@nestjs/common'
import { CreatePostDto } from './dto/post.dto'
import { InjectModel } from '@nestjs/sequelize'
import { Post } from './posts.model'
import { FilesService } from 'src/files/files.service'
import { File } from 'buffer'

@Injectable()
export class PostsService {

    constructor(
        @InjectModel(Post) private postRepository: typeof Post,
        private filesService: FilesService
    ) { }

    async createPost(postDto: CreatePostDto, image: File) {
        const fileName = this.filesService.createFile(image)
        const post = await this.postRepository.create<Post>({...postDto, image: fileName})
        return post
    }

}
