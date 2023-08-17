import { MigrationInterface, QueryRunner } from "typeorm";

export class Base1692212076634 implements MigrationInterface {
    name = 'Base1692212076634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "works_space_channel" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "workspaceId" integer, "ownerId" integer, CONSTRAINT "PK_67a96bca164ac418e9c89507e82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "works_spaces" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slag" character varying(100) NOT NULL, "ownerId" integer, CONSTRAINT "PK_c827a414970253cfbf1bad8ecbc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying(100) NOT NULL, "img" character varying, "password" character varying(120) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_workspaces" ("userId" integer NOT NULL, "worksSpacesId" integer NOT NULL, CONSTRAINT "PK_9a90e9fc25e817f92fae5b6d739" PRIMARY KEY ("userId", "worksSpacesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a9eab88a60b4f0314575d26ae4" ON "user_workspaces" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9ea74a3252128768130437bfee" ON "user_workspaces" ("worksSpacesId") `);
        await queryRunner.query(`CREATE TABLE "user_workspace_channels" ("userId" integer NOT NULL, "worksSpaceChannelId" integer NOT NULL, CONSTRAINT "PK_9fb17403f98fe64e543549ca392" PRIMARY KEY ("userId", "worksSpaceChannelId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_92a51227ce558121024a272a59" ON "user_workspace_channels" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_602b04f69ac1e4d7a70b80145f" ON "user_workspace_channels" ("worksSpaceChannelId") `);
        await queryRunner.query(`ALTER TABLE "works_space_channel" ADD CONSTRAINT "FK_cc4b5056f0be4afadba4880e85b" FOREIGN KEY ("workspaceId") REFERENCES "works_spaces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "works_space_channel" ADD CONSTRAINT "FK_46f069b265c19ff8369f565cd51" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "works_spaces" ADD CONSTRAINT "FK_0d62404cc270af182df187efe99" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_workspaces" ADD CONSTRAINT "FK_a9eab88a60b4f0314575d26ae47" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_workspaces" ADD CONSTRAINT "FK_9ea74a3252128768130437bfeea" FOREIGN KEY ("worksSpacesId") REFERENCES "works_spaces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_workspace_channels" ADD CONSTRAINT "FK_92a51227ce558121024a272a592" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_workspace_channels" ADD CONSTRAINT "FK_602b04f69ac1e4d7a70b80145f2" FOREIGN KEY ("worksSpaceChannelId") REFERENCES "works_space_channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_workspace_channels" DROP CONSTRAINT "FK_602b04f69ac1e4d7a70b80145f2"`);
        await queryRunner.query(`ALTER TABLE "user_workspace_channels" DROP CONSTRAINT "FK_92a51227ce558121024a272a592"`);
        await queryRunner.query(`ALTER TABLE "user_workspaces" DROP CONSTRAINT "FK_9ea74a3252128768130437bfeea"`);
        await queryRunner.query(`ALTER TABLE "user_workspaces" DROP CONSTRAINT "FK_a9eab88a60b4f0314575d26ae47"`);
        await queryRunner.query(`ALTER TABLE "works_spaces" DROP CONSTRAINT "FK_0d62404cc270af182df187efe99"`);
        await queryRunner.query(`ALTER TABLE "works_space_channel" DROP CONSTRAINT "FK_46f069b265c19ff8369f565cd51"`);
        await queryRunner.query(`ALTER TABLE "works_space_channel" DROP CONSTRAINT "FK_cc4b5056f0be4afadba4880e85b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_602b04f69ac1e4d7a70b80145f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_92a51227ce558121024a272a59"`);
        await queryRunner.query(`DROP TABLE "user_workspace_channels"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9ea74a3252128768130437bfee"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a9eab88a60b4f0314575d26ae4"`);
        await queryRunner.query(`DROP TABLE "user_workspaces"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "works_spaces"`);
        await queryRunner.query(`DROP TABLE "works_space_channel"`);
    }

}
