import SideBar from "./Sidebar";
import './Pricing.css';

function Pricing() {
  return (
    <>

      <div className="AllPage">
        <SideBar />
        <div className="contain">
          <h2 className="price-heading mb-3">Pricing</h2>
          <hr className="mb-4" />
          <h3 className="title">Course Price Tier</h3>
          <p className="pricing-details">Please select the price tier for your course below and click 'Save'. The list price that students will see in other currencies is determined using the price tier matrix. If you intend to offer your course for free the total length of video content must be less than 2 hours.
          </p>
          <div className="price-container d-flex gap-3">
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
            <select required aria-invalid="false" className="tier-select">
              <option selected hidden disabled className=''>Select</option>
              <option>Free</option>
              <option>19.99$ (tier 1)</option>
              <option>24.99$ (tier 2)</option>
              <option>29.99$ (tier 3)</option>
              <option>34.99$ (tier 4)</option>
              <option>39.99$ (tier 5)</option>
              <option>44.99$ (tier 6)</option>
              <option>49.99$ (tier 7)</option>
              <option>54.99$ (tier 8)</option>
              <option>59.99$ (tier 9)</option>
              <option>64.99$ (tier 10)</option>
              <option>69.99$ (tier 11)</option>
              <option>74.99$ (tier 12)</option>
              <option>79.99$ (tier 13)</option>
              <option>84.99$ (tier 14)</option>
              <option>89.99$ (tier 15)</option>
              <option>94.99$ (tier 16)</option>
              <option>99.99$ (tier 17)</option>
              <option>109.99$ (tier 18)</option>
              <option>119.99$ (tier 19)</option>
              <option>124.99$ (tier 20)</option>
              <option>129.99$ (tier 21)</option>
              <option>139.99$ (tier 22)</option>
              <option>149.99$ (tier 23)</option>
              <option>159.99$ (tier 24)</option>
              <option>169.99$ (tier 25)</option>
              <option>174.99$ (tier 26)</option>
              <option>179.99$ (tier 27)</option>
              <option>189.99$ (tier 28)</option>
              <option>199.99$ (tier 29)</option>

            </select>
            <button className="price-save">Save</button>
          </div>
        </div>
      </div >
    </>
  )
}
export default Pricing;