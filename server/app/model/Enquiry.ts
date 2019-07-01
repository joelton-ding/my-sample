import { Entity, Column } from "typeorm"
import { Base } from "./Base";

@Entity()
export default class Enquiry extends Base {

    @Column({ nullable: false })
    name: string

    @Column({ nullable: false })
    email: string

    @Column({ nullable: false })
    phone: string

    @Column({ nullable: false })
    service: string

    @Column({ nullable: true })
    message: string

}