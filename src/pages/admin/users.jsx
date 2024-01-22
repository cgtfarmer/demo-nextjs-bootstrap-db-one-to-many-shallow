import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';

function Page() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users', {
        method: 'GET'
      });

      if (response.ok) {
        const users = await response.json();
        console.log(`Users: ${JSON.stringify(users)}`);
        setUsers(users);
      } else {
        console.error(response);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this?');

    if (confirmation) {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== id)
        );
      } else {
        console.error(response);
      }
    }
  };

  const rows = [];
  for (let user of users) {
    const key = `${user.id}`;

    const row = (
      <tr key={key}>
        <td>{user.id}</td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.gender}</td>
        <td>{user.age}</td>
        <td>{user.weight}</td>
        <td>{user.income}</td>
        <td>{user.stateId}</td>
        <td>
          <Link href={`/admin/users/${user.id}`}>Show</Link>
          <span> | </span>
          <Link href={`/admin/users/${user.id}/edit`}>Edit</Link>
          <span> | </span>
          <Link href="" onClick={() => handleDelete(user.id)}>Delete</Link>
        </td>
      </tr>
    );

    rows.push(row);
  }

  return (
    <>
      <h1 className="display-6 my-3 mb-4">Users</h1>

      <Button variant="primary" href="/admin/users/new">Create</Button>

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
