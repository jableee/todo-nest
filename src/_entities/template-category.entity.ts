import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { CategoryEntity } from "./category.entity";
import { TemplateEntity } from "./template.entity";

@Entity('template-categories')
export class TemplateCategoryEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    categoryId: number

    @Column()
    templateId: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => TemplateEntity, (template) => template.templateCategory, {
        onDelete: 'CASCADE'
    })
    template: TemplateEntity

    @ManyToOne(() => CategoryEntity, (category) => category.templateCategory, {
        onDelete: 'CASCADE'
    })
    category: CategoryEntity
}