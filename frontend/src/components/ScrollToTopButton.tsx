import React, { useEffect, useState } from "react";
import { Fab, Zoom, useTheme } from "@mui/material";
import NavigationIcon from "@mui/icons-material/KeyboardArrowUp";

function ScrollToTopButton() {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  // for animation/transition | Zoom
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  // scroll to top func
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    setIsVisible(window.scrollY > 100); // Adjust the threshold as needed
  };
  // Attach and detach the scroll event listener on mount and unmount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Zoom
      hidden={!isVisible}
      in={isVisible}
      timeout={transitionDuration}
      style={{
        transitionDelay: `${isVisible ? transitionDuration.exit : 0}ms`,
      }}
      unmountOnExit
    >
      <Fab
        onClick={scrollToTop}
        color="primary"
        size="small"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
        }}
      >
        <NavigationIcon />
      </Fab>
    </Zoom>
  );
}

export default ScrollToTopButton;
