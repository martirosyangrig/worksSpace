import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { User } from "../user";
import { WorksSpaceChannel } from "../worksSpaces-channel";


@Entity()
export class WorksSpaces {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name: string;

    @Column({
        length: 100,
    })
    slag: string;

    @ManyToMany(() => User, user => user.workSpaces)
    users: User[];

    @ManyToOne(() => User, user => user.myWorkSpaces)
    owner: User;

    @OneToMany(() => WorksSpaceChannel, workSpaceChannel => workSpaceChannel.workspace)
    channels: WorksSpaceChannel[];

}