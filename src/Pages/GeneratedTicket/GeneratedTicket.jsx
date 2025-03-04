import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import { useFormContext } from "../../Context/FormContext";
import TicketPattern from "../../assets/images/pattern-ticket.svg";
import LogoFull from "../../logo-full.svg";
import iconGithub from "../../assets/images/icon-github.svg";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const GeneratedTicket = () => {
  const { avatar, name, email, githubUserName } = useFormContext();
  const navigate = useNavigate();
  const location = useLocation();

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // const generatedTicketId = () => {
  //   return
  // };

  const ticketId = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");

  const eventDate = new Date();
  const formattedDate = formatDate(eventDate);

  useEffect(() => {
    const hasRequiredData =
      name && email && avatar && githubUserName && ticketId;

    if (!hasRequiredData && location.pathname === "/ticket") {
      navigate("/");
    }
  }, [
    name,
    email,
    avatar,
    githubUserName,
    navigate,
    ticketId,
    location.pathname,
  ]);

  useEffect(() => {
    let url;
    if (avatar) {
      url = URL.createObjectURL(avatar);
    }

    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [avatar]);

  if (!name || !email || !ticketId) {
    return null;
  }

  return (
    <div className="generated-ticket">
      <HeaderComponent>
        <>
          <h1 className="hero-main-text">
            Congrats, <span className="gradient-text">{name}!</span> Your ticket
            is ready.
          </h1>
          <p className="hero-sub-text sub-text">
            We've emailed your ticket to <span className="email">{email} </span>
            and will send updates in the run up to the event.
          </p>
        </>
      </HeaderComponent>
      <div className="ticket-container">
        <img
          src={TicketPattern}
          alt="ticket-pattern"
          className="ticket-pattern"
        />

        <div className="ticket-details">
          <img src={LogoFull} alt="logo" className="ticket-logo" />
          <div className="event-details">
            <p className="event-date">{formattedDate}</p> <span>/</span>
            <p className="event-location">Lekki, Lagos</p>
          </div>
          <div className="ticket-user-details">
            <img
              src={URL?.createObjectURL(avatar)}
              alt="avatar-img"
              className="ticket-avatar"
            />
            <div className="ticket-user-text">
              <h2 className="ticket-username">{name}</h2>
              <div className="ticket-github">
                <img
                  src={iconGithub}
                  alt="icon-github"
                  className="ticket-icon-github"
                />
                <span className="github-username">@{githubUserName}</span>
              </div>
              <div className="user-ticket-id">#{ticketId}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratedTicket;
