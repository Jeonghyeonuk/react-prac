import { addDoc, collection, updateDoc  } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components"
import { auth, database, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


const Form = styled.form`
display: flex;
flex-direction: column;
gap: 10px;
`;

const TextArea = styled.textarea`
border: 2px solid white;
padding: 20px;
border-radius: 20px;
font-size: 16px;
color: white;
background-color: black;
width: 100%;
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
resize: none;
&::placeholder {
    font-size: 16px;
}
&:focus{
    outline: none;
    border-color: #1d9bf0;
}
`;

const AttachFileButton = styled.label`
padding: 10px 0;
color : #1d9bf0;
text-align: center;
border-radius: 20px;
border: 1px solid #1d9bf0;
font-size: 14px;
font-weight: 600;
cursor: pointer;
`;

const AttachFileInput = styled.input`
display: none;
`;

const SubmitButton = styled.input`
background-color: #1d9bf0;
color: white;
border: none;
padding: 10px 0;
border-radius: 20px;
font-size: 16px;
cursor: pointer;
&:hover,
&:active {
    opacity: 0.9;
}
`;

function PostTweetForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [tweet, setTweet] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTweet(e.target.value)
    }

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length === 1) {
            setFile(files[0]);
        }
    }

    const onSubmit = async (e:React.FocusEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (!user || isLoading || tweet === "" || tweet.length > 180) return;

        try {
            setIsLoading(true);
            const doc = await addDoc(collection(database, "tweets"), {
                tweet,
                createdAt: Date.now(),
                username : user.displayName ?? "Anonymous",
                userId : user.uid,
            })

            if (file) {
                const locationRef = ref(storage, `tweets/${user.uid}-${user.displayName}/${doc.id}`);
                const result = await uploadBytes(locationRef, file);
                const url = await getDownloadURL(result.ref);
                console.log(url)
                await updateDoc(doc, {
                    photo : url
                })
            }

            setTweet("");
            setFile(null);

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <Form onSubmit={onSubmit}>
            <TextArea required rows={5}
                maxLength={180} onChange={onChange} value={tweet} placeholder="What is happening ? " />
            <AttachFileButton htmlFor="file">{file ? "Photo added" : "Add photo"}</AttachFileButton>
            <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*" />
            <SubmitButton type="submit" value={isLoading ? "Posting..." : "Post Tweet"} />
        </Form>
    )
}

export default PostTweetForm