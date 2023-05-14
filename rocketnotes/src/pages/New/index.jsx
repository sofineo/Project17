import { Container, Form } from "./styles";
import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { TextArea } from "../../components/TextArea"
import { NoteItem } from "../../components/NoteItem"
import { Section } from "../../components/Section"
import { Button } from "../../components/Button"
import { ButtonText } from "../../components/ButtonText"
import { useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";


export function New(){
  const [title, setTitle] = useState("")
  const [descriptions, setDescriptions] = useState("")

  const [links, setLinks] = useState([])
  const [newLink, setNewLink] = useState("")

  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState("")

  const navigate = useNavigate()

  function handleBack() {
    navigate(-1)
  }

  function handleAddLink(){
    setLinks(prevState => [...prevState, newLink])
    setNewLink("") //para ter o status "resetado"
  }

  function handleRemoveLink(deletedLink){
    setLinks(prevState => prevState.filter( link => link !== deletedLink))
  }

  function handleAddTag(){
    setTags(prevState => [...prevState, newTag])
    setNewTag("")
  }

  function handleRemoveTag(deletedTag){
    setTags(prevState => prevState.filter(tag => tag !== deletedTag))
  }

  async function handleNewNote(){
    if(!title) {
      return alert ("Digite o título da nota")
    }
    if(newLink){
      return alert("Você deixou um link no campo para adicionar, mas não clicou em adicionar. Clique para adicionar ou deixe o campo vazio.")
    }
    if(newTag){
      return alert("Você deixou uma tag no campo para adicionar, mas não clicou em adicionar. Clique para adicionar ou deixe o campo vazio.")
    }

    await api.post("/notes/", {
      title,
      descriptions,
      tags,
      links
    })

    alert("Nota criada com sucesso!")
    navigate(-1)
  }
  
  return(
    <Container>
      <Header />
      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText
            title="voltar"
            onClick={handleBack}
            />
          </header>

          <Input 
          placeholder="Título"
          onChange={e => setTitle(e.target.value)}
          />

          <TextArea 
          placeholder="Observações"
          onChange={e => setDescriptions(e.target.value)}
          />

          <Section title="Links úteis">
            {
              links.map((link, index) => (
                <NoteItem 
                //sempre quando tiver um componente que está sendo rederizado por uma lista, é necessário uma key, o mpa também devolve um index que seria a posição do elemento dentro da lista
                key={String(index)}
                value={link}
                onClick={() => handleRemoveLink(link)} //quando se quer passar um parâmetro pra função, não pode apenas chamar a função assim function(parm), deve ser feita por uma arrow fuction, opis se não fizer assim, ele tentará ficar exedutandco de forma automátia e sozinho
                />
              ))
            }
            <NoteItem 
            isNew 
            placeholder="Novo Link"
            value={newLink}
            onChange={e => setNewLink(e.target.value)}
            onClick={handleAddLink}
            />
          </Section>

          <Section title="Marcadores">
            <div className="tags">
            {
              tags.map((tag, index) => (
                <NoteItem 
                  key={String(index)}  
                  value={tag}
                  onClick={()=> handleRemoveTag(tag)}
                  />
              ))
            }
              

            <NoteItem 
              isNew 
              placeholder="Nova Tag"
              onChange={e => setNewTag(e.target.value)}
              value={newTag}
              onClick={handleAddTag}
              />
            </div>
          </Section>

          <Button 
          title="Salvar"
          onClick={handleNewNote}
            />
        </Form>
      </main>
    </Container>
  )
}