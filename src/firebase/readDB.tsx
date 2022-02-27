import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, getDocs, query, where } from 'firebase/firestore';
// import { DocumentData } from 'firebase/firestore-types/index.d.ts';
// import { db } from './firebase';

type ReadDbProps = {};

const ReadDB: React.FC<ReadDbProps> = () => {
    // const schedulesRef = collection(db, 'schedules');
    // const q = query(schedulesRef);
    // console.log(schedulesRef);
    // const querySnapShot = async () => await getDocs(q);
    // querySnapShot()
    //     .then(res => {
    //         res.docs.forEach((doc) => {
    //             const dateSchedulesRef = collection(db, 'dateSchedules');
    //             const dateSchedulesQuery = query(dateSchedulesRef, where(doc.id, "==", 'schedule1'));
    //             const date = await getDocs(dateSchedulesQuery);
    //             console.log(doc);
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     });
    return <h1>firebase.</h1>;
}

export default ReadDB;
