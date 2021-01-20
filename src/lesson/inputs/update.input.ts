import { InputType, Field,ID} from 'type-graphql';

@InputType()
export class lessonUpdate {
    @Field(() => ID)
    readonly _id: string;
  @Field({ nullable: true })
  readonly title: string;
  @Field({ nullable: true })
  readonly content: string;
  @Field(() => ID,{ nullable: true })
  readonly author: [string];
  @Field(() => ID,{ nullable: true })
  readonly course: string;
}