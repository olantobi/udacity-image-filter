import { Table, Column, Model, HasMany, PrimaryKey, CreatedAt, UpdatedAt, ForeignKey } from 'sequelize-typescript';

interface FeedItemAttributes {
  caption: string
  url: string
}

@Table
export class FeedItem extends Model<FeedItemAttributes> {
  @Column
  public caption!: string;

  @Column
  public url!: string;

  @Column
  @CreatedAt
  public createdAt: Date = new Date();

  @Column
  @UpdatedAt
  public updatedAt: Date = new Date();
}