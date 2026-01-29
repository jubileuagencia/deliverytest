# Lista de Testes Manual para Verificação da Componentização

Após a refatoração, execute os seguintes testes para garantir que tudo continua funcionando como esperado.

## 1. Página Inicial (Home)
- [ ] **Barra de Busca**: Verifique se a barra "Buscar produtos frescos..." é exibida e se, ao clicar, você é redirecionado para a página `/busca`.
- [ ] **Banner**: Verifique se o banner "Abasteça sua loja - 30% OFF" é exibido com o botão "Peça agora".
- [ ] **Categorias**: Verifique se a lista de categorias aparece horizontalmente e se clicar em uma (ex: Verduras) leva para a página correta (`/categoria/Verduras` etc).
- [ ] **Ofertas do Dia**: Verifique se os produtos em oferta continuam aparecendo e se é possível adicionar ao carrinho.
- [ ] **Navegação Inferior**: Verifique se a barra inferior (Início, Pedidos, Favoritos, Painel) está fixa no rodapé e com "Início" selecionado.

## 2. Página de Categoria
- [ ] **Cabeçalho**: Ao entrar em uma categoria, verifique se aparece o botão "Voltar" e o nome da categoria no topo.
- [ ] **Voltar**: Clique em "Voltar" e confirme que retorna à Home.
- [ ] **Grade de Produtos**: Verifique se os produtos são exibidos em duas colunas.
- [ ] **Adicionar ao Carrinho**: Teste adicionar um produto ao carrinho a partir desta página.

## 3. Página de Busca
- [ ] **Input**: Digite "tomate" (ou outro termo).
- [ ] **Resultados**: Verifique se os resultados aparecem.
- [ ] **Grid**: Verifique se a exibição dos resultados está alinhada (agora usando o mesmo componente de grid das categorias).
- [ ] **Adicionar ao Carrinho**: Teste adicionar um produto encontrado ao carrinho.

## 4. Página de Login
- [ ] **Acesso**: Vá para `/login` (clicando em "Entrar" no menu ou direto na URL se não houver link no menu ainda).
- [ ] **Visual**: Verifique se o formulário aparece centralizado no estilo "vidro" (glassmorphism).
- [ ] **Alternar Modo**: Clique em "Cadastrar" e "Entrar" e verifique se o título e o botão mudam.
- [ ] **Digitação**: Tente digitar email e senha.

## 5. Regressão Geral
- [ ] **Carrinho**: Verifique se o contador do carrinho no cabeçalho atualiza corretamente ao adicionar itens de qualquer página.
