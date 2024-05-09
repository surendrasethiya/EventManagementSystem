import HowItWorkCard from './HowItWorkCard/HowItWorkCard'
import styles from './HowitWork.module.css'

export default function HowItWork(){
    const steps=[{
        url:'search.png',
        title:'Browse Venues',
        description:'Check out the best suited Venues, compare photos, special offers and function packages.'
    },
    {
        url:'rupee.png',
        title:'Request Quotes',
        description:'Get custom quotes of your short-listed Venues at the click of GET FREE QUOTES button.'
    },
    {
        url:'calender.png',
        title:'Book a Venue',
        description:'Select and Book the perfect venue in no time at all. Time is money, save both.'
    }
]
    return (
        <div className={styles.howItWorkWrapper}>
        <p>How it Works?</p>
        <div className={styles.howItWorkCardWrapper}>
        {steps.map((step,index)=>(<HowItWorkCard step={step} key={index}/>))}
        </div>
        </div>
    )
}