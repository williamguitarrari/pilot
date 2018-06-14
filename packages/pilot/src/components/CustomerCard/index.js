import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardTitle,
  CardContent,
  Grid,
  Row,
  Col,
} from 'former-kit'
import { mapObjIndexed } from 'ramda'
import Property from '../Property'

const fields = (labels, contents) => mapObjIndexed((label, key) => (
  <Property
    title={label}
    value={contents[key]}
  />
), labels)


const CustomerCard = ({ title, labels, contents }) => {
  const customer = fields(labels, contents)

  return (
    <Card>
      <CardTitle title={title} />
      <CardContent>
        <Grid>
          <Row>
            <Col palm={12} tablet={6} desk={4} tv={4}>
              { customer.name }
            </Col>

            <Col palm={12} tablet={6} desk={4} tv={4}>
              { customer.document_number }
            </Col>

            <Col palm={12} tablet={6} desk={4} tv={4}>
              {customer.birthday}
            </Col>

            <Col palm={12} tablet={6} desk={4} tv={4}>
              {customer.gender}
            </Col>

            <Col palm={12} tablet={6} desk={4} tv={4}>
              {customer.phones}
            </Col>

            <Col palm={12} tablet={6} desk={4} tv={4}>
              {customer.email}
            </Col>

            <Col palm={12} tablet={12} desk={8} tv={8}>
              {customer.street}
            </Col>

            <Col palm={12} tablet={2} desk={1} tv={1}>
              {customer.street_number}
            </Col>

            <Col palm={12} tablet={10} desk={3} tv={3}>
              {customer.complementary}
            </Col>

            <Col palm={12} tablet={8} desk={4} tv={4}>
              {customer.neighborhood}
            </Col>

            <Col palm={12} tablet={4} desk={4} tv={4}>
              {customer.city}
            </Col>

            <Col palm={12} tablet={6} desk={1} tv={1}>
              {customer.state}
            </Col>

            <Col palm={12} tablet={6} desk={3} tv={3}>
              {customer.zipcode}
            </Col>
          </Row>
        </Grid>
      </CardContent>
    </Card>
  )
}

const shape = {
  birthday: PropTypes.string,
  city: PropTypes.string,
  complementary: PropTypes.string,
  document_number: PropTypes.string,
  email: PropTypes.string,
  gender: PropTypes.string,
  name: PropTypes.string,
  neighborhood: PropTypes.string,
  phones: PropTypes.string,
  state: PropTypes.string,
  street_number: PropTypes.string,
  street: PropTypes.string,
  zipcode: PropTypes.string,
}

CustomerCard.propTypes = {
  contents: PropTypes.shape(shape).isRequired,
  labels: PropTypes.shape(shape).isRequired,
  title: PropTypes.string.isRequired,
}

export default CustomerCard
