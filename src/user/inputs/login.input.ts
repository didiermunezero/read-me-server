import { InputType, Field} from 'type-graphql';

@InputType()
export class loginInput {
  @Field()
  readonly username: string;
  @Field()
  readonly password: string;
}
