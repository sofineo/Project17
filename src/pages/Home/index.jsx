import { FiPlus, FiSearch } from 'react-icons/fi'
import { Container, Brand, Menu, Search, Content, NewNote } from './styles'

import { Header } from '../../components/Header'
import { ButtonText } from '../../components/ButtonText'
import { Input } from '../../components/Input'
import { Section } from '../../components/Section'
import { Note } from '../../components/Note'
import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom'

export function Home(){
  const [search, setSearch] = useState("")
  const [tags, setTags] = useState([])
  const [tagsSelected, setTagsSelected] = useState([])
  const [notes, setNotes] = useState([])

  const navigate = useNavigate()

  function handleTagSelected(tagName){
    if (tagName === 'all') {
      return setTagsSelected([])
    }

    const alreadySelected = tagsSelected.includes(tagName)
  
    if(alreadySelected){
      const filteredTags = tagsSelected.filter(tag => tag !== tagName)
      setTagsSelected(filteredTags)
    } else {
      setTagsSelected(prevState => [...prevState, tagName])
    }

  }

  function handleNoteDetails(noteId){
    navigate(`/details/${noteId}`)

  }
  //useEffect não aceita async, logo, é necessário criar uma função async, porém, como somente é pra usar dentro do useEffect, pode ser criada dentro e chamar ela dentro mesmo
  useEffect(() => {
    async function fetchTags() {
      const response = await api.get("/tags")
      setTags(response.data)
    }

    fetchTags()
  },[]) //array vazio, pois somente importa buscar 1x as tags

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)
      setNotes(response.data)
    }

    fetchNotes()
  }, [tagsSelected, search])

  return(
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header />

      <Menu>
      <li>
        <ButtonText 
        title="Todos" 
        onClick={() => handleTagSelected("all")}
        isActive={tagsSelected.length === 0} //se tiver algo, será !== de 0, retornando falso
        />
      </li>
        {
          //estratégia para verificar se existe conteúdo
          tags && tags.map(tag => (
            <li key={String(tag.id)}>
              <ButtonText 
              title={tag.name}
              onClick={() => handleTagSelected(tag.name)} 
              isActive={tagsSelected.includes(tag.name)} //retornará verdadeiro se existir o nome no array
              />
            </li>
          ))
          }

      </Menu>

      <Search>
        <Input 
        icon={FiSearch}
        placeholder="Pesquisar pelo título" 
        onChange={e => setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title="Minhas notas">
        {  
          notes.map(note => (
            <Note 
            key={String(note.id)}
            data={note}
            onClick={() => handleNoteDetails(note.id)}
            />
          ))        
        }
        </Section>
      </Content>

      <NewNote to="/new">
        <FiPlus />
        Criar Nota
      </NewNote>
    </Container>
  )
}