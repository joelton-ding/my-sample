import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

export abstract class Base {

    @PrimaryColumn()
    id: string

    @Column({ default: true })
    activeStatus: boolean

    @CreateDateColumn({ precision: 6, nullable: true, default: () => "CURRENT_TIMESTAMP(6)" })
    createdDate: Date

    @UpdateDateColumn({ precision: 6, nullable: true, default: () => "CURRENT_TIMESTAMP(6)" })
    updatedDate: Date

    @Column({ nullable: true })
    createdBy: string

    @Column({ nullable: true })
    updatedBy: string
}