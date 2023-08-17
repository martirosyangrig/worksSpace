import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { WorksSpaces } from "../workspaces";
import { WorksSpaceChannel } from "../worksSpaces-channel";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name: string;

    @Column({
        length: 100,
    })
    email: string;

    @Column({ type: 'varchar', nullable: true, default: null })
    img: string | null

    @Column({
        length: 120
    })
    password: string;

    @ManyToMany(() => WorksSpaces, workSpace => workSpace.users, {cascade : true , eager : true})
    @JoinTable({ name: 'user_workspaces'})
    workSpaces: WorksSpaces[];

    @OneToMany(() => WorksSpaces, workSpace => workSpace.owner)
    myWorkSpaces: WorksSpaces[];

    @ManyToMany(() => WorksSpaceChannel, workSpaceChannels => workSpaceChannels.users, {cascade : true , eager : true})
    @JoinTable({ name: 'user_workspace_channels'})
    workSpaceChannels: WorksSpaces[];

    @OneToMany(() => WorksSpaceChannel, workSpaceChannels => workSpaceChannels.owner)
    myChannels: WorksSpaces[];
}