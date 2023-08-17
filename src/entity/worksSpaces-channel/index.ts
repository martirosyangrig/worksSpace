import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from "typeorm";
import { User } from "../user";
import { WorksSpaces } from "../workspaces";


@Entity()
export class WorksSpaceChannel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name: string;

    @ManyToOne(() => WorksSpaces, workSpace => workSpace.channels)
    workspace: WorksSpaces;

    @ManyToMany(() => User, user => user.workSpaceChannels)
    users: User[];

    @ManyToOne(() => User, user => user.myChannels)
    owner: User;
}