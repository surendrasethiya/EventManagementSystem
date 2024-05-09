// import React, { useEffect, useState } from "react";
// import styles from "../styles/ProfilePage.module.css";
// import { Link, redirect, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Cookies from "js-cookie";

// export default function ProfilePage({ isLoggedIn, handleLogout, userType }) {
//   const [editable, setEditable] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [userName, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [mobile, setMobile] = useState("");
//   const history = useNavigate();
//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!isLoggedIn) return;
//       try {
//         const instance = axios.create({
//           withCredentials: true,
//           baseURL: "http://localhost:3001",
//         });
//         const response = await instance.get("/user");
//         if (response && response.data && response.data.user) {
//           setUserName(response.data.user.userName);
//           setEmail(response.data.user.email);
//           setMobile(response.data.user.mobile);
//         } else {
//           setMessage("User data not found");
//         }
//       } catch (error) {
//         if (error.response && error.response.status === 401) {
//           history("/login"); // Corrected: redirect to login page if not authenticated
//         } else {
//           setMessage("An error occurred while fetching user data");
//         }
//       }
//     };
//     fetchUserData();
//   }, [isLoggedIn, history]);
  

//   function handleEdit() {
//     setMessage("");
//     setEditable(true);
//   }

//   function handleSave() {
//     setEditable(false);
//     let data = { userName, mobile, email };
//     const instance = axios.create({
//       withCredentials: true,
//       baseURL: "http://localhost:3001",
//     });
//     instance
//       .patch("user/updateMe", data)
//       .then((response) => {
//         setMessage("Update successful");
//       })
//       .catch((error) => {
//         setMessage(error.response.data.status);
//       });
//   }

//   const logout = async () => {
//     try {
//       const instance = axios.create({
//         withCredentials: true,
//         baseURL: "http://localhost:3001",
//       });
//       await instance.get("/user/logout");
//       Cookies.remove("jwt");
//       handleLogout();
//       history("/login"); // redirect to login page after logout
//     } catch (error) {
//       setMessage(error.response.data.status);
//     }
//   };


//   return (
//     <div className={styles.profilePageWrapper}>
//       <div className={styles.profilePageInnerWrapper}>
//         <form>
//           <label htmlFor="userName"> User Name</label>
//           <input
//             type="text"
//             disabled={!editable}
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//           />
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             disabled={!editable}
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <label htmlFor="mobile">Mobile Number</label>
//           <input
//             type="text"
//             maxLength={10}
//             disabled={!editable}
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//           />
//         </form>
//         {message && <p className="error">{message}</p>}
//         {!editable && (
//           <button onClick={handleEdit} className={styles.editButton}>
//             Edit
//           </button>
//         )}
//         {editable && (
//           <button onClick={handleSave} className={styles.saveButton}>
//             Save
//           </button>
//         )}
//         <button onClick={logout} className={styles.saveButton}>
//           Logout
//         </button>
//         <Link to="/updatePassword">
//           <button className={styles.updatepassword}>Update Password</button>
//         </Link>
//         {userType === "admin" && (
//           <Link to="/admin">
//             <button className={styles.dashoboardButton}>Dashboard</button>
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import styles from "../styles/ProfilePage.module.css";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function ProfilePage({ isLoggedIn, handleLogout, userType }) {
  const [editable, setEditable] = useState(false);
  const [message, setMessage] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const history = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/user", {
          withCredentials: true,
        });
        if (response && response.data && response.data.user) {
          const { userName, email, mobile } = response.data.user;
          setUserName(userName);
          setEmail(email);
          setMobile(mobile);
        } else {
          setMessage("User data not found");
        }
      } catch (error) {
        handleLogout();
        history("/login"); // redirect to login page if error or not authenticated
        setMessage("An error occurred while fetching user data");
      }
    };

    fetchUserData();
  }, [isLoggedIn, history, handleLogout]);

  function handleEdit() {
    setMessage("");
    setEditable(true);
  }

  function handleSave() {
    setEditable(false);
    const data = { userName, mobile, email };
    axios
      .patch("http://localhost:3001/user/updateMe", data, {
        withCredentials: true,
      })
      .then(() => {
        setMessage("Update successful");
      })
      .catch((error) => {
        setMessage(error.response.data.status);
      });
  }

  const logout = async () => {
    try {
      await axios.get("http://localhost:3001/user/logout", {
        withCredentials: true,
      });
      Cookies.remove("jwt");
      handleLogout();
      history("/login"); // redirect to login page after logout
    } catch (error) {
      setMessage(error.response.data.status);
    }
  };

  if (!isLoggedIn) {
    return <redirect to="/login" />;
  }

  return (
    <div className={styles.profilePageWrapper}>
      <div className={styles.profilePageInnerWrapper}>
        <form>
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            disabled={!editable}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            disabled={!editable}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="text"
            maxLength={10}
            disabled={!editable}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </form>
        {message && <p className="error">{message}</p>}
        {!editable && (
          <button onClick={handleEdit} className={styles.editButton}>
            Edit
          </button>
        )}
        {editable && (
          <button onClick={handleSave} className={styles.saveButton}>
            Save
          </button>
        )}
        <button onClick={logout} className={styles.saveButton}>
          Logout
        </button>
        <Link to="/updatePassword">
          <button className={styles.updatepassword}>Update Password</button>
        </Link>
        {userType === "admin" && (
          <Link to="/admin">
            <button className={styles.dashoboardButton}>Dashboard</button>
          </Link>
        )}
      </div>
    </div>
  );
}
