import 'loaders.css/loaders.min.css'

export default ({ text = 'Loading', ...props }) => (
  <div className="Loading" {...props}>
    <div className="loader-inner cube-transition">
      <div />
      <div />
    </div>
    <div className="Loading--Text">{text}</div>
  </div>
)
