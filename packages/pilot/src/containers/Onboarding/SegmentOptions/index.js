import React, { useState } from 'react'
import PropTypes from 'prop-types'
import MacroSegments from './MacroSegments'
import Segments from './Segments'

const getSegments = (macroSegmentsOptions, macroSegment) => {
  const m = macroSegmentsOptions
    .find(v => v.label === macroSegment)
  return m.value
}

const SegmentOptions = ({
  handleSubmit,
  images,
  notFoundText,
  options,
  t,
}) => {
  const [macroSegment, setMacroSegment] = useState(null)

  const handleMacroSegment = (value) => {
    setMacroSegment(value)
  }

  const handleReturn = () => setMacroSegment(null)

  const handleNotFound = () => handleSubmit('not_found')

  if (macroSegment) {
    return (
      <Segments
        handleReturn={handleReturn}
        handleSubmit={handleSubmit}
        subtitle={macroSegment}
        options={getSegments(options, macroSegment)}
      />
    )
  }

  return (
    <MacroSegments
      handleNotFound={handleNotFound}
      handleSubmit={handleMacroSegment}
      images={images}
      notFoundText={notFoundText}
      options={options.map(v => v.label)}
      t={t}
    />
  )
}

SegmentOptions.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.func).isRequired,
  notFoundText: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  t: PropTypes.func.isRequired,
}

export default SegmentOptions
