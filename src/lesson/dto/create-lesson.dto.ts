import { CourseType } from 'src/course/dto/create-course.dto';
import { UserType } from 'src/user/dto/create-user.dto';
import { ObjectType, Field, Int, ID } from 'type-graphql';

@ObjectType()
export class LessonType {
  @Field(() => ID)
  id: string;
  @Field()
  content: string;
  @Field({ nullable: true })
  readonly title: string;
  @Field(() => [UserType], { nullable: true })
  readonly author: UserType[];
  @Field(()=>CourseType,{nullable: true})
  readonly course: CourseType;
  @Field(()=>UserType,{nullable: true})
  readonly createdby: UserType
}
