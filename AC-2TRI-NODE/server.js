const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const port = 3000;

const artigosBiologiaPath = path.join(__dirname, 'artigosDeBiologia.json');
const artigosQuimicaPath = path.join(__dirname, 'artigosDeQuimica.json');
const artigosFisicaPath = path.join(__dirname, 'artigosDeFisica.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let artigosBiologiaData = fs.readFileSync(artigosBiologiaPath, 'utf-8');
let artigosBiologia = JSON.parse(artigosBiologiaData);

// Rota para exibir o formulário de inserção de artigos
app.get('/adicionar-artigoBiologia', (req, res) => {
    res.sendFile(path.join(__dirname, 'artigoBiologia.html'));
});

let artigosQuimicaData = fs.readFileSync(artigosQuimicaPath, 'utf-8');
let artigosQuimica = JSON.parse(artigosQuimicaData);

app.get('/adicionar-artigoQuimica', (req, res) => {
    res.sendFile(path.join(__dirname, 'artigoQuimica.html'));
});

let artigosFisicaData = fs.readFileSync(artigosFisicaPath, 'utf-8');
let artigosFisica = JSON.parse(artigosFisicaData);

app.get('/adicionar-artigoFisica', (req, res) => {
    res.sendFile(path.join(__dirname, 'artigoFisica.html'));
});

// Rota para processar o envio do formulário de inserção de artigos de Biologia
app.post('/adicionar-artigoBiologia', (req, res) => {
    const novoArtigoBiologia = req.body;

    if (artigosBiologia.find(artigo => artigo.titulo === novoArtigoBiologia.titulo)) {
        res.send('<h1>Artigo de Biologia já adicionado, não é possível adicionar novamente</h1>');
        return;
    }

    artigosBiologia.push(novoArtigoBiologia);
    salvarDados(artigosBiologia, artigosBiologiaPath);

    res.send(`<h1>Artigo de Biologia "${titulo}" adicionado com sucesso!</h1>`);
});

// Rota para processar o envio do formulário de inserção de artigos de Química
app.post('/adicionar-artigoQuimica', (req, res) => {
    const novoArtigoQuimica = req.body;

    if (artigosQuimica.find(artigo => artigo.titulo === novoArtigoQuimica.titulo)) {
        res.send('<h1>Artigo de Química já adicionado, não é possível adicionar novamente</h1>');
        return;
    }

    artigosQuimica.push(novoArtigoQuimica);
    salvarDados(artigosQuimica, artigosQuimicaPath);

    res.send(`<h1>Artigo de Química "${titulo}" adicionado com sucesso!</h1>`);
});

// Rota para processar o envio do formulário de inserção de artigos de Física
app.post('/adicionar-artigoFisica', (req, res) => {
    const novoArtigoFisica = req.body;

    if (artigosFisica.find(artigo => artigo.titulo === novoArtigoFisica.titulo)) {
        res.send('<h1>Artigo de Física já adicionado, não é possível adicionar novamente</h1>');
        return;
    }

    artigosFisica.push(novoArtigoFisica);
    salvarDados(artigosFisica, artigosFisicaPath);

    res.send(`<h1>Artigo de Física "${titulo}" adicionado com sucesso!</h1>`);
});

// Rotas para exibir os arquivos de Biologia, Química e Física
app.get('/artigos/biologia', (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    const artigosBiologiaData = fs.readFileSync(artigosBiologiaPath, 'utf-8');
    res.end(artigosBiologiaData);
});

app.get('/artigos/quimica', (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    const artigosQuimicaData = fs.readFileSync(artigosQuimicaPath, 'utf-8');
    res.end(artigosQuimicaData);
});

app.get('/artigos/fisica', (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    const artigosFisicaData = fs.readFileSync(artigosFisicaPath, 'utf-8');
    res.end(artigosFisicaData);
});

// Função para salvar dados em um arquivo JSON
function salvarDados(data, filePath) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

//filtrar artigos biologia
function buscarArtigoBiologiaPorTitulo(titulo) {
    return artigosBiologia.find(artigo =>
        artigo.titulo.toLowerCase() === titulo.toLowerCase());
}

app.get('/buscar-artigoBiologia/:titulo', (req, res) => {
    const nomeDoArtigoBiologiaBuscado = req.query.titulo;

    const artigoBiologiaEncontrado = buscarArtigoBiologiaPorTitulo(nomeDoArtigoBiologiaBuscado);

    if (artigoBiologiaEncontrado) {
      const templatePath = path.join(__dirname, 'saidaFiltro.html');
      const templateData = fs.readFileSync(templatePath, 'utf-8');

        const html = templateData
        .replace('{{nome}}', artigoBiologiaEncontrado.nome)
        .replace('{{email}}', artigoBiologiaEncontrado.email)
        .replace('{{titulo}}', artigoBiologiaEncontrado.titulo)
        .replace('{{texto}}', artigoBiologiaEncontrado.texto);

        res.send(html);
    } else {
        res.send(`<h1>Artigo de Biologia não encontrado.</h1>`);
    }
});

//filtrar artigos quimica
function buscarArtigoQuimicaPorTitulo(titulo) {
    return artigosQuimica.find(artigo =>
        artigo.titulo.toLowerCase() === titulo.toLowerCase());
}

app.get('/buscar-artigoQuimica/:titulo', (req, res) => {
    const nomeDoArtigoQuimicaBuscado = req.query.titulo;

    const artigoQuimicaEncontrado = buscarArtigoQuimicaPorTitulo(nomeDoArtigoQuimicaBuscado);

    if (artigoQuimicaEncontrado) {
      const templatePath = path.join(__dirname, 'saidaFiltro.html');
      const templateData = fs.readFileSync(templatePath, 'utf-8');

        const html = templateData
        .replace('{{nome}}', artigoQuimicaEncontrado.nome)
        .replace('{{email}}', artigoQuimicaEncontrado.email)
        .replace('{{titulo}}', artigoQuimicaEncontrado.titulo)
        .replace('{{texto}}', artigoQuimicaEncontrado.texto);

        res.send(html);
    } else {
        res.send(`<h1>Artigo de Química não encontrado.</h1>`);
    }
});

//filtrar artigos física
function buscarArtigoFisicaPorTitulo(titulo) {
    return artigosFisica.find(artigo =>
        artigo.titulo.toLowerCase() === titulo.toLowerCase());
}

app.get('/buscar-artigoFisica/:titulo', (req, res) => {
    const nomeDoArtigoFisicaBuscado = req.query.titulo;

    const artigoFisicaEncontrado = buscarArtigoFisicaPorTitulo(nomeDoArtigoFisicaBuscado);

    if (artigoFisicaEncontrado) {
      const templatePath = path.join(__dirname, 'saidaFiltro.html');
      const templateData = fs.readFileSync(templatePath, 'utf-8');

        const html = templateData
        .replace('{{nome}}', artigoFisicaEncontrado.nome)
        .replace('{{email}}', artigoFisicaEncontrado.email)
        .replace('{{titulo}}', artigoFisicaEncontrado.titulo)
        .replace('{{texto}}', artigoFisicaEncontrado.texto);

        res.send(html);
    } else {
        res.send(`<h1>Artigo de Fisica não encontrado.</h1>`);
    }
});

// Excluir artigos
function excluirArtigo(titulo, artigos, filePath) {
    const artigoIndex = artigos.findIndex(artigo => artigo.titulo.toLowerCase() === titulo.toLowerCase());
    if (artigoIndex !== -1) {
      artigos.splice(artigoIndex, 1);
      salvarDados(artigos, filePath);
      return true;
    }
    return false;
  }
  
  // excluir artigos de química
  app.get('/excluir-artigoQuimica', (req, res) => {
    res.sendFile(path.join(__dirname, 'excluirArtigoQuimica.html'));
  });

  app.post('/excluir-artigoQuimica', (req, res) => {
    const { titulo } = req.body;
    res.send(`
      <script>
      if (confirm('Tem certeza que deseja excluir o artigo "${titulo}"?')) {
        window.location.href = '/excluir-artigoQuimica-confirmado?titulo=${titulo}';
      } else {
        window.location.href = '/excluir-artigoQuimica';
      }
      </script>
    `);
  });
  
  app.get('/excluir-artigoQuimica-confirmado', (req, res) => {
    const { titulo } = req.query;
    if (excluirArtigo(titulo, artigosQuimica, artigosQuimicaPath)) {
      res.send(`<h1>O artigo "${titulo}" foi excluído com sucesso!</h1>`);
    } else {
      res.send('<h1>Artigo de Química não encontrado</h1>');
    }
  });
  
  // excluir artigos de física
  app.get('/excluir-artigoFisica', (req, res) => {
    res.sendFile(path.join(__dirname, 'excluirArtigoFisica.html'));
  });
  app.post('/excluir-artigoFisica', (req, res) => {
    const { titulo } = req.body;
    res.send(`
      <script>
      if (confirm('Tem certeza que deseja excluir o artigo "${titulo}"?')) {
        window.location.href = '/excluir-artigoFisica-confirmado?titulo=${titulo}';
      } else {
        window.location.href = '/excluir-artigoFisica';
      }
      </script>
    `);
  });
  
  app.get('/excluir-artigoFisica-confirmado', (req, res) => {
    const { titulo } = req.query;
    if (excluirArtigo(titulo, artigosFisica, artigosFisicaPath)) {
      res.send(`<h1>O artigo "${titulo}" foi excluído com sucesso!</h1>`);
    } else {
      res.send('<h1>Artigo de Física não encontrado</h1>');
    }
  });

  // excluir artigos de biologia
  app.get('/excluir-artigoBiologia', (req, res) => {
    res.sendFile(path.join(__dirname, 'excluirArtigoBiologia.html'));
  });
  
  app.post('/excluir-artigoBiologia', (req, res) => {
    const { titulo } = req.body;
    res.send(`
      <script>
      if (confirm('Tem certeza que deseja excluir o artigo "${titulo}"?')) {
        window.location.href = '/excluir-artigoBiologia-confirmado?titulo=${titulo}';
      } else {
        window.location.href = '/excluir-artigoBiologia';
      }
      </script>
    `);
  });
  
  app.get('/excluir-artigoBiologia-confirmado', (req, res) => {
    const { titulo } = req.query;
    if (excluirArtigo(titulo, artigosBiologia, artigosBiologiaPath)) {
      res.send(`<h1>O artigo "${titulo}" foi excluído com sucesso!</h1>`);
    } else {
      res.send('<h1>Artigo de Biologia não encontrado</h1>');
    }
  });


  //atualizar artigos de biologia
  app.get('/atualizar-artigoBiologia', (req, res) => {
    res.sendFile(path.join(__dirname, 'atualizarBio.html')); 
});

app.post('/atualizar-artigoBiologia', (req, res) => {
    const { titulo, novoNome, novoEmail, novoTitulo, novoTexto } = req.body;
    const artigoIndex = artigosBiologia.findIndex(artigo => artigo.titulo.toLowerCase() === titulo.toLowerCase());

    if (artigoIndex === -1) {
        res.send('<h1>Artigo de Biologia não encontrado.</h1>');
        return;
    }

    artigosBiologia[artigoIndex].nome = novoNome;
    artigosBiologia[artigoIndex].email = novoEmail;
    artigosBiologia[artigoIndex].titulo = novoTitulo;
    artigosBiologia[artigoIndex].texto = novoTexto;

    salvarDados(artigosBiologia, artigosBiologiaPath);
    res.send(`<h1>Artigo de Biologia "${titulo}" atualizado com sucesso!</h1>`);
});

 //atualizar artigos de quimica
 app.get('/atualizar-artigoQuimica', (req, res) => {
  res.sendFile(path.join(__dirname, 'atualizarQui.html')); 
});

app.post('/atualizar-artigoQuimica', (req, res) => {
  const { titulo, novoNome, novoEmail, novoTitulo, novoTexto } = req.body;
  const artigoIndex = artigosQuimica.findIndex(artigo => artigo.titulo.toLowerCase() === titulo.toLowerCase());

  if (artigoIndex === -1) {
      res.send('<h1>Artigo de Química não encontrado.</h1>');
      return;
  }

  artigosQuimica[artigoIndex].nome = novoNome;
  artigosQuimica[artigoIndex].email = novoEmail;
  artigosQuimica[artigoIndex].titulo = novoTitulo;
  artigosQuimica[artigoIndex].texto = novoTexto;

  salvarDados(artigosQuimica, artigosQuimicaPath);
  res.send(`<h1>Artigo de Química "${titulo}" atualizado com sucesso!</h1>`);
});

//atualizar artigos de fisica
app.get('/atualizar-artigoFisica', (req, res) => {
  res.sendFile(path.join(__dirname, 'atualizarFisi.html')); 
});

app.post('/atualizar-artigoFisica', (req, res) => {
  const { titulo, novoNome, novoEmail, novoTitulo, novoTexto } = req.body;
  const artigoIndex = artigosFisica.findIndex(artigo => artigo.titulo.toLowerCase() === titulo.toLowerCase());

  if (artigoIndex === -1) {
      res.send('<h1>Artigo de Física não encontrado.</h1>');
      return;
  }

  artigosFisica[artigoIndex].nome = novoNome;
  artigosFisica[artigoIndex].email = novoEmail;
  artigosFisica[artigoIndex].titulo = novoTitulo;
  artigosFisica[artigoIndex].texto = novoTexto;

  salvarDados(artigosFisica, artigosFisicaPath);
  res.send(`<h1>Artigo de Física "${titulo}" atualizado com sucesso!</h1>`);
});

// Inicie o servidor
app.listen(port, () => {
    console.log(`Servidor iniciado em http://localhost:${port}`);
});
