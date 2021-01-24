import { InputType, Field, Int, ID } from 'type-graphql';

@InputType()
export class LessonInput {
  @Field()
  readonly title: string;
  @Field()
  readonly content: string;
  @Field(() => ID)
  readonly author: [string];
  @Field(()=>ID)
  readonly course: string;
}
