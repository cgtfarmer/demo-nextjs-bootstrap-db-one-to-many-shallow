import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';

function Page() {
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      const response = await fetch('/api/states', {
        method: 'GET'
      });

      if (response.ok) {
        const states = await response.json();
        console.log(`States: ${JSON.stringify(states)}`);
        setStates(states);
      } else {
        console.error(response);
      }
    };

    fetchStates();
  }, []);

  const handleDelete = async (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this?');

    if (confirmation) {
      const response = await fetch(`/api/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setStates((prevStates) =>
          prevStates.filter((state) => state.id !== id)
        );
      } else {
        console.error(response);
      }
    }
  };

  const rows = [];
  for (let state of states) {
    const key = `${state.id}`;

    const row = (
      <tr key={key}>
        <td>{state.id}</td>
        <td>{state.name}</td>
        <td>{state.symbol}</td>
        <td>
          <Link href={`/api/states/${state.id}`}>Show</Link>
          <span> | </span>
          <Link href={`/api/states/${state.id}/edit`}>Edit</Link>
          <span> | </span>
          <Link href="" onClick={() => handleDelete(state.id)}>Delete</Link>
        </td>
      </tr>
    );

    rows.push(row);
  }

  return (
    <>
      <h1 className="display-6 my-3 mb-4">States</h1>

      <Button variant="primary" href="/admin/states/new">Create</Button>

      <Table responsive="md" variant='dark' striped hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Symbol</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {rows}
        </tbody>
      </Table>
    </>
  );
}

export default Page;
