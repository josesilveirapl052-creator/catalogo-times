import express from "express"
const app = express()

app.set("view engine", "ejs")
app.set("views", "./views")

const PORT = 3000

const times = [
    { id: 1, nome: "Grêmio", estadio: "Arena", cidade: "Porto Alegre" },
    { id: 2, nome: "Internacional", estadio: "Beira-Rio", cidade: "Porto Alegre" },
    { id: 3, nome: "Santos", estadio: "Vila Belmiro", cidade: "Santos" },
    { id: 4, nome: "Flamengo", estadio: "Maracanã", cidade: "Rio de Janeiro" }
]

app.get("/", (req, res)=>{
    res.render("index", { mensagem: "Seja bem vindo ao nosso Catálogo de Times!" })
})

app.get("/times", (req, res)=>{
    res.render("times", {times})
})

app.get("/times/:id", (req, res)=>{
    const id = Number(req.params.id)
    const time = times.find(time => time.id === id)

    if (!time){
        return res.status(404).send(`
            <html>
                <body>
                    <h2>Time não encontrado!</h2>
                    <a href="/times">Voltar a lista de times</a>
                </body>
            </html>`)
    }

    res.render("detalhe", {time})
})


app.listen(PORT, ()=>{
    console.log(`Servidor rodando no endereço http://localhost:${PORT}`)
})