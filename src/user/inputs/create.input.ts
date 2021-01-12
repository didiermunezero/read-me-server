import { InputType, Field} from 'type-graphql';

@InputType()
export class CreateInput {
  @Field()
   email: string;
  @Field()
  readonly username: string;
  @Field()
  readonly fname: string;
  @Field()
  readonly lname: string;
  @Field()
  readonly dob: string;
  @Field()
  readonly profile: string;
  @Field()
   password: string;
}
