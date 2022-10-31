import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import Yoda from "../../../../assets/images/logo/logo.svg";
import YodaDark from "../../../../assets/images/logo/logo-dark.svg";
import YodaRtl from "../../../../assets/images/logo/logo-rtl.svg";
import YodaRtlDark from "../../../../assets/images/logo/logo-rtl-dark.svg";

import themeConfig from '../../../../configs/themeConfig.jsx';

export default function MenuLogo(props) {
  const customise = useSelector(state => state.customise)

  return (
    <div className="hp-header-logo hp-d-flex hp-align-items-end">
      <Link
        to="/"
        onClick={props.onClose}
      >
        {
          customise.direction == "rtl" ? (
            customise.theme == "light" ? (
              <img className="hp-logo" src={YodaRtl} alt="logo" />
            ) : (
              <img className="hp-logo" src={YodaRtlDark} alt="logo" />
            )
          ) : (
            customise.theme == "light" ? (
              <img className="hp-logo" src={Yoda} alt="logo" />
            ) : (
              <img className="hp-logo" src={YodaDark} alt="logo" />
            )
          )
        }

        <span className="h3 d-font-weight-800 hp-text-color-primary-1 hp-mb-6">.</span>
      </Link>

      <a
        href="https://hypeople-studio.gitbook.io/yoda/change-log"
        target="_blank"
        className="hp-p1-body hp-font-weight-500 hp-text-color-black-40 hp-mb-16 hp-ml-4"
        style={{
          letterSpacing: -1.5
        }}
      >
        v.{themeConfig.version}
      </a>
    </div>
  );
};