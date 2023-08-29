import SideBar from "./Sidebar";
import './Pricing.css';

function Pricing() {
  return (
    <>

      <div className="AllPage">
        <SideBar />
        <div className="contain">
          <h3 className="title">Course Price Tier</h3>
          <p className="pricing-details">Please select the price tier for your course below and click 'Save'. The list price that students will see in other currencies is determined using the price tier matrix. If you intend to offer your course for free the total length of video content must be less than 2 hours.
          </p>
          <select required="" aria-invalid="false" className="currency-select">
            <option>AUD</option>
            <option>BRL</option>
            <option>CAD</option>
            <option>CLP</option>
            <option>COP</option>
            <option>EGP</option>
            <option>EUR</option>
            <option>GBP</option>
            <option>IDR</option>
            <option>ILS</option>
            <option>INR</option>
            <option>JPY</option>
            <option>KRW</option>
            <option>MXN</option>
            <option>MYR</option>
            <option>NGN</option>
            <option>NOK</option>
            <option>PEN</option>
            <option>PHP</option>
            <option>PLN</option>
            <option>RON</option>
            <option>RUB</option>
            <option>SGD</option>
            <option>THB</option>
            <option>TRY</option>
            <option>TWD</option>
            <option selected>USD</option>
            <option>VND</option>
            <option>ZAR</option>
          </select>
        </div>
      </div >
    </>
  )
}
export default Pricing;