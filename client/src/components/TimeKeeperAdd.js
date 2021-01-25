import React from 'react'
import TimeKeeper from 'react-timekeeper'

export const TimeKeeperAdd = ({ time, setTime, setShowTime }) => {

  return (
    <div style={{ position: 'absolute', zIndex: '999' }} >
        <TimeKeeper
          time={time}
          onChange={(data) => setTime(data.formatted12)}
          onDoneClick={() => setShowTime(false)}
          switchToMinuteOnHourSelect
        />
    </div>
  )
}