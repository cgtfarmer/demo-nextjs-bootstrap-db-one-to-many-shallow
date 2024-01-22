import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';

function Page() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [income, setIncome] = useState('');
  const [stateId, setStateId] = useState('');

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchResident = async () => {
      const response = await fetch(`/api/residents/${id}`, {
        method: 'GET',
      });

      console.log(response);

      if (response.ok) {
        const residentData = await response.json();

        setFirstName(residentData.firstName);
        setLastName(residentData.lastName);
        setGender(residentData.gender);
        setAge(residentData.age);
        setWeight(residentData.weight);
        setIncome(residentData.income);
        setStateId(residentData.stateId);
      } else {
        console.error(response);
      }
    };

    if (id == undefined) return;

    fetchResident();
  }, [id]);

  const sendUpdateResidentRequest = async () => {
    const updatedResident = {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      age: age,
      weight: weight,
      income: income,
      stateId: stateId,
    };

    const response = await fetch(`/api/residents/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedResident)
    });

    if (response.ok) {
      const createdResident = await response.json();
      console.log(`Updated resident: ${JSON.stringify(createdResident)}`);

      router.push(`/admin/residents/${id}`);
    } else {
      console.error(response);
    }
  };

  return (
    <>
      <h1 className="display-6 my-3 mb-4">Edit Resident</h1>

      <Form className="mt-3">
        <Form.Group controlId="first-name">
          <Form.Label>First Name</Form.Label>

          <Form.Control
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="last-name" className="mt-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="gender" className="mt-3">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="age" className="mt-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="weight" className="mt-3">
          <Form.Label>Weight</Form.Label>
          <Form.Control
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="income" className="mt-3">
          <Form.Label>Income</Form.Label>
          <Form.Control
            type="text"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="state-id" className="mt-3">
          <Form.Label>State ID</Form.Label>
          <Form.Control
            type="text"
            value={stateId}
            onChange={(e) => setStateId(e.target.value)}
          />
        </Form.Group>

        <Button
          className="mt-3"
          variant="primary"
          type="button"
          onClick={sendUpdateResidentRequest}
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Page;
