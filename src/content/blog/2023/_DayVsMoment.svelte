<script>
  import { onMount } from 'svelte'
  import moment from 'moment'
  import dayjs from 'dayjs'

  const format = 'dddd D MMM YYYY HH:mm:ss'

  let todayMoment
  let yesterdayMoment
  let todayDayjs
  let yesterdayDayjs

  const updateDateValues = () => {
    todayMoment = moment()
    yesterdayMoment = todayMoment.subtract(1, 'day')
    todayDayjs = dayjs()
    yesterdayDayjs = todayDayjs.subtract(1, 'day')
  }

  updateDateValues()

  // Update the date values every second
  onMount(() => {
    const intervalId = setInterval(() => {
      updateDateValues()
    }, 1000)

    // Clean up the interval when the component is destroyed
    return () => {
      clearInterval(intervalId)
    }
  })
</script>

<div>
  <p>
    <strong>Moment.js</strong><br />
    Today: <code>{todayMoment.format(format)}</code> {todayMoment.format(format) === yesterdayMoment.format(format) ? '😱' : '👍'}<br />
    Yesterday: <code>{yesterdayMoment.format(format)}</code>
  </p>

  <p>
    <strong>Day.js</strong><br />
    Today: <code>{todayDayjs.format(format)}</code> {todayDayjs.format(format) === yesterdayDayjs.format(format) ? '😱' : '👍'}<br />
    Yesterday: <code>{yesterdayDayjs.format(format)}</code>
  </p>
</div>
