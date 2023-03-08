import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
  } from 'typeorm';
import { UserEntity } from './user.entity';
import { TemplateCategoryEntity } from './template-category.entity';
import { TodoEntity } from 'src/_entities/todo.entity'

@Entity('categories')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number

    @Column({
        type:'varchar',
        length: 100
    })
    name: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => UserEntity, (user) => user.category, {
        onDelete: 'CASCADE'
    })
    user: UserEntity

    @OneToMany(() => TemplateCategoryEntity, (templateCategory) => templateCategory.category)
    templateCategory: TemplateCategoryEntity[]

    @OneToMany(() => TodoEntity, (todo) => todo.category)
    todo: TodoEntity[]
}