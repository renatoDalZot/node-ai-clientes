import { Controller, Post, Get, Param, ParseIntPipe, Body, Res } from "@nestjs/common";

import { Response } from "express";
import { PessoaFisicaService } from "../application/service/pessoa-fisica.service";
import { PessoaFisicaRequest } from "../application/dto/pessoa-fisica.request";
import { PessoaFisicaResponse } from "../application/dto/pessoa-fisica.response";
import { PessoaFisicaMapper } from "../application/mapper/pessoa-fisica.mapper";


@Controller('/v1/clientes')
export class PessoaFisicaController {
    constructor(private readonly pessoaFisicaService: PessoaFisicaService) {}

    @Post()
    async cadastrar(@Body() pessoaFisica: PessoaFisicaRequest): Promise<PessoaFisicaResponse | null> {
        const pessoaFisicaCriada = await this.pessoaFisicaService.cadastrar(pessoaFisica);
    return pessoaFisicaCriada ? PessoaFisicaMapper.toResponse(pessoaFisicaCriada) : null;
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
        return res.status(200).json(PessoaFisicaMapper.toResponse(result));
    }    
}
