import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';

function Page() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [income, setIncome] = useState('');
  const [stateId, setStateId] = useState('');

  const router = useRouter();

  const sendCreateUserRequest = async () => {
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      age: age,
      weight: weight,
      income: income,
      stateId: stateId,
    };

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    });

    if (response.ok) {
      const createdUser = await response.json();
      console.log(`Created user: ${JSON.stringify(createdUser)}`);

      router.push('/users');
    } else {
      console.error(response);
    }
  };

  return (
    <>
      <h1 className="display-6 my-3 mb-4">Create User</h1>

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

        <Button className="mt-3" variant="primary" type="button" onClick={sendCreateUserRequest}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Page;
