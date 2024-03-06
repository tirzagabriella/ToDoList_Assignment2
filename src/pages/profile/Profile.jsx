import React, { useState, useEffect } from "react";
import { auth, logout, st, updateProfile } from "../../services/firebase-auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [newDisplayName, setNewDisplayName] = useState(""); // State for the new display name

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchProfilePic(user.uid);
        setNewDisplayName(user.displayName || ""); // Initialize newDisplayName with the current display name
      } else {
        setUser(null);
        setProfilePic(null);
        onSignOut();
      }
    });
    return () => unsubscribe();
  }, []);

  const navToSplash = () => {
    navigate("/");
  };

  const navToHome = () => {
    navigate("/home");
  };

  const onSignOut = () => {
    logout();
    navToSplash();
  };

  const fetchProfilePic = async (userId) => {
    try {
      const uri = await getDownloadURL(ref(st, `profile-pics/${userId}`));
      setProfilePic(uri);
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    }
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      await uploadBytes(ref(st, `profile-pics/${user.uid}`), file);
      fetchProfilePic(user.uid);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  const handleDisplayNameChange = (e) => {
    setNewDisplayName(e.target.value);
  };

  const updateDisplayName = async () => {
    if (!newDisplayName) return;
    try {
      await updateProfile(auth.currentUser, {
        displayName: newDisplayName,
      });
      setUser({ ...user, displayName: newDisplayName }); // Update local user state
    } catch (error) {
      console.error("Error updating display name:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-row cursor-pointer m-4" onClick={navToHome}>
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 12H5M12 19l-7-7 7-7"
          />
        </svg>
        <span className="mx-2">Back</span>
      </div>
      {user ? (
        <div className="m-4 flex justify-center items-center flex-col space-y-4">
          {" "}
          {/* Added space-y-4 for spacing */}
          <h1>Welcome, {user.displayName}</h1>
          <img className="profile-pic" src={profilePic} alt="Profile" />
          <input type="file" onChange={handleProfilePicChange} />
          <input
            type="text"
            placeholder="Update display name"
            value={newDisplayName}
            onChange={handleDisplayNameChange}
            className="mt-2 text-pink-700" // Add margin-top for spacing
          />
          <button onClick={updateDisplayName} className="mt-2 btn btn-primary">
            Update Name
          </button>
          {/* Added mt-2 for spacing */}
        </div>
      ) : (
        <h1>Please log in</h1>
      )}
    </div>
  );
};

export default Profile;
