import { InputType, Field, Int, ID } from 'type-graphql';

@InputType()
export class LessonInput {
  @Field()
  readonly name: string;
  @Field(() => ID)
  readonly author: [string];
}
