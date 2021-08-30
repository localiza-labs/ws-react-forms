import React from 'react';

function Loading() {
    return (
        <svg width="21" version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" x="0px"
             y="0px" viewBox="0 20 60 60" enableBackground="new 0 0 0 0" >
  <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
    <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1"/>
  </circle>
            <circle fill="#fff" stroke="none" cx="26" cy="50" r="6">
    <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2"/>
  </circle>
            <circle fill="#fff" stroke="none" cx="46" cy="50" r="6">
    <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3"/>
  </circle>
</svg>
    );
}

export default Loading;
