import 'loaders.css/loaders.min.css'

export default ({ text = 'Loading', ...props }) => (
  <div className="flex items-center justify-center p-16 relative" {...props}>
    <div className="loader-inner cube-transition absolute left-1/2 top-20 -translate-x-6">
      <div className="!bg-text" />
      <div className="!bg-text" />
    </div>
    <div className="mt-28 font-semibold text-2xl">{text}</div>
  </div>
)
