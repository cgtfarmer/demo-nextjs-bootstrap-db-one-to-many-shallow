import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Table from 'react-bootstrap/Table';
import Link from 'next/link';
import Spacer from '@/frontend/components/spacer';

function Page() {
  const [state, setState] = useState({});
  const [users, setUsers] = useState([]);

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

    if (id == undefined) return;

    fetchState();
  }, [id]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`/api/states/${id}/users`, {
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

    if (id == undefined) return;

    fetchUsers();
  }, [id]);

  if (state == null || users == null) return;

  const rows = [];
  for (let user of users) {
    const key = `${user.id}`;

    const row = (
      <tr key={key}>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.gender}</td>
        <td>{user.age}</td>
        <td>{user.weight}</td>
        <td>{user.income}</td>
      </tr>
    );

    rows.push(row);
  }

  return (
    <>
      <h1 className="display-6 my-3 mb-4">{state.name} ({state.symbol})</h1>

      <Link variant="dark" className="me-auto" href="/states">Back</Link>

      <Spacer />

      <Table responsive="md" variant='dark' striped hover className="mt-3">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Weight</th>
            <th>Income</th>
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
