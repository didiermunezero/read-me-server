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
  @Field({ nullable: true })
  readonly dob: string;
  @Field({ nullable: true })
  readonly profile: string;
  @Field()
   password: string;
}
