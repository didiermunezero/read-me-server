import { User } from 'src/user/interfaces/user.interface';
import { ObjectType, Field, Int, ID } from 'type-graphql';

@ObjectType()
export class CourseType {
  @Field(() => ID)
  id: string;
  @Field()
  readonly name: string;
  @Field(() => Int)
  readonly author: [User];
}
