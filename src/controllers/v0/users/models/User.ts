import {Table, Column, Model, HasMany, PrimaryKey, CreatedAt, UpdatedAt} from 'sequelize-typescript';

interface UserAttributes {
  email: string
  password_hash: string
}

@Table({
  defaultScope: { attributes: { exclude: ['password_hash']}}
})
export class User extends Model<UserAttributes> {
  
  @PrimaryKey
  @Column
  public email!: string;

  @Column
  public password_hash!: string;

  @Column
  @CreatedAt
  public createdAt: Date = new Date();

  @Column
  @UpdatedAt
  public updatedAt: Date = new Date();

  short() {
    return {
      email: this.email
    }
  }
}