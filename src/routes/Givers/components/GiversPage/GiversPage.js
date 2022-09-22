import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { required } from 'utils/form'
import Button from '@material-ui/core/Button'

export const GiversPage = ({ givers, classes, handleSubmit }) => (
  <div className={classes.container}>
    <span>GiversPage Component</span>
    <pre>{JSON.stringify(givers, null, 2)}</pre>

    <form onSubmit={handleSubmit}>
      <Field
        name="name"
        component={TextField}
        label="GIVER NAME"
        validate={[required]}
      />
      <Button type="submit" color="primary">
        Create
      </Button>
    </form>
  </div>
)

GiversPage.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  givers: PropTypes.object, // from enhancer (firestoreConnect + connect)
  handleSubmit: PropTypes.func // call this to submit
}

export default GiversPage
