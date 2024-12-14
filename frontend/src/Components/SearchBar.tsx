// const SearchBar=()=>{
//     return<>
//     <div className="max-w-sm">
//   <div className="relative" data-hs-combo-box='{
//     "groupingType": "default",
//     "preventSelection": true,
//     "isOpenOnFocus": true,
//     "groupingTitleTemplate": "<div className=\"block text-xs text-gray-500 m-3 mb-1"></div>"
//   }'>
//     <div className="relative">
//       <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
//         <svg className="shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//           <circle cx="11" cy="11" r="8"></circle>
//           <path d="m21 21-4.3-4.3"></path>
//         </svg>
//       </div>
//       <input className="py-3 ps-10 pe-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="text" role="combobox" aria-expanded="false" placeholder="Search or type a command" value="" data-hs-combo-box-input=""/>
//     </div>

    
//     <div className="absolute z-50 w-full bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)]" style="display: none;" data-hs-combo-box-output="">
//       <div className="max-h-[500px] p-2 overflow-y-auto overflow-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300" data-hs-combo-box-output-items-wrapper="">
//         <div data-hs-combo-box-output-item='{"group": {"name": "recent", "title": "Recent"}}' tabIndex="0">
//           <a className="py-2 px-3 flex items-center gap-x-3 hover:bg-gray-100 rounded-lg" href="/">
//             <svg className="shrink-0 size-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//               <rect width="20" height="16" x="2" y="4" rx="2"></rect>
//               <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
//             </svg>
//             <span className="text-sm text-gray-800" data-hs-combo-box-search-text="Compose an email" data-hs-combo-box-value="">Compose an email</span>
//             <span className="ms-auto text-xs text-gray-400" data-hs-combo-box-search-text="Gmail" data-hs-combo-box-value="">Gmail</span>
//           </a>
//         </div>
//         <div data-hs-combo-box-output-item='{"group": {"name": "recent", "title": "Recent"}}' tabindex="1">
//           <a className="py-2 px-3 flex items-center gap-x-3 hover:bg-gray-100 rounded-lg" href="/">
//             <svg className="shrink-0 size-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//               <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path>
//               <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path>
//             </svg>
//             <span className="text-sm text-gray-800" data-hs-combo-box-search-text="Start a conversation" data-hs-combo-box-value="">Start a conversation</span>
//             <span className="ms-auto text-xs text-gray-400" data-hs-combo-box-search-text="Slack" data-hs-combo-box-value="">Slack</span>
//           </a>
//         </div>
//         <div data-hs-combo-box-output-item='{"group": {"name": "recent", "title": "Recent"}}' tabindex="2">
//           <a className="py-2 px-3 flex items-center gap-x-3 hover:bg-gray-100 rounded-lg" href="/">
//             <svg className="shrink-0 size-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//               <path d="M5 12h14"></path>
//               <path d="M12 5v14"></path>
//             </svg>
//             <span className="text-sm text-gray-800" data-hs-combo-box-search-text="Create a project" data-hs-combo-box-value="">Create a project</span>
//             <span className="ms-auto text-xs text-gray-400" data-hs-combo-box-search-text="Notion" data-hs-combo-box-value="">Notion</span>
//           </a>
//         </div>
//         <div data-hs-combo-box-output-item='{"group": {"name": "people", "title": "People"}}' tabindex="5">
//           <a className="py-2 px-2.5 flex items-center gap-x-3 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100" href="/">
//             <img className="shrink-0 size-5 rounded-full" src="https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80" alt="Avatar">
//             <span className="text-sm text-gray-800" data-hs-combo-box-search-text="Kim Ya Sung" data-hs-combo-box-value="">Kim Ya Sung</span>
//             <span className="ms-auto text-xs text-teal-600" data-hs-combo-box-search-text="Online" data-hs-combo-box-value="">Online</span>
//           </a>
//         </div>
//         <div data-hs-combo-box-output-item='{"group": {"name": "people", "title": "People"}}' tabindex="6">
//           <a className="py-2 px-2.5 flex items-center gap-x-3 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100" href="/">
//             <img className="shrink-0 size-5 rounded-full" src="https://images.unsplash.com/photo-1610186593977-82a3e3696e7f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80" alt="Avatar">
//             <span className="text-sm text-gray-800" data-hs-combo-box-search-text="Chris Peti" data-hs-combo-box-value="">Chris Peti</span>
//             <span className="ms-auto text-xs text-gray-400" data-hs-combo-box-search-text="Offline" data-hs-combo-box-value="">Offline</span>
//           </a>
//         </div>
//         <div data-hs-combo-box-output-item='{"group": {"name": "people", "title": "People"}}' tabindex="7">
//           <a className="py-2 px-2.5 flex items-center gap-x-3 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100" href="/">
//             <img className="shrink-0 size-5 rounded-full" src="https://images.unsplash.com/photo-1568048689711-5e0325cea8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80" alt="Avatar">
//             <span className="text-sm text-gray-800" data-hs-combo-box-search-text="Martin Azara" data-hs-combo-box-value="">Martin Azara</span>
//             <span className="ms-auto text-xs text-gray-400" data-hs-combo-box-search-text="Offline" data-hs-combo-box-value="">Offline</span>
//           </a>
//         </div>
//       </div>
//     </div>

//   </div>

// </div>
//     </>

// }


// export default SearchBar;