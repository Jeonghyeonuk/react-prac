import { auth } from "../firebase"

function home() {
  const logOut = () => {
    auth.signOut();
  }
  return (
    <h1><button onClick={logOut}>Log Out</button></h1>
  )
}

export default home