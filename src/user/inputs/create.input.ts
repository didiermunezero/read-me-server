import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class CreateInput {
  @Field()
  readonly username: string;
  @Field(() => Int)
  readonly fname: string;
  @Field()
  readonly lname: string;
  @Field()
  readonly dob: string;
  @Field()
  readonly profile: string;
}
