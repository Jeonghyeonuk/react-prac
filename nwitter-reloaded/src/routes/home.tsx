import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import { auth } from "../firebase"


const Wrapper = styled.div`

`;


function home() {
  const logOut = () => {
    auth.signOut();
  }
  return (
    <Wrapper>
    <PostTweetForm></PostTweetForm>
    </Wrapper>
  )
}

export default home