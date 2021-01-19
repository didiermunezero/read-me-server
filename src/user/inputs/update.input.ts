import { InputType, Field,ID} from 'type-graphql';

@InputType()
export class updateInput {
  @Field({ nullable: true })
   email: string;
  @Field({ nullable: true })
  readonly username: string;
  @Field({ nullable: true })
  readonly fname: string;
  @Field({ nullable: true })
  readonly lname: string;
  @Field({ nullable: true })
  readonly dob: string;
  @Field({ nullable: true })
  readonly profile: string;
  @Field({nullable: true})
   password: string;
}