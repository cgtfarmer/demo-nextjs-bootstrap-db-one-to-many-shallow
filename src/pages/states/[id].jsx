import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Table from 'react-bootstrap/Table';
import Link from 'next/link';
import Spacer from '@/frontend/components/spacer';

function Page() {
  const [state, setState] = useState({});

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchState = async () => {
      const response = await fetch(`/api/states/${id}`, {
        method: 'GET',
      });

      console.log(response);

      if (response.ok) {
        // console.log(await response.text());
        const stateData = await response.json();

        setState(stateData);
      } else {
        console.error(response);
      }
    };

    fetchState();
  }, [id]);

  const handleDelete = async () => {
    const confirmation = window.confirm('Are you sure you sure ?');

    if (confirmation) {
      const response = await fetch(`/api/states/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        router.push('/states');
      } else {
        console.error(response);
      }
    }
  };

  if (state == null) return;

  return (
    <>
      <h1 className="display-6 my-3 mb-4">Show State</h1>

      <Link variant="dark" className="me-auto" href="/states">Back</Link>

      <Spacer />

      <div>
        <Link href={`/states/${id}/edit`}>Edit</Link>
        <span> | </span>
        <Link href="" onClick={() => handleDelete(state.id)}>Delete</Link>
      </div>

      <Table variant='dark' size="md" responsive striped hover className="show-table">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{state.name}</td>
          </tr>
          <tr>
            <th>Symbol</th>
            <td>{state.symbol}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default Page;
