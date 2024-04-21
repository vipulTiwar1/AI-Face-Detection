import React from 'react';
import './facerecognition.css';


function facerecognition({ image, box }) {

    // console.log(box);


    return (


        <div className='centre mt2'>

            <div className='absolute'>

                  <img id="inputimage" src={image} alt=".." width="500px" height="auto" />
                {
                    box.map((item,index) => {
                         // console.log(index)
                      return  <div id={index} className='bounding_box' style={{ top: item.top, right: item.right, bottom: item.bottom, left: item.left }}></div>
})
                }
            </div>
        </div>
    )




}


export default facerecognition;