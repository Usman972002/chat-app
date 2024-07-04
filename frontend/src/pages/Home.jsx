// import { useState } from "react";
// import Sidebar from "../components/sidebar/Sidebar";
// import MessageContainer from "../components/messages/MessageContainer";
// import { IoArrowBack } from "react-icons/io5";

// const Home = () => {
//   const [isConversationSelected, setIsConversationSelected] = useState(false);

//   const handleConversationSelect = () => {
//     setIsConversationSelected(true);
//   };

//   const handleBackClick = () => {
//     setIsConversationSelected(false);
//   };

//   return (
//     <div className='flex w-full h-full sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
//       <div className={`flex w-full ${isConversationSelected ? 'hidden sm:flex' : 'flex'}`}>
//         <Sidebar onConversationSelect={handleConversationSelect} />
//       </div>
//       <div className={`flex w-full ${isConversationSelected ? 'flex' : 'hidden sm:flex'}`}>
//         {isConversationSelected && (
//           <button
//             className='absolute top-0 left-1 sm:hidden bg-gray-700 text-white rounded-full p-2'
//             onClick={handleBackClick}
//           >
//             <IoArrowBack className="w-6 h-6" />
//           </button>
//         )}
//         <MessageContainer />
//       </div>
//     </div>
//   );
// };
// export default Home;



import { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import MessageContainer from "../components/messages/MessageContainer";
import { IoArrowBack } from "react-icons/io5";

const Home = () => {
  const [isConversationSelected, setIsConversationSelected] = useState(false);

  const handleConversationSelect = () => {
    setIsConversationSelected(true);
  };

  const handleBackClick = () => {
    setIsConversationSelected(false);
  };

  return (
    <div className='flex w-full h-full lg:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <div className={`flex w-full lg:w-[30%] ${isConversationSelected ? 'hidden lg:flex' : 'flex'}`}>
        <Sidebar onConversationSelect={handleConversationSelect} />
      </div>
      <div className={`flex w-full lg:w-[70%] ${isConversationSelected ? 'flex' : 'hidden lg:flex'}`}>
        {isConversationSelected && (
          <button
            className='absolute top-0 left-1 lg:hidden bg-gray-700 text-white rounded-full p-2'
            onClick={handleBackClick}
          >
            <IoArrowBack className="w-6 h-6" />
          </button>
        )}
        <MessageContainer />
      </div>
    </div>
  );
};
export default Home;

