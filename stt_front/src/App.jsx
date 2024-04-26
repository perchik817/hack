// import Layout from "./components/Layout/Layout.jsx";
// import { Navigate, Route, Routes } from "react-router-dom";
// import Register from "./components/Auth/Register/Register.jsx";
// import Login from "./components/Auth/Login/Login.jsx";
// import Homepage from "./pages/Homepage/Homepage.jsx";
// import Bookpage from "./pages/Bookpage/Bookpage.jsx";
// import Filmpage from "./pages/Filmpage/Filmpage.jsx";
// import Audiopage from "./pages/Audiopage/Audiopage.jsx";
// import BookDetail from "./components/BookDetail/BookDetail.jsx";
// import FilmDetail from "./components/FilmDetail/FilmDetail.jsx";
// import AudioDetail from "./components/AudioDetail/AudioDetail.jsx";
// import Courses from "./components/Courses/Courses.jsx";
// import CourseDetail from "./components/CourseDetail/CourseDetail.jsx";
// import { useEffect, useRef, useState } from "react";
// import axios from "axios";

// function App() {
//   const [audioSrc, setAudioSrc] = useState("");
//   const isPlaying = useRef(false);

//   useEffect(() => {
//     let lastSelectedText = "";

//     function getSelectedText() {
//       let selectedText = "";
//       if (window.getSelection) {
//         selectedText = window.getSelection().toString();
//       } else if (document.selection && document.selection.type !== "Control") {
//         selectedText = document.selection.createRange().text;
//       }
//       return selectedText;
//     }

//     const handleMouseUp = async () => {
//       const selectedText = getSelectedText();
//       if (
//         selectedText !== "" &&
//         selectedText !== lastSelectedText &&
//         !isPlaying.current
//       ) {
//         console.log("Выделенный текст:", selectedText);
//         isPlaying.current = true;

//         try {
//           const response = await axios.post(
//             "http://172.20.10.2:8000/tts/",
//             { text: selectedText },
//             { responseType: "blob" }
//           );
//           const audioUrl = URL.createObjectURL(response.data);
//           setAudioSrc(audioUrl);

//           const audio = new Audio(audioUrl);
//           audio.addEventListener("ended", () => {
//             isPlaying.current = false;
//           });

//           audio
//             .play()
//             .catch((error) =>
//               console.log("Ошибка воспроизведения аудио:", error)
//             );
//         } catch (error) {
//           console.error("There was a problem with the POST request:", error);
//         }
//       }
//     };

//     document.addEventListener("mouseup", handleMouseUp);

//     return () => {
//       document.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, []);

//   // return (
//   //   <>
//   //     <Layout>
//   //       {!localStorage.getItem("token") ? (
//   //         <Routes>
//   //           <Route path="/register" element={<Register />} />
//   //           <Route path="/login" element={<Login />} />
//   //         </Routes>
//   //       ) : (
//   //         <Routes>
//   //           <Route path="/" element={<Homepage />} />
//   //           <Route path="/videopage" element={<Filmpage />} />
//   //           <Route path="/bookpage" element={<Bookpage />} />
//   //           <Route path="/audiopage" element={<Audiopage />} />
//   //           <Route path="/coursepage" element={<Courses />} />
//   //           <Route path="/videodetail/:id" element={<FilmDetail />} />
//   //           <Route path="/bookdetail/:id" element={<BookDetail />} />
//   //           <Route path="/coursedetail" element={<CourseDetail />} />
//   //           <Route path="/audiodetail/:id" element={<AudioDetail />} />
//   //           <Route path="/register" element={<Register />} />
//   //           <Route path="/login" element={<Login />} />
//   //           <Route path="*" element={<Navigate to="/" />} />
//   //         </Routes>
//   //       )}
//   //     </Layout>
//   //   </>
//   // );


// }

// export default App;
import React, { useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import axios from "axios";
import Layout from "./components/Layout/Layout.jsx";
import Register from "./components/Auth/Register/Register.jsx";
import Login from "./components/Auth/Login/Login.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Bookpage from "./pages/Bookpage/Bookpage.jsx";
import Filmpage from "./pages/Filmpage/Filmpage.jsx";
import Audiopage from "./pages/Audiopage/Audiopage.jsx";
import BookDetail from "./components/BookDetail/BookDetail.jsx";
import FilmDetail from "./components/FilmDetail/FilmDetail.jsx";
import AudioDetail from "./components/AudioDetail/AudioDetail.jsx";
import Courses from "./components/Courses/Courses.jsx";
import CourseDetail from "./components/CourseDetail/CourseDetail.jsx";

function App() {
  const [audioSrc, setAudioSrc] = useState("");
  const isPlaying = useRef(false);

  useEffect(() => {
    let lastSelectedText = "";

    function getSelectedText() {
      let selectedText = "";
      if (window.getSelection) {
        selectedText = window.getSelection().toString();
      } else if (document.selection && document.selection.type !== "Control") {
        selectedText = document.selection.createRange().text;
      }
      return selectedText;
    }

    const handleMouseUp = async () => {
      const selectedText = getSelectedText();
      if (
        selectedText !== "" &&
        selectedText !== lastSelectedText &&
        !isPlaying.current
      ) {
        console.log("Выделенный текст:", selectedText);
        isPlaying.current = true;

        try {
          const response = await axios.post(
            "http://localhost:8000/tts/",
            { text: selectedText },
            { responseType: "blob" }
          );
          const audioUrl = URL.createObjectURL(response.data);
          setAudioSrc(audioUrl);

          const audio = new Audio(audioUrl);
          audio.addEventListener("ended", () => {
            isPlaying.current = false;
          });

          audio
            .play()
            .catch((error) =>
              console.log("Ошибка воспроизведения аудио:", error)
            );
        } catch (error) {
          console.error("There was a problem with the POST request:", error);
        }
      }
    };

    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      <Layout>
        <Routes>
          {!localStorage.getItem("token") && (
            <>
              <Route path="/" element={<Homepage />} />
              <Route path="/videopage" element={<Filmpage />} />
              <Route path="/bookpage" element={<Bookpage />} />
              <Route path="/audiopage" element={<Audiopage />} />
              <Route path="/coursepage" element={<Courses />} />
              <Route path="/videodetail/:id" element={<FilmDetail />} />
              <Route path="/bookdetail/:id" element={<BookDetail />} />
              <Route path="/coursedetail" element={<CourseDetail />} />
              <Route path="/audiodetail/:id" element={<AudioDetail />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </Layout>
    </>
  );
}

export default App;
