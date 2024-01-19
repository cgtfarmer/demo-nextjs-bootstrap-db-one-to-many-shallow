import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';

function Page() {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');

  const router = useRouter();

  const sendCreateStateRequest = async () => {
    const newState = {
      name: name,
      symbol: symbol,
    };

    const response = await fetch('/api/states', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newState)
    });

    if (response.ok) {
      const createdState = await response.json();
      console.log(`Created state: ${JSON.stringify(createdState)}`);

      router.push('/states');
    } else {
      console.error(response);
    }
  };

  return (
    <>
      <h1 className="display-6 my-3 mb-4">Create State</h1>

      <Form className="mt-3">
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>

          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="symbol" className="mt-3">
          <Form.Label>Symbol</Form.Label>
          <Form.Control
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
        </Form.Group>

        <Button className="mt-3" variant="primary" type="button" onClick={sendCreateStateRequest}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Page;
