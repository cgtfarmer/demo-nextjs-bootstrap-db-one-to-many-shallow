import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Table from 'react-bootstrap/Table';
import Link from 'next/link';
import Spacer from '@/frontend/components/spacer';

function Page() {
  const [resident, setResident] = useState({});

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchResident = async () => {
      const response = await fetch(`/api/residents/${id}`, {
        method: 'GET',
      });

      console.log(response);

      if (response.ok) {
        // console.log(await response.text());
        const residentData = await response.json();

        setResident(residentData);
      } else {
        console.error(response);
      }
    };

    if (id == undefined) return;

    fetchResident();
  }, [id]);

  const handleDelete = async () => {
    const confirmation = window.confirm('Are you sure you sure ?');

    if (confirmation) {
      const response = await fetch(`/api/residents/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        router.push('/admin/residents');
      } else {
        console.error(response);
      }
    }
  };

  if (resident == null) return;

  return (
    <>
      <h1 className="display-6 my-3 mb-4">Show Resident</h1>

      <Link variant="dark" className="me-auto" href="/admin/residents">Back</Link>

      <Spacer />

      <div>
        <Link href={`/admin/residents/${id}/edit`}>Edit</Link>
        <span> | </span>
        <Link href="" onClick={() => handleDelete(resident.id)}>Delete</Link>
      </div>

      <Table variant='dark' size="md" responsive striped hover className="show-table">
        <tbody>
          <tr>
            <th>First Name</th>
            <td>{resident.firstName}</td>
          </tr>
          <tr>
            <th>Last Name</th>
            <td>{resident.lastName}</td>
          </tr>
          <tr>
            <th>Gender</th>
            <td>{resident.gender}</td>
          </tr>
          <tr>
            <th>Age</th>
            <td>{resident.age}</td>
          </tr>
          <tr>
            <th>Weight</th>
            <td>{resident.weight}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default Page;
