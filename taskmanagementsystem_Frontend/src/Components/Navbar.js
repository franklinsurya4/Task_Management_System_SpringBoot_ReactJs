import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ISO6391 from "iso-639-1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faBell,
  faCog,
  faSignInAlt,
  faChartBar,
  faList,
  faRobot,
  faGlobe,
  faChevronDown,
  faBars,
  faXmark
} from "@fortawesome/free-solid-svg-icons";

import "./Navbar.css";

const APP_LOGO =
  "https://is3-ssl.mzstatic.com/image/thumb/Purple126/v4/19/ed/c5/19edc5d4-dffe-7790-1c31-373c4da9eac0/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg";

const Navbar = ({
  activeComponent,
  setActiveComponent,
  darkMode,
  sidebarCollapsed,
  setSidebarCollapsed,
  mobileOpen,
  setMobileOpen,
  isMobile
}) => {

  const { t, i18n } = useTranslation();
  const [showLanguages, setShowLanguages] = useState(false);

  const languages = ["en", "hi", "ta"].map(code => ({
    code,
    name: ISO6391.getName(code)
  }));

  const handleLanguageChange = code => {
    i18n.changeLanguage(code);
    setShowLanguages(false);
  };

  const menuItems = [
    { name:"TaskGrid",label:t("List Of Tasks"),icon:faList },
    { name:"Dashboard",label:t("Dashboard"),icon:faTachometerAlt },
    { name:"Notification",label:t("Notifications"),icon:faBell },
    { name:"Reports",label:t("TaskReports"),icon:faChartBar }
  ];

  const bottomItems = [
    { name:"Language",label:t("Language"),icon:faGlobe },
    { name:"HelpAI",label:t("HelpAI"),icon:faRobot },
    { name:"Settings",label:t("Settings"),icon:faCog },
    { name:"Auth",label:t("Login/Register"),icon:faSignInAlt }
  ];

  const sidebarClass = [
    "sidebar",
    sidebarCollapsed && !isMobile ? "collapsed":"",
    darkMode ? "dark":"light",
    isMobile && mobileOpen ? "mobile-open":"",
    isMobile && !mobileOpen ? "mobile-hidden":""
  ].filter(Boolean).join(" ");

  return (
    <>
    
      {/* MOBILE OVERLAY */}
      {isMobile && mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className={sidebarClass}>

        {/* HEADER */}
        <div className="sidebar-top">

          <div className="sidebar-title">

            <img src={APP_LOGO} alt="logo" className="sidebar-logo"/>

            {(isMobile || !sidebarCollapsed) && (
              <span>{t("TaskTracker")}</span>
            )}

            {isMobile ? (
              <FontAwesomeIcon
                icon={faXmark}
                className="menu-toggle"
                onClick={()=>setMobileOpen(false)}
              />
            ) : (
              <FontAwesomeIcon
                icon={faBars}
                className="menu-toggle"
                onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}
              />
            )}

          </div>

          {/* MAIN MENU */}
          <ul className="nav-items">
            {menuItems.map(item=>(
              <li
                key={item.name}
                className={activeComponent===item.name?"active":""}
                onClick={()=>setActiveComponent(item.name)}
              >
                <FontAwesomeIcon icon={item.icon}/>
                {(isMobile || !sidebarCollapsed) && (
                  <span>{item.label}</span>
                )}
              </li>
            ))}
          </ul>

        </div>

        {/* BOTTOM MENU */}
        <div className="sidebar-bottom">

          <ul className="nav-items">

            {bottomItems.map(item=>(
              <React.Fragment key={item.name}>

                <li
                  onClick={()=>{

                    if(item.name==="Language")
                      setShowLanguages(!showLanguages);
                    else
                      setActiveComponent(item.name);

                  }}
                >
                  <FontAwesomeIcon icon={item.icon}/>

                  {(isMobile || !sidebarCollapsed) && (
                    <span>{item.label}</span>
                  )}

                  {item.name==="Language" && (
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`chevron ${showLanguages?"open":""}`}
                      style={{marginLeft:"auto"}}
                    />
                  )}

                </li>

                {showLanguages && item.name==="Language" && (
                  <div className="language-dropdown">

                    {languages.map(lang=>(
                      <div
                        key={lang.code}
                        className="language-item"
                        onClick={()=>handleLanguageChange(lang.code)}
                      >
                        {lang.name}
                      </div>
                    ))}

                  </div>
                )}

              </React.Fragment>
            ))}

          </ul>

        </div>

      </div>

    </>
  );
};

export default Navbar;