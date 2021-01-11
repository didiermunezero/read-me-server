import { UserType } from 'src/user/dto/create-user.dto';
import { ObjectType, Field, Int, ID } from 'type-graphql';

@ObjectType()
export class CourseType {
  @Field(() => ID)
  id: string;
  @Field()
  readonly name: string;
  @Field(() => [UserType])
  readonly author: UserType[];
}
