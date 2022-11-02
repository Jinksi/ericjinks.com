import 'loaders.css/loaders.min.css'
import styles from './Loading.module.scss'

export default ({ text = 'Loading', ...props }) => (
  <div className={styles.Loading} {...props}>
    <div className="loader-inner cube-transition">
      <div />
      <div />
    </div>
    <div className={styles.LoadingText}>{text}</div>
  </div>
)
