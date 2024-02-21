const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello I am working my friend Supabase <3');
});

// Container routes

app.get('/containers', async (req, res) => {
  const { data, error } = await supabase
    .from('containers')
    .select('*');

  if (error) {
    res.status(500).send(error.message);
  } else {
    res.json(data);
  }
});

app.get('/containers/:userId', async (req, res) => {
  const { userId } = req.params;

  const { data, error } = await supabase
    .from('containers')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    res.status(500).send(error.message);
  } else {
    res.json(data);
  }
});

app.post('/containers', async (req, res) => {
  const { user_id, name, image, pullBehaviour, volumes, ports, node } = req.body;

  const { data, error } = await supabase
    .from('containers')
    .insert([
      {
        user_id,
        name,
        image,
        pullBehaviour,
        volumes,
        ports,
        node,
      },
    ]);

  if (error) {
    res.status(500).send(error.message);
  } else {
    res.json(data);
  }
});

app.put('/cont/:id', async (req, res) => {
    const { id } = req.params;
    const { name, image, pullBehaviour, volumes, ports, node } = req.body;
  
    const { data, error } = await supabase
      .from('containers')
      .update({
        name,
        image,
        pullBehaviour,
        volumes,
        ports,
        node,
      })
      .eq('id', id);
  
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.json(data);
    }
  });
  
app.delete('/containers/:id', async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('containers')
        .delete()
        .eq('id', id);

    if (error) {
        res.status(500).send(error.message);
    } else {
        res.json(data);
    }
});

// Node routes

app.get('/nodes', async (req, res) => {
    const { data, error } = await supabase
      .from('nodes')
      .select('*');
  
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.json(data);
    }
});

app.get('/nodes/:userId', async (req, res) => {
const { userId } = req.params;

const { data, error } = await supabase
    .from('nodes')
    .select('*')
    .eq('user_id', userId);

if (error) {
    res.status(500).send(error.message);
} else {
    res.json(data);
}
});

app.post('/nodes', async (req, res) => {
const { user_id, username, password, hostname } = req.body;

const { data, error } = await supabase
    .from('nodes')
    .insert([
    {
        user_id,
        username,
        password,
        hostname,
    },
    ]);

if (error) {
    res.status(500).send(error.message);
} else {
    res.json(data);
}
});

app.put('/nodes/:id', async (req, res) => {
const { id } = req.params;
const { user_id, username, password, hostname } = req.body;

const { data, error } = await supabase
    .from('nodes')
    .update({
    user_id,
    username,
    password,
    hostname,
    })
    .eq('id', id);

if (error) {
    res.status(500).send(error.message);
} else {
    res.json(data);
}
});

app.delete('/nodes/:id', async (req, res) => {
const { id } = req.params;

const { data, error } = await supabase
    .from('nodes')
    .delete()
    .eq('id', id);

if (error) {
    res.status(500).send(error.message);
} else {
    res.json(data);
}
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});