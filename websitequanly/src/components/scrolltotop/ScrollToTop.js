import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router";
import { ArrowDropUp } from "@mui/icons-material";
import "./ScrollToTop.css";

const ScrollToTop = (props) => {
  const location = useLocation();

  window.onscroll = () => {
    const topbutton = document.getElementById("topBtn");
    if (
      document.body.scrollTop > 300 ||
      document.documentElement.scrollTop > 300
    ) {
      topbutton.style.display = "block";
    } else {
      topbutton.style.display = "none";
    }
  }

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [location]);

  const handleScrollButton = () => {
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  }

  return (
    <>
      {props.children}
      {
        <Button id="topBtn" variant="outline-primary" onClick={handleScrollButton}>
          <ArrowDropUp  style={{fontSize: "1.8rem"}}/>
        </Button>
      }
    </>
  );
};

export default ScrollToTop;
