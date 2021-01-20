import { UserType } from 'src/user/dto/create-user.dto';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class CourseType {
  @Field(() => ID)
  id: string;
  @Field({ nullable: true })
  readonly name: string;
  @Field(() => [UserType], { nullable: true })
  readonly author: UserType[];
  @Field(()=>UserType,{nullable: true})
  readonly createdby: UserType;
}


@ObjectType()
export class CreatedCourseOut {
  @Field(() => ID)
  id: string;
  @Field({ nullable: true })
  readonly name: string;
  @Field(() => [ID], { nullable: true })
  readonly author: string[];
  @Field(()=>ID,{nullable: true})
  readonly createdby: string;
}