import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';

function Page() {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    const fetchResidents = async () => {
      const response = await fetch('/api/residents', {
        method: 'GET'
      });

      if (response.ok) {
        const residents = await response.json();
        console.log(`Residents: ${JSON.stringify(residents)}`);
        setResidents(residents);
      } else {
        console.error(response);
      }
    };

    fetchResidents();
  }, []);

  const handleDelete = async (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this?');

    if (confirmation) {
      const response = await fetch(`/api/residents/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setResidents((prevResidents) =>
          prevResidents.filter((resident) => resident.id !== id)
        );
      } else {
        console.error(response);
      }
    }
  };

  const rows = [];
  for (let resident of residents) {
    const key = `${resident.id}`;

    const row = (
      <tr key={key}>
        <td>{resident.id}</td>
        <td>{resident.firstName}</td>
        <td>{resident.lastName}</td>
        <td>{resident.gender}</td>
        <td>{resident.age}</td>
        <td>{resident.weight}</td>
        <td>{resident.income}</td>
        <td>{resident.stateId}</td>
        <td>
          <Link href={`/admin/residents/${resident.id}`}>Show</Link>
          <span> | </span>
          <Link href={`/admin/residents/${resident.id}/edit`}>Edit</Link>
          <span> | </span>
          <Link href="" onClick={() => handleDelete(resident.id)}>Delete</Link>
        </td>
      </tr>
    );

    rows.push(row);
  }

  return (
    <>
      <h1 className="display-6 my-3 mb-4">Residents</h1>

      <Button variant="primary" href="/admin/residents/new">Create</Button>

      <Table responsive="md" variant='dark' striped hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Weight</th>
            <th>Income</th>
            <th>State ID</th>
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
