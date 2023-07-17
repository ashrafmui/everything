import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Container,
  Text,
} from '@chakra-ui/react';
import { Shortened } from './shortened';
import { ShortenUrlForm } from './ShortenUrlForm';
import { UrlList } from './UrlList';

export function App() {
  const [urls, setUrls] = useState<Array<Shortened>>([]);

  const requestShortUrl = async (inputUrl: string) => {
    const response = await axios.post('http://localhost:3333/api/shorten', {
      original: inputUrl,
    });

    const newUrl = response.data as Shortened;

    setUrls([newUrl, ...urls]);
  };

  return (
    <Container maxWidth="4xl" marginBlock={10} textAlign="center">
      <Text fontSize="4xl">My URL Shortener</Text>
      <ShortenUrlForm requestShortUrl={requestShortUrl} />
      <UrlList urls={urls} />
    </Container>
  );
}

export default App;

// import React,{useState, useCallback, FormEvent} from 'react';

// import axios from 'axios';

// import {
//   Button,
//   Container,
//   Text,
//   Input,
//   UnorderedList,
//   ListItem,
//   Link,
//   Center,
// } from '@chakra-ui/react';

// type Shortened = {
//   original: string;
//   short: string;
// };

// export function App() {
//   const [urls, setUrls] = useState<Array<Shortened>>([]);
//   const [inputUrl, setInputUrl] = useState<string>('');
//   const onSubmit = useCallback(
//     async (event: FormEvent) => {
//       event.preventDefault();

//       const response = await axios.post('http://localhost:3333/api/shorten',{
//         original: inputUrl,
//       })

//       const newUrl = response.data as Shortened;

//       setUrls([newUrl, ...urls]);
//       setInputUrl('');
//     },
//     [urls, setUrls, inputUrl, setInputUrl]
//   );

//   return (
//     <Container maxWidth="4xl" marginBlock={10} textAlign="center">
//       <Text fontSize="6xl">My URL Shortener</Text>
//       <form onSubmit={onSubmit}>
//         <Input
//           id = "url-input"
//           size="sm"
//           marginBlock={10}
//           value={inputUrl}
//           onChange={(e) => {
//             setInputUrl(e.target.value);
//           }}
//           placeholder="input a URL please"
//         />
//         <Button id="submit-btn" type="submit" colorScheme="red" size="lg">
//           Generate
//         </Button>
//       </form>

//       <UnorderedList id="url-list" textAlign="left">
//         {urls.map((u) => (
//           <ListItem>
//             <Link href={u.short} color="teal.500">
//               {u.short}
//             </Link>{' '}
//             - {u.original}
//           </ListItem>
//         ))}
//       </UnorderedList>
//     </Container>
//   );
// }

// export default App;