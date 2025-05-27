import { Controller, Post, Get, Param, ParseIntPipe, Body, Res } from "@nestjs/common";
import { PessoaFisicaService } from "../service/PessoaFisicaService";
import { PessoaFisicaRequest } from "../dto/PessoaFisicaRequest";
import { PessoaFisicaResponse } from "../dto/PessoaFisicaResponse";
import { Response } from "express";


@Controller('/v1/clientes')
export class PessoaFisicaController {
    constructor(private readonly pessoaFisicaService: PessoaFisicaService) {}

    @Post()
    async cadastrarPessoaFisica(@Body() pessoaFisica: PessoaFisicaRequest): Promise<PessoaFisicaResponse | null> {
        return this.pessoaFisicaService.cadastrarPessoaFisica(pessoaFisica);        
    }

    @Get('/:id')
    async findById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response
    ) {
        const result = await this.pessoaFisicaService.findById(id);
        if (!result) {
            return res.status(404).json({ message: `Pessoa Física com id ${id} não encontrada.` });
        }
        return res.status(200).json(result);
    }    
}
