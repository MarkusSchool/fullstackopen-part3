const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456"
    },
    {
      id: 2,
      name: "Ada Lovelace",
      number: "39-44-5323523"
    },
    {
      id: 3,
      name: "Dan Abramov",
      number: "12-43-234345"
    },
    {
      id: 4,
      name: "Mary Poppendieck",
      number: "39-23-6423122"
    }
  ]
  
app.get('/api/persons', (req, response) => {
  response.json(notes)
})

app.get('/info', (req, response) => {
  const time = new Date();
  const phoneBookInfo = `Phonebook has info for ${persons.length} people`;

  response.send(`
        <p>${phoneBookInfo}</p>
        <p>${time}</p>
    `);

})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id);

    if (!person) {
        return response.status(404).json({ error: 'Person not found' });
    }

    response.json(person);

})

app.post('/api/persons', (req, response) => {
  const body = req.body;

  if (!body.name || !body.number) {
      return response.status(400).json(
        { error: 'Name and number are required' }
      );
  }

  const personExists = persons.some(person => person.name === body.name);
  if (personExists) {
      return response.status(400).json(
          { error: 'Name must be unique' }
      );
  }

  const uusiPerson = {
      id: Math.floor(Math.random() * 1000),
      name: body.name,
      number: body.number
  };

  persons = persons.concat(uusiPerson);
  response.json(uusiPerson);
});



const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

/*

  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/notes', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = {
      content: body.content,
      important: body.important || false,
      id: generateId(),
    }
  
    notes = notes.concat(note)
  
    response.json(note)
  })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

*/