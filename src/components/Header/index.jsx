import { RiShutDownLine} from 'react-icons/ri'
import { Container, Profile, Logout } from "./styles";
import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';
import avatarPlaceHolder from '../../assets/avatar_placeholder.svg'
import { useNavigate } from 'react-router-dom';

export function Header(){
  const { signOut, user} = useAuth()

  const navigate = useNavigate()

  function handleSingOut() {
    navigate("/")
    signOut()
  }

  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceHolder

  return(
    <Container>
      <Profile to="/profile">
        <img 
        src={avatarUrl}
        alt={`Foto de ${user.name}`}
        />
        <div>
          <span>Bem-vindo,</span>
          <strong>{user.name}</strong>
        </div>
      </Profile>

      <Logout onClick={handleSingOut}>
        <RiShutDownLine />
      </Logout>
    </Container>
  )
}
