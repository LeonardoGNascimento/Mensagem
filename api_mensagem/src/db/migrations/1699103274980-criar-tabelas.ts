import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelas1699103274980 implements MigrationInterface {
    name = 'CriarTabelas1699103274980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`mensagem\` (\`id\` int NOT NULL AUTO_INCREMENT, \`dataHora\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`mensagem\` varchar(255) NOT NULL, \`usuarioId\` int NULL, \`chatId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usuario\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`senha\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_2863682842e688ca198eb25c12\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`chats_usuario\` (\`id\` int NOT NULL AUTO_INCREMENT, \`usuarioId\` int NULL, \`chatId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`chat\` (\`id\` int NOT NULL AUTO_INCREMENT, \`codigo\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_a988ed0e79291974e415fb4c6b\` (\`codigo\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`mensagem\` ADD CONSTRAINT \`FK_28829c516bdf97e11e4449ae82c\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mensagem\` ADD CONSTRAINT \`FK_4ace6e1bd8ee742224ea8322ef6\` FOREIGN KEY (\`chatId\`) REFERENCES \`chat\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chats_usuario\` ADD CONSTRAINT \`FK_b08c5fe1bcf191bc1d1d8e8e87b\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chats_usuario\` ADD CONSTRAINT \`FK_2ce32ffb660823e41922a8901c0\` FOREIGN KEY (\`chatId\`) REFERENCES \`chat\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chats_usuario\` DROP FOREIGN KEY \`FK_2ce32ffb660823e41922a8901c0\``);
        await queryRunner.query(`ALTER TABLE \`chats_usuario\` DROP FOREIGN KEY \`FK_b08c5fe1bcf191bc1d1d8e8e87b\``);
        await queryRunner.query(`ALTER TABLE \`mensagem\` DROP FOREIGN KEY \`FK_4ace6e1bd8ee742224ea8322ef6\``);
        await queryRunner.query(`ALTER TABLE \`mensagem\` DROP FOREIGN KEY \`FK_28829c516bdf97e11e4449ae82c\``);
        await queryRunner.query(`DROP INDEX \`IDX_a988ed0e79291974e415fb4c6b\` ON \`chat\``);
        await queryRunner.query(`DROP TABLE \`chat\``);
        await queryRunner.query(`DROP TABLE \`chats_usuario\``);
        await queryRunner.query(`DROP INDEX \`IDX_2863682842e688ca198eb25c12\` ON \`usuario\``);
        await queryRunner.query(`DROP TABLE \`usuario\``);
        await queryRunner.query(`DROP TABLE \`mensagem\``);
    }

}
