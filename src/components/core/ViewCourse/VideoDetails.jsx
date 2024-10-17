import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "video-react/dist/video-react.css";
import { useLocation } from "react-router-dom";
import {
  BigPlayButton,
  Player,
  ControlBar,
  PlaybackRateMenuButton,
  VolumeMenuButton,
  CurrentTimeDisplay,
  TimeDivider,
  ProgressControl,
  ForwardControl,
  ReplayControl,
} from "video-react";

import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import IconBtn from "../../common/IconBtn";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const playerRef = useRef(null);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [previewSource, setPreviewSource] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    (async () => {
      if (!courseSectionData.length) return;
      if (!courseId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-courses");
      } else {
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        );
        const filteredVideoData = filteredData?.[0]?.subSection.filter(
          (data) => data._id === subSectionId
        );
        setVideoData(filteredVideoData[0]);
        setPreviewSource(courseEntireData.thumbnail);
        setVideoEnded(false);
      }
    })();
  }, [courseSectionData, courseEntireData, location.pathname]);

  const handleMouseEnter = () => {
    setShowControls(true);
    if (playerRef.current) {
      playerRef.current.controls(true);
    }
  };

  const handleMouseLeave = () => {
    setShowControls(false);
    if (playerRef.current) {
      playerRef.current.controls(false);
    }
  };

  const isFirstVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId);

    return currentSectionIndx === 0 && currentSubSectionIndx === 0;
  };

  const goToNextVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const noOfSubsections =
      courseSectionData[currentSectionIndx].subSection.length;

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndx !== noOfSubsections - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndx].subSection[
          currentSubSectionIndx + 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      const nextSectionId = courseSectionData[currentSectionIndx + 1]._id;
      const nextSubSectionId =
        courseSectionData[currentSectionIndx + 1].subSection[0]._id;
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };

  const isLastVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const noOfSubsections =
      courseSectionData[currentSectionIndx].subSection.length;
    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId);

    return (
      currentSectionIndx === courseSectionData.length - 1 &&
      currentSubSectionIndx === noOfSubsections - 1
    );
  };

  const goToPrevVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndx !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndx].subSection[
          currentSubSectionIndx - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else {
      const prevSectionId = courseSectionData[currentSectionIndx - 1]._id;
      const prevSubSectionLength =
        courseSectionData[currentSectionIndx - 1].subSection.length;
      const prevSubSectionId =
        courseSectionData[currentSectionIndx - 1].subSection[
          prevSubSectionLength - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete(
      { courseId: courseId, subsectionId: subSectionId },
      token
    );
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };

  const handleForward = () => {
    if (playerRef?.current) {
      playerRef.current.seek(playerRef.current.getState().player.currentTime + 10);
    }
  };

  const handleBackward = () => {
    if (playerRef?.current) {
      playerRef.current.seek(playerRef.current.getState().player.currentTime - 10);
    }
  };

  return (
    <div className="flex flex-col gap-5 text-white">
      {!videoData ? (
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Player
            ref={playerRef}
            aspectRatio="16:9"
            playsInline
            onEnded={() => setVideoEnded(true)}
            src={videoData?.videoUrl}
          >
            <BigPlayButton position="center" />
            <ControlBar autoHide={true} className="custom-control-bar">
              <ReplayControl seconds={10} order={1.1} />
              <ForwardControl seconds={10} order={1.2} />
              <CurrentTimeDisplay order={4.1} />
              <TimeDivider order={4.2} />
              <ProgressControl order={5.1} />
              <PlaybackRateMenuButton rates={[0.5, 1, 1.5, 2]} order={7.1} />
              <VolumeMenuButton vertical order={7.2} />
            </ControlBar>

            {videoEnded && (
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                }}
                className="absolute inset-0 z-[100] grid h-full place-content-center"
              >
                {!completedLectures.includes(subSectionId) && (
                  <IconBtn
                    disabled={loading}
                    onclick={() => handleLectureCompletion()}
                    text={!loading ? "Mark As Completed" : "Loading..."}
                    customClasses="text-xl max-w-max px-4 mx-auto"
                  />
                )}
                <IconBtn
                  disabled={loading}
                  onclick={() => {
                    if (playerRef?.current) {
                      playerRef?.current?.seek(0);
                      setVideoEnded(false);
                    }
                  }}
                  text="Rewatch"
                  customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                />
                <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                  {!isFirstVideo() && (
                    <button
                      disabled={loading}
                      onClick={goToPrevVideo}
                      className="blackButton"
                    >
                      Prev
                    </button>
                  )}
                  {!isLastVideo() && (
                    <button
                      disabled={loading}
                      onClick={goToNextVideo}
                      className="blackButton"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            )}
          </Player>
        </div>
      )}

      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6">{videoData?.description}</p>
    </div>
  );
};

export default VideoDetails;







// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import "video-react/dist/video-react.css";
// import { useLocation } from "react-router-dom";
// import {
//   BigPlayButton,
//   Player,
//   ControlBar,
//   PlaybackRateMenuButton,
//   VolumeMenuButton,
//   CurrentTimeDisplay,
//   TimeDivider,
//   ProgressControl,
//   ForwardControl,
//   ReplayControl,
// } from "video-react";

// import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
// import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
// import IconBtn from "../../common/IconBtn";

// const VideoDetails = () => {
//   const { courseId, sectionId, subSectionId } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const playerRef = useRef(null);
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.auth);
//   const { courseSectionData, courseEntireData, completedLectures } =
//     useSelector((state) => state.viewCourse);

//   const [videoData, setVideoData] = useState([]);
//   const [previewSource, setPreviewSource] = useState("");
//   const [videoEnded, setVideoEnded] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [showControls, setShowControls] = useState(false);

//   useEffect(() => {
//     (async () => {
//       if (!courseSectionData.length) return;
//       if (!courseId && !sectionId && !subSectionId) {
//         navigate("/dashboard/enrolled-courses");
//       } else {
//         const filteredData = courseSectionData.filter(
//           (course) => course._id === sectionId
//         );
//         const filteredVideoData = filteredData?.[0]?.subSection.filter(
//           (data) => data._id === subSectionId
//         );
//         setVideoData(filteredVideoData[0]);
//         setPreviewSource(courseEntireData.thumbnail);
//         setVideoEnded(false);
//       }
//     })();
//   }, [courseSectionData, courseEntireData, location.pathname]);

//   const handleMouseEnter = () => setShowControls(true);
//   const handleMouseLeave = () => setShowControls(false);

//   const isFirstVideo = () => {
//     const currentSectionIndx = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     );
//     const currentSubSectionIndx = courseSectionData[
//       currentSectionIndx
//     ].subSection.findIndex((data) => data._id === subSectionId);

//     return currentSectionIndx === 0 && currentSubSectionIndx === 0;
//   };

//   const goToNextVideo = () => {
//     const currentSectionIndx = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     );
//     const noOfSubsections =
//       courseSectionData[currentSectionIndx].subSection.length;

//     const currentSubSectionIndx = courseSectionData[
//       currentSectionIndx
//     ].subSection.findIndex((data) => data._id === subSectionId);

//     if (currentSubSectionIndx !== noOfSubsections - 1) {
//       const nextSubSectionId =
//         courseSectionData[currentSectionIndx].subSection[
//           currentSubSectionIndx + 1
//         ]._id;
//       navigate(
//         `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
//       );
//     } else {
//       const nextSectionId = courseSectionData[currentSectionIndx + 1]._id;
//       const nextSubSectionId =
//         courseSectionData[currentSectionIndx + 1].subSection[0]._id;
//       navigate(
//         `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
//       );
//     }
//   };

//   const isLastVideo = () => {
//     const currentSectionIndx = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     );
//     const noOfSubsections =
//       courseSectionData[currentSectionIndx].subSection.length;
//     const currentSubSectionIndx = courseSectionData[
//       currentSectionIndx
//     ].subSection.findIndex((data) => data._id === subSectionId);

//     return (
//       currentSectionIndx === courseSectionData.length - 1 &&
//       currentSubSectionIndx === noOfSubsections - 1
//     );
//   };

//   const goToPrevVideo = () => {
//     const currentSectionIndx = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     );
//     const currentSubSectionIndx = courseSectionData[
//       currentSectionIndx
//     ].subSection.findIndex((data) => data._id === subSectionId);

//     if (currentSubSectionIndx !== 0) {
//       const prevSubSectionId =
//         courseSectionData[currentSectionIndx].subSection[
//           currentSubSectionIndx - 1
//         ]._id;
//       navigate(
//         `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
//       );
//     } else {
//       const prevSectionId = courseSectionData[currentSectionIndx - 1]._id;
//       const prevSubSectionLength =
//         courseSectionData[currentSectionIndx - 1].subSection.length;
//       const prevSubSectionId =
//         courseSectionData[currentSectionIndx - 1].subSection[
//           prevSubSectionLength - 1
//         ]._id;
//       navigate(
//         `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
//       );
//     }
//   };

//   const handleLectureCompletion = async () => {
//     setLoading(true);
//     const res = await markLectureAsComplete(
//       { courseId: courseId, subsectionId: subSectionId },
//       token
//     );
//     if (res) {
//       dispatch(updateCompletedLectures(subSectionId));
//     }
//     setLoading(false);
//   };

//   const handleForward = () => {
//     if (playerRef?.current) {
//       playerRef.current.seek(playerRef.current.getState().player.currentTime + 10);
//     }
//   };

//   const handleBackward = () => {
//     if (playerRef?.current) {
//       playerRef.current.seek(playerRef.current.getState().player.currentTime - 10);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-5 text-white">
//       {!videoData ? (
//         <img
//           src={previewSource}
//           alt="Preview"
//           className="h-full w-full rounded-md object-cover"
//         />
//       ) : (
//         <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
//           <Player
//             ref={playerRef}
//             aspectRatio="16:9"
//             playsInline
//             onEnded={() => setVideoEnded(true)}
//             src={videoData?.videoUrl}
//           >
//             <BigPlayButton position="center" />
//             <ControlBar autoHide={!showControls} className="custom-control-bar">
//               <ReplayControl seconds={10} order={1.1} />
//               <ForwardControl seconds={10} order={1.2} />
//               <CurrentTimeDisplay order={4.1} />
//               <TimeDivider order={4.2} />
//               <ProgressControl order={5.1} />
//               <PlaybackRateMenuButton rates={[0.5, 1, 1.5, 2]} order={7.1} />
//               <VolumeMenuButton vertical order={7.2} />
//             </ControlBar>

//             {videoEnded && (
//               <div
//                 style={{
//                   backgroundImage:
//                     "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
//                 }}
//                 className="absolute inset-0 z-[100] grid h-full place-content-center"
//               >
//                 {!completedLectures.includes(subSectionId) && (
//                   <IconBtn
//                     disabled={loading}
//                     onclick={() => handleLectureCompletion()}
//                     text={!loading ? "Mark As Completed" : "Loading..."}
//                     customClasses="text-xl max-w-max px-4 mx-auto"
//                   />
//                 )}
//                 <IconBtn
//                   disabled={loading}
//                   onclick={() => {
//                     if (playerRef?.current) {
//                       playerRef?.current?.seek(0);
//                       setVideoEnded(false);
//                     }
//                   }}
//                   text="Rewatch"
//                   customClasses="text-xl max-w-max px-4 mx-auto mt-2"
//                 />
//                 <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
//                   {!isFirstVideo() && (
//                     <button
//                       disabled={loading}
//                       onClick={goToPrevVideo}
//                       className="blackButton"
//                     >
//                       Prev
//                     </button>
//                   )}
//                   {!isLastVideo() && (
//                     <button
//                       disabled={loading}
//                       onClick={goToNextVideo}
//                       className="blackButton"
//                     >
//                       Next
//                     </button>
//                   )}
//                 </div>
//               </div>
//             )}
//           </Player>
//         </div>
//       )}

//       <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
//       <p className="pt-2 pb-6">{videoData?.description}</p>
//     </div>
//   );
// };

// export default VideoDetails;







// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import "video-react/dist/video-react.css";
// import { useLocation } from "react-router-dom";
// import { BigPlayButton, Player, ControlBar, PlaybackRateMenuButton, VolumeMenuButton } from "video-react";

// import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
// import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
// import IconBtn from "../../common/IconBtn";

// const VideoDetails = () => {
//   const { courseId, sectionId, subSectionId } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const playerRef = useRef(null);
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.auth);
//   const { courseSectionData, courseEntireData, completedLectures } =
//     useSelector((state) => state.viewCourse);

//   const [videoData, setVideoData] = useState([]);
//   const [previewSource, setPreviewSource] = useState("");
//   const [videoEnded, setVideoEnded] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     (async () => {
//       if (!courseSectionData.length) return;
//       if (!courseId && !sectionId && !subSectionId) {
//         navigate("/dashboard/enrolled-courses");
//       } else {
//         const filteredData = courseSectionData.filter(
//           (course) => course._id === sectionId
//         );
//         const filteredVideoData = filteredData?.[0]?.subSection.filter(
//           (data) => data._id === subSectionId
//         );
//         setVideoData(filteredVideoData[0]);
//         setPreviewSource(courseEntireData.thumbnail);
//         setVideoEnded(false);
//       }
//     })();
//   }, [courseSectionData, courseEntireData, location.pathname]);

//   const isFirstVideo = () => {
//     const currentSectionIndx = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     );
//     const currentSubSectionIndx = courseSectionData[
//       currentSectionIndx
//     ].subSection.findIndex((data) => data._id === subSectionId);

//     return currentSectionIndx === 0 && currentSubSectionIndx === 0;
//   };

//   const goToNextVideo = () => {
//     const currentSectionIndx = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     );
//     const noOfSubsections =
//       courseSectionData[currentSectionIndx].subSection.length;

//     const currentSubSectionIndx = courseSectionData[
//       currentSectionIndx
//     ].subSection.findIndex((data) => data._id === subSectionId);

//     if (currentSubSectionIndx !== noOfSubsections - 1) {
//       const nextSubSectionId =
//         courseSectionData[currentSectionIndx].subSection[
//           currentSubSectionIndx + 1
//         ]._id;
//       navigate(
//         `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
//       );
//     } else {
//       const nextSectionId = courseSectionData[currentSectionIndx + 1]._id;
//       const nextSubSectionId =
//         courseSectionData[currentSectionIndx + 1].subSection[0]._id;
//       navigate(
//         `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
//       );
//     }
//   };

//   const isLastVideo = () => {
//     const currentSectionIndx = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     );
//     const noOfSubsections =
//       courseSectionData[currentSectionIndx].subSection.length;
//     const currentSubSectionIndx = courseSectionData[
//       currentSectionIndx
//     ].subSection.findIndex((data) => data._id === subSectionId);

//     return (
//       currentSectionIndx === courseSectionData.length - 1 &&
//       currentSubSectionIndx === noOfSubsections - 1
//     );
//   };

//   const goToPrevVideo = () => {
//     const currentSectionIndx = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     );
//     const currentSubSectionIndx = courseSectionData[
//       currentSectionIndx
//     ].subSection.findIndex((data) => data._id === subSectionId);

//     if (currentSubSectionIndx !== 0) {
//       const prevSubSectionId =
//         courseSectionData[currentSectionIndx].subSection[
//           currentSubSectionIndx - 1
//         ]._id;
//       navigate(
//         `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
//       );
//     } else {
//       const prevSectionId = courseSectionData[currentSectionIndx - 1]._id;
//       const prevSubSectionLength =
//         courseSectionData[currentSectionIndx - 1].subSection.length;
//       const prevSubSectionId =
//         courseSectionData[currentSectionIndx - 1].subSection[
//           prevSubSectionLength - 1
//         ]._id;
//       navigate(
//         `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
//       );
//     }
//   };

//   const handleLectureCompletion = async () => {
//     setLoading(true);
//     const res = await markLectureAsComplete(
//       { courseId: courseId, subsectionId: subSectionId },
//       token
//     );
//     if (res) {
//       dispatch(updateCompletedLectures(subSectionId));
//     }
//     setLoading(false);
//   };

//   // Functions for new controls
//   const handleForward = () => {
//     if (playerRef?.current) {
//       playerRef.current.seek(playerRef.current.getState().player.currentTime + 10);
//     }
//   };

//   const handleBackward = () => {
//     if (playerRef?.current) {
//       playerRef.current.seek(playerRef.current.getState().player.currentTime - 10);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-5 text-white">
//       {!videoData ? (
//         <img
//           src={previewSource}
//           alt="Preview"
//           className="h-full w-full rounded-md object-cover"
//         />
//       ) : (
//         <Player
//           ref={playerRef}
//           aspectRatio="16:9"
//           playsInline
//           onEnded={() => setVideoEnded(true)}
//           src={videoData?.videoUrl}
//         >
//           <BigPlayButton position="center" />
//           <ControlBar autoHide={false}>
//             <PlaybackRateMenuButton rates={[0.5, 1, 1.5, 2]} order={7.1} />
//             <VolumeMenuButton vertical />
//             <button className="ml-2" onClick={handleBackward}>-10s</button>
//             <button className="ml-2" onClick={handleForward}>+10s</button>
//           </ControlBar>

//           {videoEnded && (
//             <div
//               style={{
//                 backgroundImage:
//                   "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
//               }}
//               className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
//             >
//               {!completedLectures.includes(subSectionId) && (
//                 <IconBtn
//                   disabled={loading}
//                   onclick={() => handleLectureCompletion()}
//                   text={!loading ? "Mark As Completed" : "Loading..."}
//                   customClasses="text-xl max-w-max px-4 mx-auto"
//                 />
//               )}
//               <IconBtn
//                 disabled={loading}
//                 onclick={() => {
//                   if (playerRef?.current) {
//                     playerRef?.current?.seek(0);
//                     setVideoEnded(false);
//                   }
//                 }}
//                 text="Rewatch"
//                 customClasses="text-xl max-w-max px-4 mx-auto mt-2"
//               />
//               <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
//                 {!isFirstVideo() && (
//                   <button
//                     disabled={loading}
//                     onClick={goToPrevVideo}
//                     className="blackButton"
//                   >
//                     Prev
//                   </button>
//                 )}
//                 {!isLastVideo() && (
//                   <button
//                     disabled={loading}
//                     onClick={goToNextVideo}
//                     className="blackButton"
//                   >
//                     Next
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}
//         </Player>
//       )}

//       <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
//       <p className="pt-2 pb-6">{videoData?.description}</p>
//     </div>
//   );
// };

// export default VideoDetails;






// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { BigPlayButton, Player, ControlBar } from "video-react";

// import "video-react/dist/video-react.css";
// import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
// import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
// import IconBtn from "../../common/IconBtn";

// const VideoDetails = () => {
//   const { courseId, sectionId, subSectionId } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const playerRef = useRef(null);
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.auth);
//   const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse);

//   const [videoData, setVideoData] = useState([]);
//   const [previewSource, setPreviewSource] = useState("");
//   const [videoEnded, setVideoEnded] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [playbackRate, setPlaybackRate] = useState(1);
//   const [volume, setVolume] = useState(0.7);

//   useEffect(() => {
//     (async () => {
//       if (!courseSectionData.length) return;
//       if (!courseId && !sectionId && !subSectionId) {
//         navigate("/dashboard/enrolled-courses");
//       } else {
//         const filteredData = courseSectionData.filter((course) => course._id === sectionId);
//         const filteredVideoData = filteredData?.[0]?.subSection.filter((data) => data._id === subSectionId);
//         setVideoData(filteredVideoData[0]);
//         setPreviewSource(courseEntireData.thumbnail);
//         setVideoEnded(false);
//       }
//     })();
//   }, [courseSectionData, courseEntireData, location.pathname]);

//   const handlePlaybackRateChange = (rate) => {
//     playerRef.current.playbackRate = rate;
//     setPlaybackRate(rate);
//   };

//   const handleVolumeChange = (e) => {
//     const newVolume = parseFloat(e.target.value);
//     playerRef.current.volume = newVolume;
//     setVolume(newVolume);
//   };

//   const skipVideo = (seconds) => {
//     const currentTime = playerRef.current.getState().player.currentTime;
//     playerRef.current.seek(currentTime + seconds);
//   };

//   const handleLectureCompletion = async () => {
//     setLoading(true);
//     const res = await markLectureAsComplete({ courseId, subsectionId: subSectionId }, token);
//     if (res) dispatch(updateCompletedLectures(subSectionId));
//     setLoading(false);
//   };

//   return (
//     <div className="flex flex-col gap-5 text-white">
//       {!videoData ? (
//         <img src={previewSource} alt="Preview" className="h-full w-full rounded-md object-cover" />
//       ) : (
//         <Player
//           ref={playerRef}
//           aspectRatio="16:9"
//           playsInline
//           onEnded={() => setVideoEnded(true)}
//           src={videoData?.videoUrl}
//         >
//           <BigPlayButton position="center" />
//           <ControlBar autoHide={false}>
//             <div className="flex items-center justify-between gap-4 p-2 bg-black/50">
//               {/* Playback Speed Controller */}
//               <div>
//                 <label className="text-sm">Speed: </label>
//                 <select
//                   value={playbackRate}
//                   onChange={(e) => handlePlaybackRateChange(parseFloat(e.target.value))}
//                   className="bg-black text-white p-1 rounded"
//                 >
//                   <option value={0.5}>0.5x</option>
//                   <option value={1}>1x</option>
//                   <option value={1.5}>1.5x</option>
//                   <option value={2}>2x</option>
//                 </select>
//               </div>

//               {/* Volume Control */}
//               <div>
//                 <label className="text-sm">Volume: </label>
//                 <input
//                   type="range"
//                   min="0"
//                   max="1"
//                   step="0.1"
//                   value={volume}
//                   onChange={handleVolumeChange}
//                 />
//               </div>

//               {/* Skip Buttons */}
//               <div className="flex gap-2">
//                 <button onClick={() => skipVideo(-10)} className="blackButton">-10s</button>
//                 <button onClick={() => skipVideo(10)} className="blackButton">+10s</button>
//               </div>
//             </div>
//           </ControlBar>
//         </Player>
//       )}

//       <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
//       <p className="pt-2 pb-6">{videoData?.description}</p>

//       {videoEnded && (
//         <div className="absolute inset-0 z-50 grid place-content-center bg-black/70">
//           {!completedLectures.includes(subSectionId) && (
//             <IconBtn
//               disabled={loading}
//               onclick={handleLectureCompletion}
//               text={!loading ? "Mark As Completed" : "Loading..."}
//               customClasses="text-xl"
//             />
//           )}
//           <IconBtn
//             onclick={() => {
//               playerRef.current.seek(0);
//               setVideoEnded(false);
//             }}
//             text="Rewatch"
//             customClasses="text-xl mt-2"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoDetails;




// import React, { useEffect, useRef, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate, useParams } from "react-router-dom"

// import "video-react/dist/video-react.css"
// import { useLocation } from "react-router-dom"
// import { BigPlayButton, Player, ControlBar } from "video-react"
// import IconBtn from "../../common/IconBtn"

// import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI"
// import { updateCompletedLectures } from "../../../slices/viewCourseSlice"

// // Add custom controls for video speed, quality, and sound
// const VideoSpeedController = ({ playerRef }) => {
//   const handleSpeedChange = (speed) => {
//     if (playerRef.current) {
//       playerRef.current.playbackRate = speed
//     }
//   }

//   return (
//     <div className="flex items-center gap-2">
//       <label>Speed:</label>
//       <select onChange={(e) => handleSpeedChange(e.target.value)} defaultValue="1">
//         <option value="0.5">0.5x</option>
//         <option value="1">1x</option>
//         <option value="1.5">1.5x</option>
//         <option value="2">2x</option>
//       </select>
//     </div>
//   )
// }

// const VideoQualityController = ({ playerRef }) => {
//   const handleQualityChange = (quality) => {
//     // Placeholder for video quality switching logic
//     console.log("Change quality to", quality)
//     // Video quality change implementation will depend on video streaming sources (e.g., adaptive streaming)
//   }

//   return (
//     <div className="flex items-center gap-2">
//       <label>Quality:</label>
//       <select onChange={(e) => handleQualityChange(e.target.value)} defaultValue="720p">
//         <option value="480p">480p</option>
//         <option value="720p">720p</option>
//         <option value="1080p">1080p</option>
//       </select>
//     </div>
//   )
// }

// const VolumeController = ({ playerRef }) => {
//   const handleVolumeChange = (volume) => {
//     if (playerRef.current) {
//       playerRef.current.volume = volume
//     }
//   }

//   return (
//     <div className="flex items-center gap-2">
//       <label>Volume:</label>
//       <input
//         type="range"
//         min="0"
//         max="1"
//         step="0.1"
//         onChange={(e) => handleVolumeChange(e.target.value)}
//         defaultValue="1"
//       />
//     </div>
//   )
// }

// const VideoDetails = () => {
//   const { courseId, sectionId, subSectionId } = useParams()
//   const navigate = useNavigate()
//   const location = useLocation()
//   const playerRef = useRef(null)
//   const dispatch = useDispatch()
//   const { token } = useSelector((state) => state.auth)
//   const { courseSectionData, courseEntireData, completedLectures } =
//     useSelector((state) => state.viewCourse)

//   const [videoData, setVideoData] = useState([])
//   const [previewSource, setPreviewSource] = useState("")
//   const [videoEnded, setVideoEnded] = useState(false)
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     ;(async () => {
//       if (!courseSectionData.length) return
//       if (!courseId && !sectionId && !subSectionId) {
//         navigate(`/dashboard/enrolled-courses`)
//       } else {
//         const filteredData = courseSectionData.filter(
//           (course) => course._id === sectionId
//         )
//         const filteredVideoData = filteredData?.[0]?.subSection.filter(
//           (data) => data._id === subSectionId
//         )
//         setVideoData(filteredVideoData[0])
//         setPreviewSource(courseEntireData.thumbnail)
//         setVideoEnded(false)
//       }
//     })()
//   }, [courseSectionData, courseEntireData, location.pathname])

//   const handleLectureCompletion = async () => {
//     setLoading(true)
//     const res = await markLectureAsComplete(
//       { courseId: courseId, subsectionId: subSectionId },
//       token
//     )
//     if (res) {
//       dispatch(updateCompletedLectures(subSectionId))
//     }
//     setLoading(false)
//   }

//   return (
//     <div className="flex flex-col gap-5 text-white">
//       {!videoData ? (
//         <img
//           src={previewSource}
//           alt="Preview"
//           className="h-full w-full rounded-md object-cover"
//         />
//       ) : (
//         <Player
//           ref={playerRef}
//           aspectRatio="16:9"
//           playsInline
//           onEnded={() => setVideoEnded(true)}
//           src={videoData?.videoUrl}
//         >
//           <BigPlayButton position="center" />

//           {/* Custom Video Controls */}
//           <ControlBar>
//             <VideoSpeedController playerRef={playerRef} />
//             <VideoQualityController playerRef={playerRef} />
//             <VolumeController playerRef={playerRef} />
//           </ControlBar>

//           {/* Render When Video Ends */}
//           {videoEnded && (
//             <div
//               style={{
//                 backgroundImage:
//                   "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
//               }}
//               className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
//             >
//               {!completedLectures.includes(subSectionId) && (
//                 <IconBtn
//                   disabled={loading}
//                   onclick={() => handleLectureCompletion()}
//                   text={!loading ? "Mark As Completed" : "Loading..."}
//                   customClasses="text-xl max-w-max px-4 mx-auto"
//                 />
//               )}
//               <IconBtn
//                 disabled={loading}
//                 onclick={() => {
//                   if (playerRef?.current) {
//                     playerRef?.current?.seek(0)
//                     setVideoEnded(false)
//                   }
//                 }}
//                 text="Rewatch"
//                 customClasses="text-xl max-w-max px-4 mx-auto mt-2"
//               />
//             </div>
//           )}
//         </Player>
//       )}

//       <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
//       <p className="pt-2 pb-6">{videoData?.description}</p>
//     </div>
//   )
// }

// export default VideoDetails






// import React, { useEffect, useRef, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate, useParams } from "react-router-dom"

// import "video-react/dist/video-react.css"
// import { useLocation } from "react-router-dom"
// import { BigPlayButton, Player } from "video-react"

// import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI"
// import { updateCompletedLectures } from "../../../slices/viewCourseSlice"
// import IconBtn from "../../common/IconBtn"

// const VideoDetails = () => {
//   const { courseId, sectionId, subSectionId } = useParams()
//   const navigate = useNavigate()
//   const location = useLocation()
//   const playerRef = useRef(null)
//   const dispatch = useDispatch()
//   const { token } = useSelector((state) => state.auth)
//   const { courseSectionData, courseEntireData, completedLectures } =
//     useSelector((state) => state.viewCourse)

//   const [videoData, setVideoData] = useState([])
//   const [previewSource, setPreviewSource] = useState("")
//   const [videoEnded, setVideoEnded] = useState(false)
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     ;(async () => {
//       if (!courseSectionData.length) return
//       if (!courseId && !sectionId && !subSectionId) {
//         navigate(`/dashboard/enrolled-courses`)
//       } else {
//         // console.log("courseSectionData", courseSectionData)
//         const filteredData = courseSectionData.filter(
//           (course) => course._id === sectionId
//         )
//         // console.log("filteredData", filteredData)
//         const filteredVideoData = filteredData?.[0]?.subSection.filter(
//           (data) => data._id === subSectionId
//         )
//         // console.log("filteredVideoData", filteredVideoData)
//         setVideoData(filteredVideoData[0])
//         setPreviewSource(courseEntireData.thumbnail)
//         setVideoEnded(false)
//       }
//     })()
//   }, [courseSectionData, courseEntireData, location.pathname])

//   // check if the lecture is the first video of the course
//   const isFirstVideo = () => {
//     const currentSectionIndx = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     )

//     const currentSubSectionIndx = courseSectionData[
//       currentSectionIndx
//     ].subSection.findIndex((data) => data._id === subSectionId)

//     if (currentSectionIndx === 0 && currentSubSectionIndx === 0) {
//       return true
//     } else {
//       return false
//     }
//   }

//   // go to the next video
//   const goToNextVideo = () => {
//     // console.log(courseSectionData)

//     const currentSectionIndx = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     )

//     const noOfSubsections =
//       courseSectionData[currentSectionIndx].subSection.length

//     const currentSubSectionIndx = courseSectionData[
//       currentSectionIndx
//     ].subSection.findIndex((data) => data._id === subSectionId)

//     // console.log("no of subsections", noOfSubsections)

//     if (currentSubSectionIndx !== noOfSubsections - 1) {
//       const nextSubSectionId =
//         courseSectionData[currentSectionIndx].subSection[
//           currentSubSectionIndx + 1
//         ]._id
//       navigate(
//         `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
//       )
//     } else {
//       const nextSectionId = courseSectionData[currentSectionIndx + 1]._id
//       const nextSubSectionId =
//         courseSectionData[currentSectionIndx + 1].subSection[0]._id
//       navigate(
//         `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
//       )
//     }
//   }

//   // check if the lecture is the last video of the course
//   const isLastVideo = () => {
//     const currentSectionIndx = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     )

//     const noOfSubsections =
//       courseSectionData[currentSectionIndx].subSection.length

//     const currentSubSectionIndx = courseSectionData[
//       currentSectionIndx
//     ].subSection.findIndex((data) => data._id === subSectionId)

//     if (
//       currentSectionIndx === courseSectionData.length - 1 &&
//       currentSubSectionIndx === noOfSubsections - 1
//     ) {
//       return true
//     } else {
//       return false
//     }
//   }

//   // go to the previous video
//   const goToPrevVideo = () => {
//     // console.log(courseSectionData)

//     const currentSectionIndx = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     )

//     const currentSubSectionIndx = courseSectionData[
//       currentSectionIndx
//     ].subSection.findIndex((data) => data._id === subSectionId)

//     if (currentSubSectionIndx !== 0) {
//       const prevSubSectionId =
//         courseSectionData[currentSectionIndx].subSection[
//           currentSubSectionIndx - 1
//         ]._id
//       navigate(
//         `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
//       )
//     } else {
//       const prevSectionId = courseSectionData[currentSectionIndx - 1]._id
//       const prevSubSectionLength =
//         courseSectionData[currentSectionIndx - 1].subSection.length
//       const prevSubSectionId =
//         courseSectionData[currentSectionIndx - 1].subSection[
//           prevSubSectionLength - 1
//         ]._id
//       navigate(
//         `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
//       )
//     }
//   }

//   const handleLectureCompletion = async () => {
//     setLoading(true)
//     const res = await markLectureAsComplete(
//       { courseId: courseId, subsectionId: subSectionId },
//       token
//     )
//     if (res) {
//       dispatch(updateCompletedLectures(subSectionId))
//     }
//     setLoading(false)
//   }

//   return (
//     <div className="flex flex-col gap-5 text-white">
//       {!videoData ? (
//         <img
//           src={previewSource}
//           alt="Preview"
//           className="h-full w-full rounded-md object-cover"
//         />
//       ) : (
//         <Player
//           ref={playerRef}
//           aspectRatio="16:9"
//           playsInline
//           onEnded={() => setVideoEnded(true)}
//           src={videoData?.videoUrl}
//         >
//           <BigPlayButton position="center" />
//           {/* Render When Video Ends */}
//           {videoEnded && (
//             <div
//               style={{
//                 backgroundImage:
//                   "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
//               }}
//               className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
//             >
//               {!completedLectures.includes(subSectionId) && (
//                 <IconBtn
//                   disabled={loading}
//                   onclick={() => handleLectureCompletion()}
//                   text={!loading ? "Mark As Completed" : "Loading..."}
//                   customClasses="text-xl max-w-max px-4 mx-auto"
//                 />
//               )}
//               <IconBtn
//                 disabled={loading}
//                 onclick={() => {
//                   if (playerRef?.current) {
//                     // set the current time of the video to 0
//                     playerRef?.current?.seek(0)
//                     setVideoEnded(false)
//                   }
//                 }}
//                 text="Rewatch"
//                 customClasses="text-xl max-w-max px-4 mx-auto mt-2"
//               />
//               <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
//                 {!isFirstVideo() && (
//                   <button
//                     disabled={loading}
//                     onClick={goToPrevVideo}
//                     className="blackButton"
//                   >
//                     Prev
//                   </button>
//                 )}
//                 {!isLastVideo() && (
//                   <button
//                     disabled={loading}
//                     onClick={goToNextVideo}
//                     className="blackButton"
//                   >
//                     Next
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}
//         </Player>
//       )}

//       <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
//       <p className="pt-2 pb-6">{videoData?.description}</p>
//     </div>
//   )
// }

// export default VideoDetails
// video
