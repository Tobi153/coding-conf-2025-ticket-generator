import LogoFull from "../../logo-full.svg";
import LinePattern from "../../assets/images/pattern-lines.svg";
import SquigglyLineTop from "../../assets/images/pattern-squiggly-line-top.svg";
import SquigglyLineTopMobile from "../../assets/images/pattern-squiggly-line-bottom-mobile-tablet.svg";
import SquigglyLineBottom from "../../assets/images/pattern-squiggly-line-bottom-desktop.svg";
import SquigglyLineBottomMobile from "../../assets/images/pattern-squiggly-line-bottom-mobile-tablet.svg";
import { useMediaQuery } from "react-responsive";
const HeaderComponent = ({ children }) => {
  const isMobile = useMediaQuery({ query: "(max-width:576px)" });
  return (
    <div className="page-cover">
      <img
        src={SquigglyLineTop}
        alt="line pattern"
        className="squiggly-line-top"
      />
      <img
        src={isMobile ? SquigglyLineBottomMobile : SquigglyLineBottom}
        alt="line pattern"
        className="squiggly-line-bottom"
      />
      <div className="App-container">
        <header className="App-header">
          <img src={LogoFull} alt="logo" />
          {children}
        </header>
      </div>
    </div>
  );
};

export default HeaderComponent;
