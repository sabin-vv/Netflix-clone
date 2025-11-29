import "./Banner.css";
import baner from "../../../public/home_page_background_large.jpg";

function Banner() {
  return (
    <div className="banner">
      <img className="banner-image" src={baner} alt="" />
      <div className="banner-content">
        <h1 className="banner-title">Unlimited movies, shows, and more</h1>
        <h2 className="banner-pricetag">Starts at ₹149. Cancel at any time.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <div className="email-subscribe">
          <input
            className="email-input"
            type="text"
            placeholder="Email address"
          />
          <button className="subscription-button">
            Get Started <i class="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
export default Banner;
