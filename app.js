const { spawn } = require('child_process');
const express = require('express');
const createError = require('http-errors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

const notas = [
    {
        "periodo": "2021/1",
        "disciplina": { "codigo": "ADS030", "nome": "Manutenção de Software e DevOps" },
        "a1": "5.2",
        "a2": "3.8",
        "a3": "4.8",
        "media": "5.0",
    },
    {
        "periodo": "2021/1",
        "disciplina": { "codigo": "ADS032", "nome": "Construção de Frontend" },
        "a1": "6.4",
        "a2": "4.6",
        "a3": "",
        "media": "5.3",
    },
    {
        "periodo": "2021/2",
        "disciplina": { "codigo": "ADS038", "nome": " Governança de TI" },
        "a1": "1.5",
        "a2": "6.5",
        "a3": "2.0",
        "media": "4.7",
    },
];

const faltas = [
    {
        "periodo": "2021/1",
        "disciplina": { "codigo": "ADS030", "nome": "Manutenção de Software e DevOps" },
        "total": "0",
        "porcentagem": "0",
    },
    {
        "periodo": "2021/1",
        "disciplina": { "codigo": "ADS032", "nome": "Construção de Frontend" },
        "total": "18",
        "porcentagem": "15",
    },

];

const boletos = [
    {
        "mensalidade": "01",
        "vencimento": "01/01/2022",
        "valor": "500.00",
        "situacao": "Pago",
    },
    {
        "mensalidade": "02",
        "vencimento": "01/02/2022",
        "valor": "500.00",
        "situacao": "Pago",
    },
    {
        "mensalidade": "03",
        "vencimento": "01/03/2022",
        "valor": "500.00",
        "situacao": "Em Atraso",
    },
];

const requerimentos = [
    {
        "disciplina": { "codigo": "ADS030", "nome": "Manutenção de Software e DevOps" },
        "periodo": "2021/1",
        "prova": "A1",
        "situacao": "Deferido",
        "argumentacao": "A questão 1 foi respondida conforme o material da disciplina.",
        "parecer": "A pontuação da questão foi revisada e a nota da prova atualizada."
    },
    {
        "disciplina": { "codigo": "ADS032", "nome": "Construção de Frontend" },
        "periodo": "2021/1",
        "prova": "A2",
        "situacao": "Indeferido",
        "argumentacao": "Favor reconsiderar a questão 2.",
        "parecer": "A resposta dada à questão é referente a outro assunto."
    },
];

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', function (req, res, next) {
    res.json({ msg: 'API Aluno Online' });
});

app.get('/notas', function (req, res, next) {
    res.json(notas);
});

app.get('/faltas', function (req, res, next) {
    res.json(faltas);
});

app.get('/boletos', function (req, res, next) {
    res.json(boletos);
});

app.get('/boletos/:id', function (req, res, next) {
    const id = Number(req.params.id);
    if (id > boletos.length) return next(createError(404, "Boleto não localizado!"));
    res.json(boletos[id]);
});

app.get('/requerimentos', function (req, res, next) {
    res.json(requerimentos);
});

app.get('/requerimentos/:id', function (req, res, next) {
    const id = Number(req.params.id);
    if (id > requerimentos.length) return next(createError(404, "Requerimento não localizado!"));
    res.json(requerimentos[id]);
});

app.post('/requerimentos', function (req, res, next) {
    const novoRequerimento = {
        "disciplina": { "codigo": req.body.disciplina.codigo, "nome": req.body.disciplina.nome },
        "periodo": req.body.perido,
        "prova": req.body.prova,
        "argumentacao": req.body.argumentacao,
        "situacao": "Pendente"
    }
    requerimentos.push(novoRequerimento);
    res.status(201).json(novoRequerimento);
});

app.listen(3000, function() {
    console.log("API está ON!")
});