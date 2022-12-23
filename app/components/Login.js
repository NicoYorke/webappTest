import { useContext } from 'react'
import { useRouter } from 'next/router'
import OutlineUserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon.js'
import UserContext from './UserContext'
import { Dropdown } from 'flowbite-react'
import Gravatar from 'react-gravatar'

export default function LoggedIn(){
  const router = useRouter()
  const {user, logout} = useContext(UserContext)

  function log(){
    logout()
    router.push('/login')
  }
  function onClick() {
    if (user)
      router.push('/profile')
    else
      router.push('/login')
  }
  return (
    <>
      {user ?
        <>
          <OutlineUserCircleIcon />
          <Gravatar className='rounded-3xl mx-3' email={user.email}></Gravatar>
          <Dropdown label="Account">
            

  <Dropdown.Header>

    <span className="block text-sm font-medium truncate">
      {user.email}
    </span>
  </Dropdown.Header>
  <Dropdown.Item onClick={onClick}>
    Profile
  </Dropdown.Item>
  <Dropdown.Item>
    My articles
  </Dropdown.Item>
  <Dropdown.Item>
    My comments
  </Dropdown.Item>
  <Dropdown.Divider />
  <Dropdown.Item onClick={log}>
    Sign out
  </Dropdown.Item>
</Dropdown>
        </>
        :
        <button onClick={onClick}>
          <OutlineUserCircleIcon />
          Login
        </button>
      }
    </>
  )
}
