# Executar o Web Service

**Atenção:** Certifique-se que tem o [Ruby 1.9][ruby] ou superior instalado.

Primeiro, instale o gerenciador de pacotes [Bundler][bundler].

    $ gem install bundler

Depois, à partir do diretório raíz do todo-list, execute o comando abaixo:

    $ bundle install

Após instalar todas as dependências, você poderá iniciar o servidor.

    $ rackup

Acesse-o através do link <http://localhost:9292/>.

# Compilar assets do projeto

**Atenção:** Certifique-se que tem o [Node.js][nodejs] instalado.

Após instalar o Node.js, você vai precisar do [Grunt][grunt].

    $ npm install grunt-cli -g

Instale as dependências do projeto:

    $ npm install

# Executando automaticamente

Sempre que os arquivos forem alterados, podemos executar a exportação dos assets automaticamente.

    $ grunt watch

Esta tarefa Grunt não funciona muito bem no Vagrant, então você pode usar o [Guard][guard].

    $ bundle exec guard -Bip

[nodejs]: http://nodejs.org
[ruby]: http://ruby-lang.org
[bundler]: http://gembundler.com/
[grunt]: http://gruntjs.com
[guard]: http://rubygems.org/gems/guard
