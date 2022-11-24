import { useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { Button } from 'react-bootstrap';

export const FetchWonGameDataButton = (): JSX.Element => {
  const linkref = useRef<HTMLAnchorElement>(null);

  const handleDownloadClick = async () => {
    const url = import.meta.env.VITE_URL;

    try {
      const response = await fetch(`${url}/wongames`);
      if (!response.ok) {
        console.log('Error fetching won games');
      }

      const wonblob = await response.blob();
      const bloburl = window.URL.createObjectURL(new Blob([wonblob]));

      if (linkref && linkref.current) {
        linkref.current.href = bloburl;
        linkref.current.setAttribute('download', 'games.json');
        linkref.current.click();
      }

      console.log(bloburl);
    } catch (err) {
      console.log('Error fetching data ' + JSON.stringify(err));
    }
  };

  return (
    <>
      <Button onClick={() => handleDownloadClick()} className='mt-1 mb-1'>
        Fetch Won Games Stats
      </Button>
      <a ref={linkref}></a>
    </>
  );
};

export const RefreshDataButton = (): JSX.Element => {
  const queryClient = useQueryClient();

  return (
    <Button onClick={() => queryClient.refetchQueries()} className='mt-1 mb-1'>
      Refresh data
    </Button>
  );
};
