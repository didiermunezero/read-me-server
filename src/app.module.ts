import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import {returnToken} from '../utils/tokenizer'
import {LessonModule} from './lesson/lesson.module'

@Module({
  imports: [
    CatsModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      cors: {
        credentials: true,
        origin: true,
    },
      installSubscriptionHandlers: true,
      context: async({ req }) =>  ({ headers: {token: req.headers["token"],UserToken:await returnToken(req)} }),
    }),
    
    MongooseModule.forRoot('mongodb+srv://Gakstal:Gaksital@cluster0.ajh7r.mongodb.net/readme',{
      useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    }),
    UserModule,
    CourseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
