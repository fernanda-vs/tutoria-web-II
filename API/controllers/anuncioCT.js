const { json } = require('express/lib/response')
const database = require('../models')

class anuncioCT {
    static async pegaTodosAnuncios(req, res) {
        try {

            const todosAnuncios = await database.Anuncio.findAll()
            return res.status(200).json(todosAnuncios)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmAnuncio(req, res) {
        const { id } = req.params
        try {
            const umAnuncio = await database.Anuncio.findOne({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).json(umAnuncio)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaAnuncio(req, res) {
        const novoAnuncio = req.body

        try {
            const novoAnuncioCriado = await database.Anuncio.create(novoAnuncio)
            return res.status(200).json(novoAnuncioCriado)
        } catch (error) {
            return res.status(500).json(error.message)

        }
    }

    static async atualizaAnuncio(req, res) {
        const { id } = req.params
        const novasInfos = req.body
        try {
            await database.Anuncio.update(novasInfos, { where: { id: Number(id) } })
            const anuncioAtualizado = await database.Anuncio.findOne({ where: { id: number(id) } })
            return res.status(200).json(anuncioAtualizado)
        } catch (error) {
            return res.status(500).json(error.message)
        }

    }

    static async apagaAnuncio(req, res) {
        const { id } = req.params
        try {
            await database.Anuncio.destroy({ where: { id: Number(id) } })
            return res.status(200).json({ mensagem: `id ${id} deletado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = anuncioCT
