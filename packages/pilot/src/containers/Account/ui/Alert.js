import React from 'react'
import styled from 'styled-components'
import MUIAlert from '@material-ui/lab/Alert'

const Alert = styled(props => <MUIAlert {...props} />)`
  margin-bottom: 8px;

  &.MuiAlert-standardError {
    align-items: center;
    background-color: #fbe5ec;
    color: #df285f;
    display: flex;
  }

  &.MuiAlert-standardError .MuiAlert-icon {
    color: #df285f;
  }
`

export default Alert
