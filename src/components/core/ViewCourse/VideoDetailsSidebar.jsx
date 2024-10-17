import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
// import { FaBackward  } from "react-icons/fa";
// // import { MdOutlineScreenshotMonitor } from "react-icons/md";
// import { MdMonitor } from "react-icons/md";
import { PiMonitorPlayBold } from "react-icons/pi";


import IconBtn from "../../common/IconBtn"
import ProgressBar from "@ramonak/react-progress-bar"

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    ;(() => {
      if (!courseSectionData.length) return
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )
      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId)
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
      setVideoBarActive(activeSubSectionId)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionData, courseEntireData, location.pathname])


  // return (
  //   <>
  //     <div className="flex h-[calc(100vh-3.5rem)] w-full max-w-[320px] flex-col border-r border-richblack-700 bg-richblack-800 shadow-lg lg:w-[320px] pt-4
  //     ">
        
  //       {/* Top Section: Course Info */}
  //       <div className="mx-5 flex flex-col gap-4 border-b border-richblack-700 py-5 px-3 bg-gradient-to-r from-[#2A2A2A] to-[#000000] text-lg font-bold text-[#FFF5E1] rounded-lg shadow-sm">
  //         <div className="flex w-full items-center justify-between">
  //           {/* Back Button */}
  //           <div
  //             onClick={() => navigate(`/dashboard/enrolled-courses`)}
  //             className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF9800] hover:bg-[#FF7939] transition-all duration-300 p-2 text-black shadow-lg"
  //             title="Back"
  //           >
  //             <IoIosArrowBack size={24} />
  //           </div>
  
  //           {/* Add Review Button */}
  //           <IconBtn
  //             text="Add Review"
  //             customClasses="ml-auto bg-[#FF7939] hover:bg-[#FF9800] text-black rounded-md px-3 py-2 shadow-lg transition-all duration-300"
  //             onclick={() => setReviewModal(true)}
  //           />
  //         </div>
  
  //         {/* Course Progress Section */}
  //         <div className="flex flex-col border-richblack-700 bg-richblack-800 p-4 rounded-lg shadow-inner">
  //           <p className="text-[#FFA624] text-xl font-extrabold">{courseEntireData?.courseName}</p>
  //           <p className="text-sm font-semibold text-[#FF7939] mt-2">
  //             Lectures Completed → 
  //             <span className="text-[#FF9800]">&nbsp;{completedLectures?.length}</span> / {totalNoOfLectures}
  //           </p>
  //           <p className="text-sm font-semibold text-[#FF7939] mt-1">
  //             {Math.round((completedLectures?.length / totalNoOfLectures) * 100)}% Completed
  //           </p>
  //           <ProgressBar
  //             completed={Math.round((completedLectures?.length / totalNoOfLectures) * 100) || 0}
  //             height="8px"
  //             isLabelVisible={false}
  //             baseBgColor="#2A2A2A"
  //             bgColor="#FF9800"
  //             className="rounded-full mt-3"
  //           />
  //         </div>
  //       </div>
  
  //       {/* Scrollable Course Sections */}
  //       <div className="h-[calc(100vh-8rem)] overflow-y-auto p-4 space-y-3 border-richblack-700 bg-richblack-800 rounded-lg shadow-inner">
  //         {courseSectionData.map((course, index) => (
  //           <div
  //             className="cursor-pointer text-sm text-[#FFF5E1] bg-richblack-700 rounded-lg shadow-md hover:bg-[#252525] transition-colors duration-300"
  //             onClick={() => setActiveStatus(course?._id)}
  //             key={index}
  //           >
  //             {/* Section Heading */}
  //             <div className="flex justify-between items-center px-4 py-3 rounded-lg">
  //               <div className="w-[75%] font-bold">
  //                 {course?.sectionName}
  //               </div>
  //               <div className="flex items-center gap-2">
  //                 <span
  //                   className={`${
  //                     activeStatus === course?.sectionName ? "rotate-0" : "rotate-180"
  //                   } transition-transform duration-500`}
  //                 >
  //                   <BsChevronDown />
  //                 </span>
  //               </div>
  //             </div>
  
  //             {/* Sub Sections */}
  //             {activeStatus === course?._id && (
  //               <div className="transition-all duration-500 ease-in-out bg-[#181818] rounded-md p-2">
  //                 {course.subSection.map((topic, i) => (
  //                   <div
  //                     className={`flex items-center gap-3 px-5 py-2 rounded-md transition-colors ${
  //                       videoBarActive === topic._id
  //                         ? "bg-[#FF9800] text-black font-bold"
  //                         : "hover:bg-[#303030]"
  //                     }`}
  //                     key={i}
  //                     onClick={() => {
  //                       navigate(
  //                         `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
  //                       )
  //                       setVideoBarActive(topic._id)
  //                     }}
  //                   >
  //                     <input
  //                       type="checkbox"
  //                       checked={completedLectures.includes(topic?._id)}
  //                       onChange={() => {}}
  //                       className="accent-[#FF9800]"
  //                     />
  //                     {topic.title}
  //                   </div>
  //                 ))}
  //               </div>
  //             )}
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </>
  // );

  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] w-full max-w-[320px] flex-col border-r border-richblack-700 bg-richblack-900 shadow-lg lg:w-[320px] mt-4
      ">
        
        {/* Top Section: Course Info */}
        <div className="mx-5 flex flex-col gap-4 border-b border-richblack-700 py-5 px-3 bg-gradient-to-r from-[#2A2A2A] to-[#000000] text-lg font-bold text-[#FFF5E1] rounded-lg shadow-sm">
          <div className="flex w-full items-center justify-between">
            {/* Back Button */}
            <div
              onClick={() => navigate(`/dashboard/enrolled-courses`)}
              className="flex h-9 w-9 items-center justify-center rounded-md bg-[#FF7939] hover:bg-[#FF9800] transition-all duration-300 p-2 text-black shadow-lg"
              title="Back"
            >
              <MdOutlineArrowBackIos  size={24} />
            </div>
  
            {/* Add Review Button */}
            <IconBtn
              text="Add Review"
              customClasses="ml-auto bg-[#FF7939] hover:bg-[#FF9800] text-black rounded-md px-3 py-2 shadow-lg transition-all duration-300"
              onclick={() => setReviewModal(true)}
            />
          </div>
  
          {/* Course Progress Section */}
          <div className="flex flex-col bg-[#1F1F1F] p-4 rounded-lg shadow-inner">
            <p className="text-[#FFA624] text-xl font-extrabold">{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-[#FF7939] mt-2">
              Lectures Completed → 
              <span className="text-[#FF9800]">&nbsp;{completedLectures?.length}</span> / {totalNoOfLectures}
            </p>
            <p className="text-sm font-semibold text-[#FF7939] mt-1">
              {Math.round((completedLectures?.length / totalNoOfLectures) * 100)}% Completed
            </p>
            <ProgressBar
              completed={Math.round((completedLectures?.length / totalNoOfLectures) * 100) || 0}
              height="8px"
              isLabelVisible={false}
              baseBgColor="#2A2A2A"
              bgColor="#FF9800"
              className="rounded-full mt-3"
            />
          </div>
        </div>
  
        {/* Scrollable Course Sections */}
        <div className="h-[calc(100vh-8rem)] overflow-y-auto p-4 space-y-3 bg-[#101010] rounded-lg shadow-inner">
          {courseSectionData.map((course, index) => (
            <div
              className="cursor-pointer text-sm text-[#FFF5E1] bg-richblack-700 rounded-lg shadow-md hover:bg-[#252525] transition-colors duration-300"
              onClick={() => setActiveStatus(course?._id)}
              key={index}
            >
              {/* Section Heading */}
              <div className="flex justify-between items-center px-4 py-3 rounded-lg">
                <div className="w-[75%] font-bold">
                  {course?.sectionName}
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`${
                      activeStatus === course?.sectionName ? "rotate-0" : "rotate-180"
                    } transition-transform duration-500`}
                  >
                    <BsChevronDown />
                  </span>
                </div>
              </div>
  
              {/* Sub Sections */}
              {activeStatus === course?._id && (
                <div className="transition-all duration-500 ease-in-out bg-[#181818] rounded-md p-2">
                  {course.subSection.map((topic, i) => (
                    <div
                      className={`flex items-center gap-3 px-5 py-2 rounded-md transition-colors ${
                        videoBarActive === topic._id
                          ? "bg-[#FF9800] text-black font-bold"
                          : "hover:bg-[#303030]"
                      }`}
                      key={i}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                        )
                        setVideoBarActive(topic._id)
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(topic?._id)}
                        onChange={() => {}}
                        className="accent-[#FF9800]"
                      />
                      <div className="flex justify-center gap-2 items-center">

                      {topic.title}
                      <PiMonitorPlayBold/>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
  


  // return (
  //   <>
  //     <div className="flex h-[calc(100vh-3.5rem)] w-full max-w-[320px] flex-col border-r border-richblack-700 bg-richblack-800 lg:w-[320px]">
  //       {/* Top Section: Course Info */}
  //       <div className="mx-5 flex flex-col gap-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
  //         <div className="flex w-full items-center justify-between">
  //           {/* Back Button */}
  //           <div
  //             onClick={() => {
  //               navigate(`/dashboard/enrolled-courses`)
  //             }}
  //             className="flex h-9 w-9 items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90 transition-transform"
  //             title="back"
  //           >
  //             <IoIosArrowBack size={30} />
  //           </div>
  
  //           {/* Add Review Button */}
  //           <IconBtn
  //             text="Add Review"
  //             customClasses="ml-auto"
  //             onclick={() => setReviewModal(true)}
  //           />
  //         </div>
  
  //         {/* Course Progress Section */}
  //         <div className="flex flex-col bg-richblack-700 p-4 rounded-lg">
  //           <p className="text-[#FFA624] text-lg font-bold">{courseEntireData?.courseName}</p>
  //           <p className="text-sm font-semibold text-[#FF7939] flex items-center">
  //             Completed Lectures →&nbsp;
  //             <span className="text-[#FF9800]">{completedLectures?.length}</span> / {totalNoOfLectures}
  //           </p>
  //           <p className="text-sm font-semibold text-[#FF7939]">
  //             {Math.round((completedLectures?.length / totalNoOfLectures) * 100)}% Completed
  //           </p>
  //           <ProgressBar
  //             completed={Math.round((completedLectures?.length / totalNoOfLectures) * 100) || 0}
  //             height="8px"
  //             isLabelVisible={false}
  //             baseBgColor="#2A2A2A"
  //             bgColor="#FF9800"
  //             className="rounded-full"
  //           />
  //         </div>
  //       </div>
  
  //       {/* Scrollable Course Sections */}
  //       <div className="h-[calc(100vh-8rem)] overflow-y-auto space-y-2 p-2">
  //         {courseSectionData.map((course, index) => (
  //           <div
  //             className="cursor-pointer text-sm text-richblack-5"
  //             onClick={() => setActiveStatus(course?._id)}
  //             key={index}
  //           >
  //             {/* Section Heading */}
  //             <div className="flex justify-between items-center bg-richblack-600 px-4 py-3 rounded-md">
  //               <div className="w-[70%] font-semibold">
  //                 {course?.sectionName}
  //               </div>
  //               <div className="flex items-center gap-3">
  //                 <span
  //                   className={`${
  //                     activeStatus === course?.sectionName ? "rotate-0" : "rotate-180"
  //                   } transition-transform duration-500`}
  //                 >
  //                   <BsChevronDown />
  //                 </span>
  //               </div>
  //             </div>
  
  //             {/* Sub Sections */}
  //             {activeStatus === course?._id && (
  //               <div className="transition-[height] duration-500 ease-in-out">
  //                 {course.subSection.map((topic, i) => (
  //                   <div
  //                     className={`flex gap-3 items-center px-5 py-2 rounded-md transition-all ${
  //                       videoBarActive === topic._id
  //                         ? "bg-[#FFA624] font-semibold text-richblack-800"
  //                         : "hover:bg-richblack-900"
  //                     }`}
  //                     key={i}
  //                     onClick={() => {
  //                       navigate(
  //                         `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
  //                       )
  //                       setVideoBarActive(topic._id)
  //                     }}
  //                   >
  //                     <input
  //                       type="checkbox"
  //                       checked={completedLectures.includes(topic?._id)}
  //                       onChange={() => {}}
  //                     />
  //                     {topic.title}
  //                   </div>
  //                 ))}
  //               </div>
  //             )}
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </>
  // );
  

  // return (
  //   <>
  //     <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
  //       <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
  //         <div className="flex w-full items-center justify-between ">
  //           <div
  //             onClick={() => {
  //               navigate(`/dashboard/enrolled-courses`)
  //             }}
  //             className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
  //             title="back"
  //           >
  //             <IoIosArrowBack size={30} />
  //           </div>
  //           <IconBtn
  //             text="Add Review"
  //             customClasses="ml-auto"
  //             onclick={() => setReviewModal(true)}
  //           />
  //         </div>
  //         {/* <div className="flex flex-col">
  //           <p>{courseEntireData?.courseName}</p>
  //           <p className="text-sm font-semibold text-richblack-500"> Completed Lectures → &nbsp;  
  //             { completedLectures?.length} / {totalNoOfLectures}
  //           </p>
  //           <p className="text-sm font-semibold text-richblack-500">  
  //             { ((completedLectures?.length  / totalNoOfLectures)*100).toFixed(0) } % Completed
  //           </p>
  //           <ProgressBar
  //                 completed={(completedLectures?.length  / totalNoOfLectures)*100 || 0}
  //                 height="8px"
  //                 isLabelVisible={false}
  //               />
  //         </div> */}


  //         <div className="flex flex-col space-y-2 bg-black p-4 rounded-lg">
  //           <p className="text-[#FFA624] text-lg font-bold">{courseEntireData?.courseName}</p>
            
  //           <p className="text-sm font-semibold text-[#FF7939] flex items-center">
  //             Completed Lectures → &nbsp; 
  //             <span className="text-[#FF9800]">{completedLectures?.length}</span> / {totalNoOfLectures}
  //           </p>
            
  //           <p className="text-sm font-semibold text-[#FF7939]">
  //             {Math.round((completedLectures?.length / totalNoOfLectures) * 100)}% Completed
  //           </p>
            
  //           <ProgressBar
  //             completed={Math.round((completedLectures?.length / totalNoOfLectures) * 100) || 0}
  //             height="8px"
  //             isLabelVisible={false}
  //             baseBgColor="#2A2A2A"
  //             bgColor="#FF9800"
  //             className="rounded-full"
  //           />
  //         </div>

  //         {/* <div class="flex flex-col bg-black text-white p-4 rounded-md shadow-md">
  //           <p class="text-lg font-bold mb-2">{courseEntireData?.courseName}</p>
  //           <p class="text-sm font-semibold text-gray-400 mb-1">
  //             Completed Lectures: {completedLectures?.length} / {totalNoOfLectures}
  //           </p>
  //           <p class="text-sm font-semibold text-gray-400 mb-2">
  //             {(completedLectures?.length / totalNoOfLectures) * 100}% Completed
  //           </p>
  //           <div class="w-full bg-gray-200 rounded-full h-2.5">
  //             <div
  //               class="bg-orange-500 h-2.5 rounded-full"
  //               style={{ width: `${(completedLectures?.length / totalNoOfLectures) * 100}%` }}
  //             ></div>
  //           </div>
  //         </div> */}



  //       </div>

  //       <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
  //         {courseSectionData.map((course, index) => (
  //           <div
  //             className="mt-2 cursor-pointer text-sm text-richblack-5"
  //             onClick={() => setActiveStatus(course?._id)}
  //             key={index}
  //           >
  //             {/* Section */}
  //             <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
  //               <div className="w-[70%] font-semibold">
  //                 {course?.sectionName}
  //               </div>
  //               <div className="flex items-center gap-3">
  //                 {/* <span className="text-[12px] font-medium">
  //                   Lession {course?.subSection.length}
  //                 </span> */}
  //                 <span
  //                   className={`${
  //                     activeStatus === course?.sectionName
  //                       ? "rotate-0"
  //                       : "rotate-180"
  //                   } transition-all duration-500`}
  //                 >
  //                   <BsChevronDown />
  //                 </span>
  //               </div>
  //             </div>

  //             {/* Sub Sections */}
  //             {activeStatus === course?._id && (
  //               <div className="transition-[height] duration-500 ease-in-out">
  //                 {course.subSection.map((topic, i) => (
  //                   <div
  //                     className={`flex gap-3  px-5 py-2 ${
  //                       videoBarActive === topic._id
  //                         ? "bg-[#FFA624] font-semibold text-richblack-800"
  //                         : "hover:bg-richblack-900"
  //                     } `}
  //                     key={i}
  //                     onClick={() => {
  //                       navigate(
  //                         `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
  //                       )
  //                       setVideoBarActive(topic._id)
  //                     }}
  //                   >
  //                     <input
  //                       type="checkbox"
  //                       checked={completedLectures.includes(topic?._id)}
  //                       onChange={() => {}}
  //                     />
  //                     {topic.title}
  //                   </div>
  //                 ))}
  //               </div>
  //             )}
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </>
  // )

  

}
