import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Store } from '../Store';
import { getError } from '../utils';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import Button from 'react-bootstrap/Button';

export default function ProductCreateScreen() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [numReviews, setReview] = useState('');

  useEffect(() => {}, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        await axios.post(`/api/products/create`, {
            name,
            slug,
            price,
            image,
            category,
            brand,
            countInStock,
            description,
            rating,
            numReviews
        },
        {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success('Product created successfully');
        navigate('/admin/products');
    } catch (err) {
        toast.error(getError(err));
    }
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Create Product</title>
      </Helmet>
      <h1>Create Product</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder='Enter Product Name' required onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="slug">
          <Form.Label>Slug</Form.Label>
          <Form.Control type="text" placeholder='Enter Slug' required onChange={(e) => setSlug(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" placeholder='Enter Category' required onChange={(e) => setCategory(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image File</Form.Label>
          <Form.Control type="text" placeholder='Enter Image File Path' required onChange={(e) => setImage(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control type="text" placeholder='Enter Price' required onChange={(e) => setPrice(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="countInStock">
          <Form.Label>Stock</Form.Label>
          <Form.Control type="text" placeholder='Enter Stock' required onChange={(e) => setStock(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="brand">
          <Form.Label>Brand</Form.Label>
          <Form.Control type="text" placeholder='Enter Brand' required onChange={(e) => setBrand(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="rating">
          <Form.Label>Ratings</Form.Label>
          <Form.Control type="text" placeholder='Enter Ratings' required onChange={(e) => setRating(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="numReviews">
          <Form.Label>No. of Reviews</Form.Label>
          <Form.Control type="text" placeholder='Enter Reviews' required onChange={(e) => setReview(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder='Enter Description' required onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>
        
        <div className="mb-3">
          <Button type="submit">Create</Button>
        </div>
      </Form>
    </Container>
  );
}
