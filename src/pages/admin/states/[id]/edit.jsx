import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';

function Page() {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchState = async () => {
      const response = await fetch(`/api/states/${id}`, {
        method: 'GET',
      });

      console.log(response);

      if (response.ok) {
        const stateData = await response.json();

        setName(stateData.name);
        setSymbol(stateData.symbol);
      } else {
        console.error(response);
      }
    };

    if (id == undefined) return;

    fetchState();
  }, [id]);

  const sendUpdateStateRequest = async () => {
    const updatedState = {
      name: name,
      symbol: symbol,
    };

    const response = await fetch(`/api/states/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedState)
    });

    if (response.ok) {
      const createdState = await response.json();
      console.log(`Updated state: ${JSON.stringify(createdState)}`);

      router.push(`/states/${id}`);
    } else {
      console.error(response);
    }
  };

  return (
    <>
      <h1 className="display-6 my-3 mb-4">Edit State</h1>

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

        <Button className="mt-3" variant="primary" type="button" onClick={sendUpdateStateRequest}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Page;
