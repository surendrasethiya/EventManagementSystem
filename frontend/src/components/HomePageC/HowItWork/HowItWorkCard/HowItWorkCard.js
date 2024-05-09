import styles from './HowItWorkCard.module.css'

export default function HowItWorkCard({step}) {
    return (
        <div className={styles.howItWorkCardWrapper}>
            <img src={step.url} alt='icon'/>
            <p className={styles.howItWorkCardWrapperP}>{step.title}</p>
            <p className={styles.howItWorkCardWrapperP2}>{step.description}</p>
        </div>
    )
}