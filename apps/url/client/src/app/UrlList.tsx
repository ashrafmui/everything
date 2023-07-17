import React from 'react';
import { Link, ListItem, UnorderedList } from '@chakra-ui/react';
import { Shortened } from './shortened';

type UrlListProps = {
  urls: Array<Shortened>;
};

export const UrlList: React.FC<UrlListProps> = ({ urls }) => {
  return (
    <UnorderedList id="urlList" textAlign="left">
      {urls.map((u) => (
        <ListItem key={u.short}>
          <Link href={u.short} color="teal.500">
            {u.short}
          </Link>{' '}
          - {u.original}
        </ListItem>
      ))}
    </UnorderedList>
  );
};
