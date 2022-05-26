# ForAll

ForAll é uma implementação em Android do projeto de pesquisa atualmente desenvolvido por [Lucas Paiva](https://github.com/lucas-fpaiva) e Hugo Lopes, orientados pelos professores Rodolpho Neves e Leonardo Bonato ([DEL-UFV](https://del.ufv.br/docentes-2/)). A pesquisa objetiva construir uma metodologia assistiva para que deficientes auditivos possam dançar forró com o auxílio de vibrações, luzes ou outros estímulos que marquem o compasso da música.

## Funcionalidades

- Protótipo do projeto:
![Prototipo excalidraw da ui e requerimentos do projeto](https://raw.githubusercontent.com/OpenSourceLabUFV/ForAll/v0/prototipo_rapido.png)


- Lista de músicas com compasso conhecido.
- Diferentes sinais assistivos, que podem ser personalizados.
- Rápido e responsivo.
- Poucas dependências.

## 🚀 Começando

### 0. Dependências
- Verifique que possui ```npm``` [(Node.js)](https://nodejs.org/en/) e ```Expo``` [(Expo)](https://expo.dev/), nesta ordem, instalados e funcionando. Caso não estejam, siga os tutoriais nos respectivos sites.

### 1. Primeiro passo

- Clone o repositório:
```
git clone https://github.com/OpenSourceLabUFV/ForAll.git
```

- Entre na pasta:
```
cd ForAll\app
```

- Verificar e instalar dependências e pacotes:
```
yarn install
```

- Configure o ambiente:
Antes de iniciar o desenvolvimente é preciso que as variaveis de ambinte estejam configuradas corretamente, para isso faça uma copia do arquivo ```.env-sample``` e o renomeie para ```.env```. 

### Observações
Ao executar o Expo durante o desenvolvimento é recomendo a utilização do commando ```expo start -c``` a fim de sempre limpar o cache no incio de cada execução. Ao limpar o cache do Expo o APP garante que as variaveis de ambiente serão intanciadas corretamente, dessa forma podendo evitar alguns problemas. Consulte a seção [Variaveis de Ambiente](#Variaveis-de-Ambiente) para mais detalhes.


## Binarios
Os arquivos binarios APKs, estão disponiveis em ```/binaries```

## Projetos semelhantes

Abaixo está uma lista de links interessantes e projetos similares:

- [Dataset](https://github.com/lucas-fpaiva/Forroset) de compassos utilizada para implementar as vibrações.

- Site que implementa uso da [API de Informações do Spotify](https://glitch.com/edit/#!/spotify-audio-analysis).

- Ferramenta semelhante: [Live audio spectrum visualization with React.js components](
https://github.com/matt-eric/web-audio-fft-visualization-with-react-hooks.git)

## Variaveis de Ambiente

|Nome   |Função   |Obrigatoria | Referência
|---|---|---|---|
|  CLEAN_DATA | Limpa o armazenamento de dados do app  |  NÃO | - |
|  SPOTIFY_REDIRECT_URI | Necessário para a conexão com o Spotify | SIM | [Developer Spotify](https://developer.spotify.com/)
|  SPOTIFY_CLIENT_ID |  Necessário para fazer requisições para a api do Spotify | SIM | [Developer Spotify](https://developer.spotify.com/)
|  SPOTIFY_CLIENTE_SECRET |  Necessário para fazer requisições para a api do Spotify | SIM | [Developer Spotify](https://developer.spotify.com/)
|  SPOTIFY_PERMISSION_SCOPE |  Definição das permissões entre o relacionamento da aplicação com o Spotify | SIM | [Developer Spotify Authorization Scopes](https://developer.spotify.com/documentation/general/guides/authorization/scopes/)
