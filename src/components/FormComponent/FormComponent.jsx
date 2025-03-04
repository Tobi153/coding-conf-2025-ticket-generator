import "./FormComponent.css";
import "../../styles.css";
import { useEffect, useState } from "react";
import { ReactComponent as IconInfo } from "../../assets/images/icon-info.svg";
import IconUpload from "../../assets/images/icon-upload.svg";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../../Context/FormContext";

const FormComponent = () => {
  const {
    avatar,
    setAvatar,
    name,
    setName,
    email,
    setEmail,
    githubUserName,
    setGithubUserName,
  } = useFormContext();
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const messages = {
    fullName: {
      defaultMessage: "",
      errorMessage: "Please enter your full name.",
    },
    avatar: {
      defaultMessage: "Upload your photo (JPG or PNG, max size: 500KB)",
      errorMessage: "File too large. Please upload a photo under 500KB",
    },
    email: {
      defaultMessage: "",
      errorMessage: "Please enter a valid email address",
    },
    github: {
      defaultMessage: "",
      errorMessage: "Please enter a valid github username",
    },
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateAvatar = (file) => {
    if (!file) return false;
    return file.size <= 500 * 1024;
  };

  const validateForm = () => {
    const newErrors = {};

    // Avatar validation
    if (avatar && !validateAvatar(avatar)) {
      newErrors.avatar = messages.avatar.errorMessage;
    } else if (!avatar) {
      newErrors.avatar = "Please upload an avatar";
    }

    // Name validation
    if (!name.trim()) {
      newErrors.name = messages.fullName.errorMessage;
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Please enter an email address";
    } else if (!validateEmail(email)) {
      newErrors.email = messages.email.errorMessage;
    }

    // Github validation
    if (!githubUserName.trim()) {
      newErrors.github = messages.github.errorMessage;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if there is no error
  };

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 500 * 1024) {
        setErrors((err) => ({
          ...err,
          avatar: messages.avatar.errorMessage,
        }));
        setAvatar(null);
      } else {
        setAvatar(file);
        setErrors((err) => ({
          ...err,
          avatar: null,
        }));
      }
    }
  };

  const handleName = (e) => {
    const newName = e.target.value;
    setName(newName);
    setErrors((err) => ({
      ...err,
      name: newName.trim() ? null : err.name,
    }));
  };

  const handleEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setErrors((err) => ({
      ...err,
      email: newEmail.trim() ? null : err.email,
    }));
  };

  const handleGithubUserName = (e) => {
    const newGithubUserName = e.target.value;
    setGithubUserName(newGithubUserName);
    setErrors((err) => ({
      ...err,
      githubUserName: newGithubUserName.trim() ? null : err.github,
    }));
  };

  const handleRemoveImg = () => {
    setAvatar(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully");
      navigate("/ticket");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  // Memory cleanup
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

  return (
    <form
      className="form-container"
      onSubmit={handleSubmit}
      onKeyDown={handleKeyPress}
    >
      <div className="input-group avatar-group">
        <label htmlFor="avatar">Upload Avatar</label>
        <input
          type="file"
          name="avatar"
          id="avatar"
          title="Drag or drop your file here"
          accept=".jpg, .jpeg, .png"
          onChange={handleAvatar}
        ></input>
        {!avatar ? (
          <p className="avatar-text">Drag and drop or click to upload</p>
        ) : (
          <div className="avatar-buttons">
            <label className="btn-remove-img" onClick={handleRemoveImg}>
              Remove image
            </label>
            {/* <label htmlFor="avatar"> */}
            <label htmlFor="avatar" className="btn-change-img">
              Change image
            </label>
            {/* </label> */}
          </div>
        )}
        <label htmlFor="avatar" className="img-upload">
          <img
            src={avatar ? URL.createObjectURL(avatar) : IconUpload}
            alt="avatar-upload"
            className={avatar ? "avatar icon-upload" : "icon-upload"}
          />
        </label>

        <span className={errors.avatar ? "message error" : "message"}>
          {!errors.avatar && !avatar ? (
            <>
              <IconInfo className="icon-info" />
              {messages.avatar.defaultMessage}
            </>
          ) : (
            ""
          )}
          {errors.avatar && (
            <>
              <IconInfo className="icon-info" />
              {errors.avatar || messages.avatar.defaultMessage}
            </>
          )}
        </span>
      </div>

      <div className="input-group name-group">
        <label htmlFor="full-name">Full Name</label>
        <input
          type="text"
          name="full-name"
          id="full-name"
          autoComplete="off"
          value={name}
          onChange={handleName}
        ></input>
        <span className={errors.name ? "message error" : "message"}>
          {errors.name ? (
            <>
              <IconInfo className="icon-info" /> {errors.name}
            </>
          ) : (
            ""
          )}
        </span>
      </div>

      <div className="input-group email-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          placeholder="example@email.com"
          autoComplete="off"
          onChange={handleEmail}
          onClick={validateEmail}
        ></input>
        <span className="error message">
          {errors.email ? (
            <>
              <IconInfo className="icon-info" /> {errors.email}
            </>
          ) : (
            ""
          )}
        </span>
      </div>

      <div className="input-group github-group">
        <label htmlFor="github">GitHub Username</label>
        <input
          type="text"
          name="github"
          id="github"
          placeholder="@yourusername"
          autoComplete="off"
          value={githubUserName}
          onChange={handleGithubUserName}
        ></input>
        <span className="error message">
          {errors.github ? (
            <>
              <IconInfo className="icon-info" /> {errors.github}
            </>
          ) : (
            ""
          )}
        </span>
      </div>

      <button type="button" onClick={handleSubmit}>
        Generate My Ticket
      </button>
    </form>
  );
};

export default FormComponent;
