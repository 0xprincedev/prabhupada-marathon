import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { withStyles } from '@material-ui/core/styles'
import styles from './GiversPage.styles'
import { withHandlers } from 'recompose'
import { reduxForm } from 'redux-form'

export default compose(
  // create listener for givers, results go into redux
  firestoreConnect([{ collection: 'givers' }]),
  // map redux state to props
  connect(({ firestore: { ordered } }) => ({
    givers: ordered.givers
  })),
  withStyles(styles),
  withHandlers({
    onSubmit: props => newGiver => {
      const { firestore } = props
      return firestore
        .add(
          { collection: 'givers' },
          {
            ...newGiver,
            createdAt: firestore.FieldValue.serverTimestamp()
          }
        )
        .then(() => {})
        .catch(err => {
          // eslint-disable-next-line
          console.log(err)
        })
    }
  }),
  reduxForm({
    form: 'NEW GIVER',
    // Clear the form for future use (creating another project)
    onSubmitSuccess: (result, dispatch, props) => props.reset()
  })
)
