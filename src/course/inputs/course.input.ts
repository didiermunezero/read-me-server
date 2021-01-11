import { InputType, Field, Int, ID } from 'type-graphql';

@InputType()
export class CourseInput {
  @Field()
  readonly name: string;
  @Field(() => ID)
  readonly author: [string];
}
