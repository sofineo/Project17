// import { Fragment } from "react"
import { Container, Links, Content } from  "./styles"
//JSX é a interface que utilizamos para criar sintexe com o React, basicamente tudo aqui é função e conseguimos escrever HTML dentro de JS graças ao JSX

import { Header } from "../../components/Header"
import { Button } from "../../components/Button"
import { Section } from "../../components/Section"
import { Tag } from "../../components/Tag"
import { ButtonText } from "../../components/ButtonText"

//Sugere-se que o nome da função seja igual da interface que queremos construir (mesmo nome do arquivo). Nome do componente tem que começar com letra maiúscula

export function Details() {
  //Como estamos construir uma interface, precisamos renderizar algo na tela, então sempre temos que ter return e dentro dele será aonde teremos o conteúdo da interface.
  //Antes do return() podemos ter funções, que pode ser inclusive utilizadas no return
  return(
    //Regra, um componente retorna no máximo um elemento, porém, dentro do elemento que ele retorna, podemos ter quantos elementos quisermos, podemos usar uma div ou o fragment (<>). Podemos importar dentro do react, funcionando como um pacote para embrulhar todos os elementos, mas pode usar a versão curta, sem necessidade de importar. Fragment não tem impacto nenhum e não recebe stiliza'ão, diferente da div
    <Container>
      <Header />

      <main>
        <Content>
      <ButtonText title="Excluir nota"/>
          <h1>
            Introdução ao React
          </h1>

        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam quidem illo culpa molestiae ad aliquam repellat eligendi error quod deleniti ex reiciendis velit veniam asperiores alias, eius maiores inventore odit.</p>

      <Section title="Links úteis">
        <Links>
        <li><a href="#">https://www.rocketseat.com.br/</a></li>
        <li><a href="#">https://www.rocketseat.com.br/</a></li>
        </Links>
      </Section>

      <Section title="Marcadores">
        <Tag title="express"/>
        <Tag title="nodejs"/>
      </Section>



      <Button title="Voltar"/>
        </Content>
      </main>
    </Container>
  )
}

