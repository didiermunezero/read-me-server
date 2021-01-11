import { ObjectType, Field, Int, ID } from 'type-graphql';

@ObjectType()
export class UserType {
  @Field(() => ID)
  id: string;
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
  readonly type: string;
}

@ObjectType()
export class loginOutPut {
  @Field()
  readonly token: string;
}
