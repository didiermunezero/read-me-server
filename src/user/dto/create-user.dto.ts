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
  @Field({ nullable: true })
  readonly dob: string;
  @Field({ nullable: true })
  readonly profile: string;
  @Field({ nullable: true })
  readonly type: string;
}

@ObjectType()
export class loginOutPut {
  @Field()
  readonly token: string;
}

ObjectType()
export class simpleUser{
  @Field(()=>ID)
  readonly userId: string;
  @Field()
  readonly username: string;
}