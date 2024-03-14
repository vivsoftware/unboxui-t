import React, { useEffect, useState } from 'react';
import Home from '../../../pages';
import { useRouter } from 'next/router';

const Marketplace = ( activeTab ) => {
    const [data, setData] = useState(false);
    useEffect(() => {
        if (activeTab === null) {
            setData(true);
        }
    })

    return (
        <div>
            {data ? (
                <h1>Marketplace</h1>
            ) : (
                <h1>Marketplace</h1>
            )}
        </div>
    )
}
// const Marketplace = ({ activeTab }) => {

//     const router = useRouter();
//     useEffect(() => {
//         // if (activeTab(id) === 0) {
//         //     router.push("/");
//         // }

//         if(activeTab===0)
//         {
//           router.push("/");
//         }
//     })

//     console.log("Marketplace", activeTab)

//     return (
//         <div>

//         </div>
//     )
// }

export default Marketplace;
