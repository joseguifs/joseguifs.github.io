# Portfólio — José Guilherme Ferreira Sobrinho

Site estático (HTML, CSS e JavaScript puro), pronto para o GitHub Pages.

## Como visualizar

Abra `index.html` no navegador. Para servir localmente, execute nesta pasta:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Recursos

- Layout responsivo, com identidade em verde, tipografia Manrope e conteúdo profissional baseado no currículo.
- Tema escuro inicial e opção de tema claro, salva no navegador.
- Projetos com filtros por tecnologia e detalhes expansíveis.
- Ilustrações em CSS relacionadas a cada projeto e ícones de contato.
- Menu para celular, navegação por teclado e respeito à preferência de movimento reduzido.
- Contato e botão de copiar: `joseguilhermeagente007@gmail.com`.

O conteúdo funciona sem instalação de dependências. As fontes do Google Fonts
usam fontes do sistema como alternativa quando não há conexão.

## Como publicar

1. Crie um repositório no GitHub chamado **`joseguifs.github.io`**.
2. Envie os arquivos desta pasta para a raiz do repositório:

   ```bash
   git init
   git add .
   git commit -m "Portfólio inicial"
   git branch -M main
   git remote add origin https://github.com/joseguifs/joseguifs.github.io.git
   git push -u origin main
   ```

3. No repositório, vá em **Settings → Pages**, selecione a branch `main` e a pasta `/ (root)`.
4. Em alguns minutos o site estará em **https://joseguifs.github.io**.

## Estrutura

- `index.html` — conteúdo do portfólio
- `style.css` — estilos responsivos e temas claro/escuro
- `script.js` — menu mobile, tema, filtros, cópia de e-mail e animações
