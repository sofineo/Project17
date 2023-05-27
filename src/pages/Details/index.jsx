// import { Fragment } from "react"
import { Container, Links, Content } from  "./styles"
//JSX é a interface que utilizamos para criar sintexe com o React, basicamente tudo aqui é função e conseguimos escrever HTML dentro de JS graças ao JSX

import { Header } from "../../components/Header"
import { Button } from "../../components/Button"
import { Section } from "../../components/Section"
import { Tag } from "../../components/Tag"
import { ButtonText } from "../../components/ButtonText"

import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "../../services/api"

//Sugere-se que o nome da função seja igual da interface que queremos construir (mesmo nome do arquivo). Nome do componente tem que começar com letra maiúscula

export function Details() {
  const params = useParams()
  const [data, setData] = useState(null)

  const navigate = useNavigate()

  function handleBack(){
    navigate(-1) //voltar pelo histórico de navegação
  }

  async function handleRemoveNote(){
    const confirm = window.confirm("Deseja realmente remover a nota?")

    if (confirm) {
      await  api.delete(`/notes/${params.id}`)
      navigate(-1)
    }
  }

  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data)
    }

    fetchNote()
  }, [])
  //Como estamos construir uma interface, precisamos renderizar algo na tela, então sempre temos que ter return e dentro dele será aonde teremos o conteúdo da interface.
  //Antes do return() podemos ter funções, que pode ser inclusive utilizadas no return
  return(
    //Regra, um componente retorna no máximo um elemento, porém, dentro do elemento que ele retorna, podemos ter quantos elementos quisermos, podemos usar uma div ou o fragment (<>). Podemos importar dentro do react, funcionando como um pacote para embrulhar todos os elementos, mas pode usar a versão curta, sem necessidade de importar. Fragment não tem impacto nenhum e não recebe stiliza'ão, diferente da div
    <Container>
      <Header />

     { 
      data && //se tiver conteúdo, mostrará, se não, não terá nada
     <main>
        <Content>
      <ButtonText 
      title="Excluir nota"
      onClick={handleRemoveNote}
      />
          <h1>
            {data.title}
          </h1>

        <p>
          {data.descriptions}
          </p>

      { data.links &&
      <Section title="Links úteis">
        <Links>
          {
            data.links.map(link => (
              <li key={String(link.id)}>
                <a 
                href={link.url}
                target="_blank">
                {link.url}
                </a>
              </li>
            ))
          }
        </Links>
      </Section>
      }

      { data.tags &&
      <Section title="Marcadores">
        { 
          data.tags.map(tag => (
            <Tag 
            key={String(tag.id)}
            title={tag.name}
            />
          ))
        }
      </Section>}



      <Button 
      title="Voltar"
      onClick={handleBack}
      />
        </Content>
      </main>}
    </Container>
  )
}

