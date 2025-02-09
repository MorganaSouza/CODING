import { AppDataSource } from "../db/data-source";
import { Genero } from "../models/Genero";

class GeneroRepository {
    generoRepository = AppDataSource.getRepository(Genero);

    async save(genero: Genero): Promise<Genero> {
        try {
            // insert into genero value (genero.idGenero, genero.nome);
            this.generoRepository.save(genero);
            return genero;
        } catch (err) {
            throw new Error("Falha ao criar o gênero!");
        }
    }
    async retrieveAll(): Promise<Array<Genero>> {
        try {
            return this.generoRepository.find();
        } catch (error) {
            throw new Error("Falha ao retornar os gêneros!");
        }
    }

    async retrieveById(generoId: number): Promise<Genero | null> {
        try {
            return this.generoRepository.findOneBy({
                idGenero: generoId,
            });
        } catch (error) {
            throw new Error("Falha ao buscar o gênero!");
        }
    }

    async retrieveByNome(n: string): Promise<Genero | null> {
        try {
            return this.generoRepository.findOneBy({
                nome: n,
            });
        } catch (error) {
            throw new Error("Falha ao buscar o gênero!");
        }
    }

    async update(genero: Genero) {
        const { idGenero, nome } = genero;
        try {
            this.generoRepository.save(genero);
        } catch (error) {
            throw new Error("Falha ao atualizar o gênero!");
        }
    }

    async delete(generoId: number): Promise<number> {
        try {
            const generoEncontrado = await this.generoRepository.findOneBy({
                idGenero: generoId,
            });
            if (generoEncontrado) {
                this.generoRepository.remove(generoEncontrado);
                return 1;
            }
            return 0;
        } catch (error) {
            throw new Error("Falha ao deletar o gênero!");
        }
    }

    async deleteAll(): Promise<number> {
        try {
            let num = this.generoRepository.query("select count(idGenero) from genero;");
            this.generoRepository.query("delete from genero;");
            return num;
        } catch (error) {
            throw new Error("Falha ao deletar todos os gêneros!");
        }
    }
}

export default new GeneroRepository();
