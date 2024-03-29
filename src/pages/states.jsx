import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Link from 'next/link';

function Page() {
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      const response = await fetch('/api/states/summary', {
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

  const rows = [];
  for (let state of states) {
    const key = `${state.id}`;

    const row = (
      <tr key={key}>
        <td>{state.name}</td>
        <td>{state.symbol}</td>
        <td>{state.population}</td>
        <td>{state.avgAge}</td>
        <td>{state.avgWeight}</td>
        <td>{state.avgIncome}</td>
        <td>
          <Link href={`/states/${state.id}`}>Show</Link>
        </td>
      </tr>
    );

    rows.push(row);
  }

  return (
    <>
      <h1 className="display-6 my-3 mb-4">States</h1>

      <Table responsive="md" variant='dark' striped hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Population</th>
            <th>Avg Age</th>
            <th>Avg Weight</th>
            <th>Avg Income</th>
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
