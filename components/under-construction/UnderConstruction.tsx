// Icon Imports
import { TiWarning } from "react-icons/ti";

// Style Imports
import styles from './UnderConstruction.module.scss'

function UnderConstruction(){
  return(
    <>
    <div className={styles.main}>
    <div className={styles.sign}>
    <TiWarning />
    </div>
    <div className={styles.message}>
    <h2> Under Construction </h2>
    <h3> Please check back soon.</h3>
    </div>
    <div className={styles.sign}>
    <TiWarning />
    </div>
    </div>
    </>
  )

}

export default UnderConstruction;