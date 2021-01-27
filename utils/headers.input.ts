import { Field} from 'type-graphql';
//to make sure it works
export class UserToken {
  @Field()
  readonly userId: string;
  @Field()
  readonly email: string;
}

export class Token{
    @Field()
    readonly token: string;
}

export class headers{
    @Field()
    UserToken: UserToken
    @Field()
    token: Token
  }