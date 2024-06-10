import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { FaStar } from 'react-icons/fa'

const ReviewModal = ({ show, handleCloseModal, handleSubmitData }) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const handleRatingChange = (value) => {
    setRating(value)
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const handleSubmitReview = () => {
    handleSubmitData({ rating, comment })
  }

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Leave a Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="rating">
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => handleRatingChange(ratingValue)}
                  />
                  <FaStar
                    color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
                  />
                </label>
              )
            })}
          </Form.Group>
          <Form.Group controlId="comment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={handleCommentChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmitReview}>
          Submit Review
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ReviewModal
