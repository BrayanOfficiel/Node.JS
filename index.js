const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Ajoutez vos routes ici

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Veuillez utiliser /champions pour accéder à la liste des champions, ou /champions/:id pour accéder à un champion spécifique.');
  });
  

app.post('/champions', async (req, res) => {
    const { name, type } = req.body;
    const champion = await prisma.champion.create({
        data: {
            name,
            type,
        },
    });
    res.json(champion);
});

app.get('/champions', async (req, res) => {
    const champions = await prisma.champion.findMany();
    res.json(champions);
});

app.get('/champions/:id', async (req, res) => {
    const { id } = req.params;
    const champion = await prisma.champion.findUnique({
        where: { id: parseInt(id) },
    });
    res.json(champion);
});

app.put('/champions/:id', async (req, res) => {
    const { id } = req.params;
    const { name, type } = req.body;
    const champion = await prisma.champion.update({
        where: { id: parseInt(id) },
        data: { name, type },
    });
    res.json(champion);
});

app.delete('/champions/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.champion.delete({
        where: { id: parseInt(id) },
    });
    res.json({ message: 'Champion deleted' });
});
