import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class CourseInput {
  @Field()
  readonly name: string;
  @Field(() => ID)
  readonly author: [string];
}
